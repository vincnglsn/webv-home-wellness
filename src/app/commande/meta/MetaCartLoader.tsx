"use client";

import { useEffect } from "react";
import { CART_STORAGE_KEY, type CartItem } from "@/lib/cart-context";

// Pose le panier reçu depuis Facebook/Instagram dans le stockage local puis
// recharge /panier : CartProvider relit ce stockage au montage de la page.
export function MetaCartLoader({ items }: { items: CartItem[] }) {
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage indisponible : on arrive quand même sur le panier.
    }
    window.location.replace("/panier");
  }, [items]);

  return (
    <main className="flex flex-1 items-center justify-center bg-stone-50 px-6 py-24 text-stone-600 dark:bg-stone-950 dark:text-stone-400">
      <p>Préparation de votre panier…</p>
    </main>
  );
}
