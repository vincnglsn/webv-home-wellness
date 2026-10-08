import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { getCjBalance } from "@/lib/cjdropshipping";
import { listPendingPayments, type PendingPayment } from "@/lib/fulfillment";
import { payNow } from "./actions";

export const metadata: Metadata = {
  title: "Commandes à payer chez CJ",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PendingPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ payees?: string; essayees?: string }>;
}) {
  // La connexion se fait sur /admin/avis (même mot de passe).
  if (!(await isAdmin())) redirect("/admin/avis");

  const { payees, essayees } = await searchParams;
  let pending: PendingPayment[] = [];
  let balance: number | null = null;
  let error = false;
  try {
    pending = await listPendingPayments();
  } catch {
    error = true;
  }
  try {
    balance = await getCjBalance();
  } catch {
    balance = null;
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 text-stone-800 dark:text-stone-200">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">
          Commandes à payer chez CJ
        </h1>
        <Link href="/admin/avis" className="text-sm underline">
          Avis clients
        </Link>
      </div>

      <p className="mb-2">
        Solde CJdropshipping :{" "}
        <strong>{balance === null ? "indisponible" : `${balance.toFixed(2)} $`}</strong>
      </p>
      <p className="mb-6 text-sm text-stone-600 dark:text-stone-400">
        Quand un client a payé mais que le solde CJ est insuffisant, la commande attend ici. Dès
        que le solde est rechargé (avec l&apos;argent reçu de Stripe), cliquez sur « Payer
        maintenant » : le site règle les commandes en attente. Sinon il réessaie tout seul chaque
        jour à 7 h.
      </p>

      {payees !== undefined && (
        <p className="mb-4 rounded-lg bg-stone-100 p-3 text-sm dark:bg-stone-900">
          {payees} commande(s) payée(s) sur {essayees} essayée(s).
        </p>
      )}
      {error && <p className="mb-4 text-sm text-red-600">Impossible de lire les commandes.</p>}

      {pending.length === 0 ? (
        <p className="text-sm">Aucune commande en attente de paiement.</p>
      ) : (
        <>
          <ul className="mb-6 flex flex-col gap-3">
            {pending.map((row) => (
              <li
                key={row.order_id + String(row.order_number)}
                className="rounded-xl border border-stone-200 bg-white p-4 text-sm dark:border-stone-800 dark:bg-stone-900"
              >
                Commande n°{row.order_id} ({row.order_number ?? "sans numéro"}) · créée le{" "}
                {new Date(row.created_at).toLocaleDateString("fr-FR")}
                {row.is_sandbox ? " · test" : ""}
              </li>
            ))}
          </ul>
          <form action={payNow}>
            <button
              type="submit"
              className="rounded-full bg-stone-900 px-6 py-2.5 text-sm font-medium text-white dark:bg-stone-50 dark:text-stone-900"
            >
              Payer maintenant
            </button>
          </form>
        </>
      )}
    </main>
  );
}
