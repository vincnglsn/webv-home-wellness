import type Anthropic from "@anthropic-ai/sdk";
import {
  categoryLabel,
  descriptionExcerpt,
  getProducts,
  subcategoryLabel,
  SITE_URL,
  type Product,
} from "@/lib/products";
import { getOrderForCustomer } from "@/lib/orders";

export type ChatProductCard = {
  slug: string;
  name: string;
  priceCents: number;
  currency: string;
  imageUrl: string | null;
  inStock: boolean;
};

export const CHAT_TOOLS: Anthropic.Tool[] = [
  {
    name: "search_products",
    description:
      "Cherche dans le catalogue de la boutique (produits réels, prix et stock à jour). " +
      "Sans paramètre, liste les produits en stock. Renvoie au plus 8 produits.",
    input_schema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Mots-clés français décrivant le besoin ou le produit (ex. \"sommeil\", \"massage dos\").",
        },
        category: {
          type: "string",
          enum: ["bien-etre", "decoration"],
          description: "Restreint à une catégorie.",
        },
        subcategory: {
          type: "string",
          description: "Identifiant de sous-catégorie (voir available_subcategories dans un résultat précédent).",
        },
        max_price_eur: { type: "number", description: "Prix maximum en euros." },
        include_out_of_stock: {
          type: "boolean",
          description: "Inclure les ruptures de stock (faux par défaut).",
        },
      },
    },
  },
  {
    name: "get_product",
    description: "Renvoie la fiche complète d'un produit (description détaillée, prix, stock) à partir de son slug.",
    input_schema: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
    },
  },
  {
    name: "show_products",
    description:
      "Affiche au client des cartes produit (photo, prix, bouton d'ajout au panier) pour 1 à 4 produits " +
      "précédemment trouvés avec search_products ou get_product. À appeler avant de rédiger ta réponse finale.",
    input_schema: {
      type: "object",
      properties: {
        slugs: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 4 },
      },
      required: ["slugs"],
    },
  },
  {
    name: "lookup_order",
    description:
      "Donne le statut et le suivi d'une commande. Exige le numéro de commande ET l'e-mail utilisé à l'achat, " +
      "fournis par le client.",
    input_schema: {
      type: "object",
      properties: {
        order_id: { type: "integer", description: "Numéro de commande." },
        email: { type: "string", description: "E-mail utilisé lors de la commande." },
      },
      required: ["order_id", "email"],
    },
  },
];

const SUPPLIER_STATUS_LABELS: Record<string, string> = {
  pending: "En attente de traitement",
  placed: "Commande transmise au fournisseur",
  shipped: "Commande expédiée",
  failed: "Un problème est survenu, l'équipe a été notifiée",
};

