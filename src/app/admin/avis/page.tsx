import type { Metadata } from "next";
import { isAdmin, isAdminConfigured } from "@/lib/admin-auth";
import { listReviews, type AdminReview } from "@/lib/reviews";
import { login, logout, moderate } from "./actions";

export const metadata: Metadata = {
  title: "Modération des avis",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<AdminReview["status"], string> = {
  pending: "En attente",
  published: "Publié",
  rejected: "Rejeté",
};

const button =
  "rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-900 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-50 dark:hover:bg-stone-900";

function ActionButton({ id, status, label }: { id: number; status: string; label: string }) {
  return (
    <form action={moderate}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button type="submit" className={button}>
        {label}
      </button>
    </form>
  );
}

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;

  if (!isAdminConfigured()) {
    return (
      <main className="mx-auto max-w-xl px-6 py-16 text-stone-700 dark:text-stone-300">
        <h1 className="mb-3 text-xl font-semibold">Espace admin fermé</h1>
        <p>
          Définissez la variable d&apos;environnement <code>ADMIN_PASSWORD</code> sur
          l&apos;hébergeur pour activer la modération.
        </p>
      </main>
    );
  }

  if (!(await isAdmin())) {
    return (
      <main className="mx-auto max-w-sm px-6 py-16">
        <h1 className="mb-4 text-xl font-semibold text-stone-900 dark:text-stone-50">
          Modération des avis
        </h1>
        <form action={login} className="flex flex-col gap-3">
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="Mot de passe"
            className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50"
          />
          {erreur && <p className="text-sm text-red-600">Mot de passe incorrect.</p>}
          <button
            type="submit"
            className="self-start rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-white dark:bg-stone-50 dark:text-stone-900"
          >
            Se connecter
          </button>
        </form>
      </main>
    );
  }

  let reviews: AdminReview[] = [];
  let loadError = false;
  try {
    reviews = await listReviews();
  } catch {
    loadError = true;
  }
  const pending = reviews.filter((review) => review.status === "pending");
  const others = reviews.filter((review) => review.status !== "pending");

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">
          Modération des avis
        </h1>
        <form action={logout}>
          <button type="submit" className={button}>
            Se déconnecter
          </button>
        </form>
      </div>

      {loadError && (
        <p className="mb-6 text-sm text-red-600">
          Impossible de lire les avis (la table reviews existe-t-elle ?).
        </p>
      )}

      <h2 className="mb-3 text-lg font-semibold text-stone-900 dark:text-stone-50">
        En attente ({pending.length})
      </h2>
      <ReviewList reviews={pending} empty="Aucun avis en attente." />

      <h2 className="mb-3 mt-10 text-lg font-semibold text-stone-900 dark:text-stone-50">
        Déjà traités ({others.length})
      </h2>
      <ReviewList reviews={others} empty="Aucun avis traité." />
    </main>
  );
}

function ReviewList({ reviews, empty }: { reviews: AdminReview[]; empty: string }) {
  if (reviews.length === 0) {
    return <p className="text-sm text-stone-600 dark:text-stone-400">{empty}</p>;
  }
  return (
    <ul className="flex flex-col gap-4">
      {reviews.map((review) => (
        <li
          key={review.id}
          className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900"
        >
          <p className="text-sm text-stone-500">
            {review.product_slug} · commande n°{review.order_id} · {review.display_name} ·{" "}
            {new Date(review.created_at).toLocaleDateString("fr-FR")} ·{" "}
            <strong>{STATUS_LABELS[review.status]}</strong>
          </p>
          <p className="mt-1 text-amber-500" aria-label={`${review.rating} sur 5`}>
            {"★".repeat(review.rating)}
            <span className="text-stone-300 dark:text-stone-700">
              {"★".repeat(5 - review.rating)}
            </span>
          </p>
          <p className="mt-1 whitespace-pre-line text-stone-700 dark:text-stone-300">
            {review.body}
          </p>
          <div className="mt-3 flex gap-2">
            {review.status !== "published" && (
              <ActionButton id={review.id} status="published" label="Publier" />
            )}
            {review.status !== "rejected" && (
              <ActionButton id={review.id} status="rejected" label="Rejeter" />
            )}
            {review.status !== "pending" && (
              <ActionButton id={review.id} status="pending" label="Remettre en attente" />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
