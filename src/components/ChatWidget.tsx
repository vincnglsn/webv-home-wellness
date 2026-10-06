"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";

type ProductCard = {
  slug: string;
  name: string;
  priceCents: number;
  currency: string;
  imageUrl: string | null;
  inStock: boolean;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  products?: ProductCard[];
  suggestions?: string[];
};

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Bonjour, je suis le conseiller de Maison Bien-Être. Je peux vous aider à choisir un produit, suivre une commande ou répondre à vos questions sur la livraison et les retours. Pour une question plus précise, écrivez-nous à contact@whatelsebyvinc.com.",
};

const SUGGESTIONS = [
  "Je cherche un cadeau pour mieux dormir",
  "Où en est ma commande ?",
  "Quels sont les délais de livraison ?",
];

function Card({ product }: { product: ProductCard }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <div className="flex gap-3 rounded-xl border border-stone-200 bg-white p-2 dark:border-stone-700 dark:bg-stone-900">
      <Link href={`/produits/${product.slug}`} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-800">
        {product.imageUrl && (
          <Image src={product.imageUrl} alt={product.name} fill sizes="64px" className="object-cover" />
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <Link href={`/produits/${product.slug}`} className="truncate text-sm font-medium text-stone-900 hover:underline dark:text-stone-50">
          {product.name}
        </Link>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-stone-900 dark:text-stone-50">
            {formatPrice(product.priceCents, product.currency)}
          </span>
          {product.inStock ? (
            <button
              type="button"
              onClick={() => {
                addItem({
                  slug: product.slug,
                  name: product.name,
                  priceCents: product.priceCents,
                  currency: product.currency,
                });
                setAdded(true);
                setTimeout(() => setAdded(false), 1500);
              }}
              className="rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
            >
              {added ? "Ajouté ✓" : "Ajouter"}
            </button>
          ) : (
            <span className="text-xs text-stone-500">Rupture de stock</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const lastMessage = messages[messages.length - 1];
  const lastSuggestions =
    messages.length === 1 ? SUGGESTIONS : lastMessage.role === "assistant" ? (lastMessage.suggestions ?? []) : [];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Le message d'accueil est purement local : on ne l'envoie pas au modèle.
        body: JSON.stringify({
          messages: next.slice(1).map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = (await res.json()) as {
        reply?: string;
        products?: ProductCard[];
        suggestions?: string[];
      };
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            data.reply ??
            "Je rencontre un souci technique. Écrivez-nous à contact@whatelsebyvinc.com.",
          products: data.products,
          suggestions: data.suggestions,
        },
      ]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "Connexion impossible pour le moment. Écrivez-nous à contact@whatelsebyvinc.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Conseiller Maison Bien-Être"
          className="fixed inset-x-3 bottom-20 z-50 flex h-[32rem] max-h-[calc(100dvh-6rem)] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-xl sm:inset-x-auto sm:right-5 sm:w-96 dark:border-stone-700 dark:bg-stone-950"
        >
          <div className="flex items-center justify-between bg-stone-900 px-4 py-3 text-white dark:bg-stone-100 dark:text-stone-900">
            <span className="font-medium">Conseiller Maison Bien-Être</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fermer" className="text-lg leading-none">
              ×
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col gap-2 ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                      : "bg-white text-stone-800 dark:bg-stone-900 dark:text-stone-200"
                  }`}
                >
                  {m.content}
                </div>
                {m.products && m.products.length > 0 && (
                  <div className="flex w-full flex-col gap-2">
                    {m.products.map((p) => (
                      <Card key={p.slug} product={p} />
                    ))}
                  </div>
                )}
              </div>
            ))}
            {!loading && (lastSuggestions.length > 0) && (
              <div className="flex flex-wrap gap-2">
                {lastSuggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-stone-300 px-3 py-1 text-xs text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-900"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {loading && <p className="text-sm text-stone-500">Recherche en cours…</p>}
            <div ref={endRef} />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 border-t border-stone-200 p-3 dark:border-stone-800"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder="Votre question…"
              aria-label="Votre message"
              className="min-w-0 flex-1 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900"
            >
              Envoyer
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fermer le conseiller" : "Ouvrir le conseiller"}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
      >
        {open ? "Fermer" : "Une question ?"}
      </button>
    </>
  );
}
