"use client";

import { useEffect } from "react";
import { CART_STORAGE_KEY, type CartItem } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

// Affiche le panier reçu depuis Facebook/Instagram dans le HTML (visible sans
// JavaScript, notamment par le robot de test de Meta), puis le pose dans le
// stockage local et ouvre /panier : CartProvider relit ce stockage au montage.
export function MetaCartLoader({ items }: { items: CartItem[] }) {
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage indisponible : on arrive quand même sur le panier.
    }
    window.location.replace("/panier");
  }, [items]);

  const total = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
  const currency = items[0]?.currency ?? "EUR";

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-16 text-stone-800 dark:text-stone-200">
      <h1 className="text-2xl font-semibold">Votre panier</h1>
      <ul className="divide-y divide-stone-200 dark:divide-stone-800">
        {items.map((item) => (
          <li key={item.slug} className="flex items-baseline justify-between gap-4 py-3">
            <span>
              {item.name} <span className="text-stone-500">× {item.quantity}</span>
            </span>
            <span>{formatPrice(item.priceCents * item.quantity, item.currency)}</span>
          </li>
        ))}
      </ul>
      <p className="flex justify-between border-t border-stone-300 pt-3 font-semibold dark:border-stone-700">
        <span>Total</span>
        <span>{formatPrice(total, currency)}</span>
      </p>
      <a
        href="/panier"
        className="inline-flex justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900"
      >
        Passer commande
      </a>
    </main>
  );
}
