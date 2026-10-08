"use client";

import { useCart } from "@/lib/cart-context";

// Barre d'achat fixée en bas de l'écran sur mobile uniquement.
export function StickyBuyBar({
  slug,
  name,
  priceCents,
  currency,
  inStock,
  priceLabel,
}: {
  slug: string;
  name: string;
  priceCents: number;
  currency: string;
  inStock: boolean;
  priceLabel: string;
}) {
  const { addItem } = useCart();
  if (!inStock) return null;

  return (
    <div
      data-sticky-buy-bar
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-stone-200 bg-stone-50/95 px-4 py-3 backdrop-blur md:hidden dark:border-stone-800 dark:bg-stone-950/95">
      <span className="font-semibold text-stone-900 dark:text-stone-50">{priceLabel}</span>
      <button
        type="button"
        onClick={() => addItem({ slug, name, priceCents, currency })}
        className="rounded-full bg-stone-900 px-6 py-2.5 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
