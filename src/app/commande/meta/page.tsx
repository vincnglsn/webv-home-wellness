import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import type { CartItem } from "@/lib/cart-context";
import { MetaCartLoader } from "./MetaCartLoader";

// URL de paiement appelée par Meta (Facebook et Instagram) quand un client
// clique sur « Acheter » : /commande/meta?products=slug1:2,slug2:1
// Les identifiants sont les slugs du flux (g:id). Les prix et la disponibilité
// sont toujours relus depuis la base, jamais déduits de l'adresse.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Votre panier — Maison Bien-Être",
  robots: { index: false, follow: false },
};

const MAX_LINES = 20;

function parseProducts(raw: string | undefined): { slug: string; quantity: number }[] {
  if (!raw) return [];
  const merged = new Map<string, number>();
  for (const part of raw.split(",").slice(0, MAX_LINES)) {
    const idx = part.lastIndexOf(":");
    const rawSlug = idx === -1 ? part : part.slice(0, idx);
    const rawQty = idx === -1 ? "1" : part.slice(idx + 1);
    let slug: string;
    try {
      slug = decodeURIComponent(rawSlug).trim();
    } catch {
      continue;
    }
    const quantity = Math.max(1, Math.min(99, Math.floor(Number(rawQty) || 1)));
    if (!slug) continue;
    merged.set(slug, Math.min(99, (merged.get(slug) ?? 0) + quantity));
  }
  return [...merged].map(([slug, quantity]) => ({ slug, quantity }));
}

export default async function MetaCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.products) ? params.products[0] : params.products;
  const requested = parseProducts(raw);

  const items: CartItem[] = [];
  for (const { slug, quantity } of requested) {
    const product = await getProductBySlug(slug).catch(() => null);
    if (!product || !product.in_stock) continue;
    items.push({
      slug: product.slug,
      name: product.name,
      priceCents: product.price_cents,
      currency: product.currency,
      quantity,
    });
  }

  // Aucun produit valide (lien erroné, rupture de stock) : on laisse le client
  // sur la boutique plutôt que sur un panier vide.
  if (items.length === 0) redirect("/");

  return <MetaCartLoader items={items} />;
}
