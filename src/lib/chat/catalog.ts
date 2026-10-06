import {
  categoryLabel,
  getProducts,
  subcategoryLabel,
  type Product,
} from "@/lib/products";

export type ChatProductCard = {
  slug: string;
  name: string;
  priceCents: number;
  currency: string;
  imageUrl: string | null;
  inStock: boolean;
};

// Catalogue gardé en mémoire 60 s : évite une requête SQL à chaque message.
let catalogCache: { at: number; products: Product[] } | null = null;
export async function loadCatalog(): Promise<Product[]> {
  if (!catalogCache || Date.now() - catalogCache.at > 60_000) {
    catalogCache = { at: Date.now(), products: await getProducts() };
  }
  return catalogCache.products;
}

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function toCard(product: Product): ChatProductCard {
  return {
    slug: product.slug,
    name: product.name,
    priceCents: product.price_cents,
    currency: product.currency,
    imageUrl: product.image_url,
    inStock: product.in_stock,
  };
}

const STOPWORDS = new Set([
  "les", "des", "une", "pour", "avec", "dans", "que", "qui", "quoi", "est", "sont", "pas",
  "mon", "ton", "son", "mes", "tes", "ses", "nos", "vos", "leur", "leurs", "ces", "cet",
  "cette", "vous", "nous", "je", "tu", "il", "elle", "ils", "elles", "veux", "voudrais",
  "cherche", "cherchons", "besoin", "avez", "avoir", "faire", "quel", "quelle", "quels",
  "quelles", "comment", "bonjour", "salut", "merci", "plus", "moins", "tres", "bien",
  "sur", "sous", "aux", "par", "mais", "donc", "ainsi", "peut", "peux", "puis", "aussi",
  "euros", "euro", "prix", "produit", "produits", "article", "articles", "quelque",
  "chose", "propose", "proposer", "idee", "idees", "cadeau", "cadeaux", "offrir",
  "recommande", "recommander", "conseil", "conseille", "svp", "plait", "aimerais",
]);

// Mots du langage courant → termes présents dans le catalogue (noms, sous-catégories).
const SYNONYMS: Record<string, string[]> = {
  dormir: ["sommeil", "repos", "nuit"],
  dort: ["sommeil", "repos", "nuit"],
  nuit: ["sommeil", "repos"],
  fatigue: ["sommeil", "repos", "detente"],
  insomnie: ["sommeil", "repos"],
  relaxer: ["detente", "massage", "zen"],
  relaxation: ["detente", "massage", "zen"],
  relax: ["detente", "massage", "zen"],
  stress: ["detente", "massage", "zen"],
  stresse: ["detente", "massage", "zen"],
  detendre: ["detente", "massage", "zen"],
  calme: ["detente", "zen"],
  masser: ["massage"],
  douleur: ["massage", "posture", "dos"],
  courbature: ["massage", "sport"],
  nuque: ["massage", "posture"],
  dos: ["posture", "massage"],
  musculation: ["sport"],
  yoga: ["sport", "zen", "posture"],
  fitness: ["sport"],
  soin: ["rituel"],
  beaute: ["soin", "rituel"],
  deco: ["decoration", "mur", "textile"],
  decorer: ["decoration", "mur", "textile"],
  maison: ["decoration"],
  salon: ["decoration", "textile"],
  chambre: ["decoration", "sommeil"],
  mur: ["murs", "textile"],
  murale: ["murs", "textile"],
  coussin: ["textile", "sommeil"],
  plaid: ["textile"],
  noel: ["noel"],
  sapin: ["noel"],
  halloween: ["halloween"],
  citrouille: ["halloween"],
  zen: ["zen", "detente"],
  meditation: ["zen", "detente"],
};

function stem(token: string): string {
  return token.length > 4 && /[sx]$/.test(token) ? token.slice(0, -1) : token;
}

export function queryTokens(query: string): string[] {
  const base = normalize(query)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t) && !/^\d+$/.test(t))
    .map(stem);
  const expanded = new Set<string>();
  for (const token of base) {
    expanded.add(token);
    for (const extra of SYNONYMS[token] ?? []) expanded.add(extra);
  }
  return Array.from(expanded);
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

export function extractMaxPrice(query: string): number | null {
  const match = normalize(query).match(
    /(?:moins de|maximum|max|sous|inferieur a|jusqu'?a|budget(?: de)?)\s*(\d{1,4})/
  );
  return match ? Number(match[1]) : null;
}

// Produits en stock correspondant à la demande, du plus pertinent au moins pertinent.
export async function searchProducts(query: string, limit = 3) {
  const catalog = await loadCatalog();
  const maxPrice = extractMaxPrice(query);
  const tokens = queryTokens(query);
  let pool = catalog.filter(
    (p) => p.in_stock && (maxPrice === null || p.price_cents / 100 <= maxPrice)
  );
  if (tokens.length > 0) {
    pool = pool
      .map((p) => ({ p, s: score(p, tokens) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.p);
  }
  const outOfStock =
    tokens.length > 0
      ? catalog.filter((p) => !p.in_stock && score(p, tokens) > 0).slice(0, 2)
      : [];
  return { tokens, maxPrice, products: pool.slice(0, limit), outOfStock };
}

// Sous-catégories en stock, proposées au visiteur quand rien ne correspond.
export async function availableSubcategoryLabels(): Promise<string[]> {
  const catalog = await loadCatalog();
  const ids = new Set(
    catalog.filter((p) => p.in_stock && p.subcategory).map((p) => p.subcategory as string)
  );
  return Array.from(ids).map(subcategoryLabel);
}
