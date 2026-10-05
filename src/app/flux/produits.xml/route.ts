import { getProducts, categoryLabel, subcategoryLabel, SITE_URL } from "@/lib/products";

// Flux produit au format RSS 2.0 avec l'espace de noms Google (g:), accepté tel
// quel par Google Merchant Center, Pinterest (catalogues) et Meta (Facebook et
// Instagram Shop). Les frais de livraison et la TVA se règlent dans chaque
// compte plateforme, pas dans le flux.
export const dynamic = "force-dynamic";

const BRAND = "Maison Bien-Être";

// Catégories de la taxonomie Google : Maison et jardin > Décoration, Santé et beauté.
const GOOGLE_CATEGORY: Record<string, string> = {
  decoration: "696",
  "bien-etre": "469",
};

function xml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let products;
  try {
    products = await getProducts();
  } catch {
    return new Response("Catalogue indisponible", { status: 503 });
  }

  const items = products
    .map((p) => {
      const price = `${(p.price_cents / 100).toFixed(2)} ${p.currency}`;
      const productType = [categoryLabel(p.category), p.subcategory ? subcategoryLabel(p.subcategory) : null]
        .filter(Boolean)
        .join(" > ");
      return [
        "    <item>",
        `      <g:id>${xml(p.slug)}</g:id>`,
        `      <title>${xml(p.name.slice(0, 150))}</title>`,
        `      <description>${xml(p.description.trim().slice(0, 5000))}</description>`,
        `      <link>${xml(`${SITE_URL}/produits/${p.slug}`)}</link>`,
        p.image_url ? `      <g:image_link>${xml(p.image_url)}</g:image_link>` : null,
        `      <g:availability>${p.in_stock ? "in_stock" : "out_of_stock"}</g:availability>`,
        `      <g:price>${xml(price)}</g:price>`,
        "      <g:condition>new</g:condition>",
        `      <g:brand>${xml(BRAND)}</g:brand>`,
        "      <g:identifier_exists>no</g:identifier_exists>",
        GOOGLE_CATEGORY[p.category]
          ? `      <g:google_product_category>${GOOGLE_CATEGORY[p.category]}</g:google_product_category>`
          : null,
        `      <g:product_type>${xml(productType)}</g:product_type>`,
        "    </item>",
      ]
        .filter((line): line is string => line !== null)
        .join("\n");
    })
    .join("\n");

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">',
    "  <channel>",
    `    <title>${xml(BRAND)}</title>`,
    `    <link>${xml(SITE_URL)}</link>`,
    "    <description>Catalogue Maison Bien-Être : bien-être et décoration</description>",
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  // Cache court : les plateformes récupèrent le flux à la demande (routine
  // quotidienne, bouton « mettre à jour »), il doit refléter la base à quelques
  // minutes près. Une heure de cache servait l'ancien flux sans les nouveaux produits.
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
