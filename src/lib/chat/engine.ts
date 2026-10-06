import { getOrderForCustomer } from "@/lib/orders";
import { SITE_URL } from "@/lib/products";
import {
  availableSubcategoryLabels,
  loadCatalog,
  normalize,
  searchProducts,
  toCard,
  type ChatProductCard,
} from "@/lib/chat/catalog";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type ChatAnswer = {
  reply: string;
  products: ChatProductCard[];
  suggestions: string[];
};

const CONTACT = "contact@whatelsebyvinc.com";
const ORDER_PROMPT_MARKER = "numéro de commande";

const SUPPLIER_STATUS_LABELS: Record<string, string> = {
  pending: "En attente de traitement",
  placed: "Commande transmise au fournisseur",
  shipped: "Commande expédiée",
  failed: "Un problème est survenu, notre équipe a été notifiée",
};

const FAQ = {
  delivery:
    "Nos produits sont expédiés depuis nos entrepôts fournisseurs : comptez 7 à 20 jours ouvrés selon le produit et votre localisation. La livraison est offerte en France, en Belgique, en Suisse et au Luxembourg. Un numéro de suivi vous est communiqué dès la prise en charge du colis par le transporteur.",
  returns:
    `Vous disposez de 14 jours à compter de la réception pour vous rétracter, sans motif. Écrivez-nous à ${CONTACT} avec votre numéro de commande : le retour se fait par envoi postal, l'article doit être neuf ou légèrement utilisé. Les frais de retour sont à votre charge, sauf produit défectueux ou non conforme (remboursés). Il n'y a pas d'échange : tout retour accepté est remboursé sous 14 jours après réception, sur le moyen de paiement d'origine. Détails : ${SITE_URL}/retours`,
  payment:
    "Le paiement se fait par carte bancaire via Stripe, une plateforme de paiement sécurisée : nous n'avons jamais accès à vos données bancaires.",
  contact: `Vous pouvez écrire à notre service client : ${CONTACT}. Nous répondons sous 48h ouvrées. Pensez à indiquer votre numéro de commande s'il s'agit d'une commande.`,
  greeting:
    "Bonjour ! Je peux vous aider à trouver un produit, suivre une commande ou répondre à vos questions sur la livraison, les retours et le paiement.",
  fallback: `Je n'ai pas bien compris votre demande. Vous pouvez me parler d'un besoin (sommeil, massage, décoration…), d'une commande ou de la livraison. Pour toute autre question, écrivez-nous à ${CONTACT} (réponse sous 48h ouvrées).`,
};

const DEFAULT_SUGGESTIONS = [
  "Je cherche un produit pour mieux dormir",
  "Où en est ma commande ?",
  "Quels sont les délais de livraison ?",
];

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;

function extractEmail(text: string): string | null {
  return text.match(EMAIL_RE)?.[0] ?? null;
}

