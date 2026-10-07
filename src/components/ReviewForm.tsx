"use client";

import { useState } from "react";

const input =
  "rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50";

export function ReviewForm({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, orderId, email, displayName, rating, body, website }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur lors de l'envoi");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <p className="rounded-lg border border-stone-200 bg-white p-4 text-sm text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">
        Merci ! Votre avis sera publié après relecture.
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-900 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-50 dark:hover:bg-stone-900"
      >
        Donner mon avis
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-3">
      <p className="text-sm text-stone-600 dark:text-stone-400">
        Réservé aux clients : indiquez le numéro de commande et l&apos;e-mail utilisés lors de
        l&apos;achat (voir votre e-mail de confirmation).
      </p>
      <div className="flex gap-1" role="radiogroup" aria-label="Note">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={rating === value}
            aria-label={`${value} sur 5`}
            onClick={() => setRating(value)}
            className={`text-2xl ${value <= rating ? "text-amber-500" : "text-stone-300 dark:text-stone-700"}`}
          >
            ★
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          className={input}
          placeholder="N° de commande"
          inputMode="numeric"
          required
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <input
          className={`${input} flex-1`}
          type="email"
          placeholder="E-mail de la commande"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input
        className={input}
        placeholder="Prénom affiché"
        required
        maxLength={40}
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <textarea
        className={input}
        rows={4}
        placeholder="Votre avis (10 caractères minimum)"
        required
        maxLength={1000}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading || rating === 0}
        className="self-start rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-stone-50 dark:text-stone-900"
      >
        {loading ? "Envoi…" : "Envoyer mon avis"}
      </button>
    </form>
  );
}
