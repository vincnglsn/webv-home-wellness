"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

// Barre d'achat fixée en bas de l'écran sur mobile uniquement. Elle n'apparaît que
// lorsque le bouton d'achat principal (#achat) n'est plus visible à l'écran.
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
  const [mainButtonVisible, setMainButtonVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById("achat");
    if (!target || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) =>
      setMainButtonVisible(entry.isIntersecting)
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!inStock) return null;

  return (
    <div
      data-sticky-buy-bar={mainButtonVisible ? undefined : ""}
      aria-hidden={mainButtonVisible}
      className={`fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-stone-200 bg-stone-50/95 px-4 py-3 backdrop-blur transition duration-200 md:hidden dark:border-stone-800 dark:bg-stone-950/95 ${
        mainButtonVisible ? "pointer-events-none translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <span className="font-semibold text-stone-900 dark:text-stone-50">{priceLabel}</span>
      <button
        type="button"
        tabIndex={mainButtonVisible ? -1 : 0}
        onClick={() => addItem({ slug, name, priceCents, currency })}
        className="rounded-full bg-stone-900 px-6 py-2.5 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