// Catalogue gardé en mémoire 60 s : évite une requête SQL à chaque tour d'outil.
let catalogCache: { at: number; products: Product[] } | null = null;
async function loadCatalog(): Promise<Product[]> {
  if (!catalogCache || Date.now() - catalogCache.at > 60_000) {
    catalogCache = { at: Date.now(), products: await getProducts() };
  }
  return catalogCache.products;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function compact(product: Product) {
  return {
    slug: product.slug,
    name: product.name,
    price_eur: product.price_cents / 100,
    category: categoryLabel(product.category),
    subcategory: product.subcategory,
    subcategory_label: product.subcategory ? subcategoryLabel(product.subcategory) : null,
    in_stock: product.in_stock,
    summary: descriptionExcerpt(product.description, 220),
  };
}

function score(product: Product, tokens: string[]): number {
  const name = normalize(product.name);
  const tags = normalize(
    `${categoryLabel(product.category)} ${product.subcategory ? subcategoryLabel(product.subcategory) : ""}`
  );
  const description = normalize(product.description);
  let total = 0;
  for (const token of tokens) {
    if (name.includes(token)) total += 3;
    if (tags.includes(token)) total += 2;
    if (description.includes(token)) total += 1;
  }
  return total;
}

async function searchProducts(input: Record<string, unknown>) {
  const catalog = await loadCatalog();
  const query = typeof input.query === "string" ? input.query : "";
  const tokens = normalize(query)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2);
  const maxPrice = typeof input.max_price_eur === "number" ? input.max_price_eur : null;
  const includeOut = input.include_out_of_stock === true;

  let pool = catalog.filter((p) => {
    if (!includeOut && !p.in_stock) return false;
    if (typeof input.category === "string" && p.category !== input.category) return false;
    if (typeof input.subcategory === "string" && p.subcategory !== input.subcategory) return false;
    if (maxPrice !== null && p.price_cents / 100 > maxPrice) return false;
    return true;
  });

  if (tokens.length > 0) {
    pool = pool
      .map((p) => ({ p, s: score(p, tokens) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.p);
  }

  const subcategories = Array.from(
    new Set(catalog.filter((p) => p.in_stock && p.subcategory).map((p) => p.subcategory as string))
  ).map((id) => ({ id, label: subcategoryLabel(id) }));

  return {
    total_matches: pool.length,
    products: pool.slice(0, 8).map(compact),
    available_subcategories: subcategories,
  };
}

async function getProduct(slug: unknown) {
  const catalog = await loadCatalog();
  const product = catalog.find((p) => p.slug === slug);
  if (!product) return { error: "Produit introuvable" };
  return { ...compact(product), description: product.description, url: `${SITE_URL}/produits/${product.slug}` };
}

async function showProducts(slugs: unknown, cards: Map<string, ChatProductCard>) {
  const catalog = await loadCatalog();
  const wanted = Array.isArray(slugs) ? slugs.filter((s): s is string => typeof s === "string") : [];
  const shown: string[] = [];
  const unknown: string[] = [];
  for (const slug of wanted.slice(0, 4)) {
    const product = catalog.find((p) => p.slug === slug);
    if (!product) {
      unknown.push(slug);
      continue;
    }
    cards.set(slug, {
      slug: product.slug,
      name: product.name,
      priceCents: product.price_cents,
      currency: product.currency,
      imageUrl: product.image_url,
      inStock: product.in_stock,
    });
    shown.push(slug);
  }
  return { displayed: shown, unknown_slugs: unknown };
}

async function lookupOrder(input: Record<string, unknown>) {
  const orderId = Number(input.order_id);
  const email = typeof input.email === "string" ? input.email.trim() : "";
  if (!Number.isInteger(orderId) || orderId <= 0 || !email) {
    return { error: "Numéro de commande et e-mail requis" };
  }
  const order = await getOrderForCustomer(orderId, email);
  if (!order) return { error: "Aucune commande trouvée avec ces informations" };
  return {
    order_id: order.id,
    payment_status: order.status,
    ordered_at: order.created_at,
    total_eur: order.amount_total_cents / 100,
    items: order.items.map((i) => ({ name: i.name, quantity: i.quantity })),
    fulfillment: SUPPLIER_STATUS_LABELS[order.supplier_status ?? ""] ?? "Traitement en cours",
    tracking_number: order.tracking_number,
  };
}

// Exécute un appel d'outil. Les erreurs sont renvoyées au modèle sous forme de
// résultat (is_error) pour qu'il puisse s'en excuser plutôt que de planter.
export async function runChatTool(
  name: string,
  input: Record<string, unknown>,
  ctx: { cards: Map<string, ChatProductCard>; allowOrderLookup: () => boolean }
): Promise<{ content: string; isError: boolean }> {
  try {
    let result: unknown;
    switch (name) {
      case "search_products":
        result = await searchProducts(input);
        break;
      case "get_product":
        result = await getProduct(input.slug);
        break;
      case "show_products":
        result = await showProducts(input.slugs, ctx.cards);
        break;
      case "lookup_order":
        if (!ctx.allowOrderLookup()) {
          return { content: "Trop de recherches de commande, réessayer plus tard.", isError: true };
        }
        result = await lookupOrder(input);
        break;
      default:
        return { content: `Outil inconnu : ${name}`, isError: true };
    }
    return { content: JSON.stringify(result), isError: false };
  } catch (error) {
    console.error(`[chat] outil ${name} en échec`, error);
    return { content: "Erreur technique lors de l'exécution de l'outil.", isError: true };
  }
}