// Numéro de commande : après un mot-clé ("commande 42", "n° 42", "#42") ou
// message ne contenant que le numéro. Évite de confondre avec un prix ou une quantité.
function extractOrderId(text: string): number | null {
  const withKeyword = normalize(text).match(
    /(?:commande|numero|num|n°|no|#)\s*(?:de commande)?\s*:?\s*#?\s*(\d{1,9})\b/
  );
  const bare = text.trim().match(/^#?\s*(\d{1,9})$/);
  const raw = withKeyword?.[1] ?? bare?.[1];
  const id = raw ? Number(raw) : NaN;
  return Number.isInteger(id) && id > 0 ? id : null;
}

function matches(text: string, pattern: RegExp): boolean {
  return pattern.test(normalize(text));
}

const ORDER_INTENT = /(ma commande|mon colis|ou en est|suivi de (?:ma|mon)|suivre|tracking|numero de commande|statut)/;
const DELIVERY_INTENT = /(livraison|livrer|livre|delai|expedi|frais de port|port offert|combien de temps|quand (?:vais|va|vont) (?:je|il|elle|ils) )/;
const RETURNS_INTENT = /(retour|rembours|retract|echange|renvoyer|defectueux|abime|casse|annuler|annulation)/;
const PAYMENT_INTENT = /(paiement|payer|carte bancaire|stripe|securis|paypal|virement)/;
const CONTACT_INTENT = /(contact|joindre|telephone|appeler|parler a|humain|service client|reclamation|probleme)/;
const GREETING_INTENT = /^(bonjour|bonsoir|salut|hello|coucou|hey)\b/;
const PRODUCT_HINT = /(cadeau|idee|conseil|recommand|propos|nouveaute|nouveau|populaire|best|offrir)/;

async function answerOrder(
  history: ChatTurn[],
  allowLookup: () => boolean
): Promise<ChatAnswer> {
  // On relit les derniers messages du client : numéro et e-mail peuvent venir de tours différents.
  const userMessages = history.filter((t) => t.role === "user").slice(-6).reverse();
  let orderId: number | null = null;
  let email: string | null = null;
  for (const m of userMessages) {
    orderId ??= extractOrderId(m.content);
    email ??= extractEmail(m.content);
  }

  if (!orderId && !email) {
    return {
      reply: `Pour suivre votre commande, indiquez-moi votre ${ORDER_PROMPT_MARKER} et l'adresse e-mail utilisée lors de l'achat. Vous pouvez aussi utiliser la page ${SITE_URL}/suivi-commande.`,
      products: [],
      suggestions: [],
    };
  }
  if (!orderId) {
    return { reply: `Merci. Quel est votre ${ORDER_PROMPT_MARKER} ? Il figure dans l'e-mail de confirmation.`, products: [], suggestions: [] };
  }
  if (!email) {
    return { reply: "Merci. Quelle adresse e-mail avez-vous utilisée lors de la commande ?", products: [], suggestions: [] };
  }
  if (!allowLookup()) {
    return {
      reply: `Trop de recherches de commande en peu de temps. Réessayez dans quelques minutes ou utilisez ${SITE_URL}/suivi-commande.`,
      products: [],
      suggestions: [],
    };
  }

  const order = await getOrderForCustomer(orderId, email);
  if (!order) {
    return {
      reply: `Je ne trouve aucune commande avec ces informations. Vérifiez le numéro et l'adresse e-mail, ou écrivez-nous à ${CONTACT}.`,
      products: [],
      suggestions: [],
    };
  }

  const items = order.items.map((i) => `${i.quantity} × ${i.name}`).join(", ");
  const status = SUPPLIER_STATUS_LABELS[order.supplier_status ?? ""] ?? "Traitement en cours";
  const total = new Intl.NumberFormat("fr-FR", { style: "currency", currency: order.currency }).format(
    order.amount_total_cents / 100
  );
  const tracking = order.tracking_number
    ? ` Numéro de suivi : ${order.tracking_number}.`
    : order.supplier_status === "placed"
      ? " Le numéro de suivi apparaîtra dès l'expédition du colis."
      : "";
  return {
    reply: `Commande n° ${order.id} (${total}) : ${items}. Statut : ${status}.${tracking}`,
    products: [],
    suggestions: [],
  };
}

async function answerProducts(query: string): Promise<ChatAnswer> {
  const { tokens, maxPrice, products, outOfStock } = await searchProducts(query, 3);

  if (products.length > 0) {
    const budget = maxPrice !== null ? ` à moins de ${maxPrice} €` : "";
    return {
      reply: `Voici ce que je vous propose${budget}. Cliquez sur un produit pour voir la fiche, ou ajoutez-le directement au panier.`,
      products: products.map(toCard),
      suggestions: [],
    };
  }

  // Aucune correspondance : demande vague ("cadeau", "idée") → quelques produits en stock ;
  // sinon on propose les rubriques du catalogue.
  if (tokens.length === 0 && PRODUCT_HINT.test(normalize(query))) {
    const catalog = (await loadCatalog()).filter(
      (p) => p.in_stock && (maxPrice === null || p.price_cents / 100 <= maxPrice)
    );
    if (catalog.length > 0) {
      return {
        reply: "Voici quelques idées de notre boutique. Dites-moi pour qui ou pour quel usage (sommeil, massage, décoration…) et j'affinerai.",
        products: catalog.slice(0, 3).map(toCard),
        suggestions: [],
      };
    }
  }

  const labels = await availableSubcategoryLabels();
  if (outOfStock.length > 0) {
    const names = outOfStock.map((p) => `« ${p.name} »`).join(" et ");
    return {
      reply: `${names} ${outOfStock.length > 1 ? "sont actuellement en rupture de stock" : "est actuellement en rupture de stock"}. Je n'ai pas d'alternative en stock pour cette recherche : essayez une de nos rubriques, ou écrivez-nous à ${CONTACT}.`,
      products: [],
      suggestions: labels.slice(0, 6),
    };
  }
  return {
    reply: `Je n'ai rien trouvé qui corresponde${maxPrice !== null ? ` à moins de ${maxPrice} €` : ""}. Essayez une de nos rubriques, ou décrivez votre besoin autrement. Pour une question précise : ${CONTACT}.`,
    products: [],
    suggestions: labels.slice(0, 6),
  };
}

export async function answer(
  history: ChatTurn[],
  allowOrderLookup: () => boolean
): Promise<ChatAnswer> {
  const last = history[history.length - 1].content;
  const previousAssistant = [...history].reverse().find((t) => t.role === "assistant")?.content ?? "";
  const awaitingOrder = normalize(previousAssistant).includes(normalize(ORDER_PROMPT_MARKER)) ||
    /quelle adresse e-mail/i.test(previousAssistant);

  if (extractEmail(last) || awaitingOrder || matches(last, ORDER_INTENT) || extractOrderId(last)) {
    return answerOrder(history, allowOrderLookup);
  }
  if (matches(last, RETURNS_INTENT)) return { reply: FAQ.returns, products: [], suggestions: [] };
  if (matches(last, DELIVERY_INTENT)) return { reply: FAQ.delivery, products: [], suggestions: [] };
  if (matches(last, PAYMENT_INTENT)) return { reply: FAQ.payment, products: [], suggestions: [] };
  if (matches(last, CONTACT_INTENT)) return { reply: FAQ.contact, products: [], suggestions: [] };
  if (matches(last, GREETING_INTENT) && normalize(last).split(/\s+/).length <= 3) {
    return { reply: FAQ.greeting, products: [], suggestions: DEFAULT_SUGGESTIONS };
  }

  const result = await answerProducts(last);
  if (result.products.length === 0 && result.suggestions.length === 0) {
    return { reply: FAQ.fallback, products: [], suggestions: DEFAULT_SUGGESTIONS };
  }
  return result;
}
