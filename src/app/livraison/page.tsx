import type { Metadata } from "next";
import Link from "next/link";
import { LegalHeader } from "@/components/LegalHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/products";

export const metadata: Metadata = {
  title: "Livraison — Maison Bien-Être",
  description:
    "Pays livrés, délais, suivi de colis : tout savoir sur la livraison offerte en France, Belgique, Suisse et Luxembourg.",
  alternates: { canonical: `${SITE_URL}/livraison` },
};

const heading = "mb-2 font-semibold text-stone-900 dark:text-stone-50";

export default function LivraisonPage() {
  return (
    <div className="flex flex-1 flex-col bg-stone-50 dark:bg-stone-950">
      <LegalHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
        <h1 className="mb-6 text-2xl font-serif font-semibold text-stone-900 dark:text-stone-50">
          Livraison
        </h1>
        <div className="flex flex-col gap-6 text-stone-600 dark:text-stone-400">
          <section>
            <h2 className={heading}>Livraison offerte</h2>
            <p>
              La livraison est offerte, en France, en Belgique, en Suisse et au Luxembourg. Le
              prix affiché sur chaque fiche produit est le prix payé : il n&apos;y a pas de frais
              de port à ajouter au moment du paiement.
            </p>
          </section>
          <section>
            <h2 className={heading}>Pays livrés</h2>
            <p>
              Nous livrons à une adresse située en France, en Belgique, en Suisse ou au
              Luxembourg. L&apos;adresse de livraison est saisie lors du paiement.
            </p>
          </section>
          <section>
            <h2 className={heading}>Délais</h2>
            <p>
              Nos produits sont expédiés directement depuis nos entrepôts fournisseurs. Le délai
              de livraison moyen est de 7 à 20 jours ouvrés selon le produit et votre
              localisation. Il s&apos;agit d&apos;un délai moyen, pas d&apos;une garantie : un
              colis peut parfois arriver plus tôt ou un peu plus tard.
            </p>
            <p className="mt-3">
              Pour une occasion précise (cadeau, fête, Noël, Halloween), nous vous conseillons de
              commander le plus tôt possible : une commande passée trop près de la date ne pourra
              pas être livrée à temps.
            </p>
          </section>
          <section>
            <h2 className={heading}>Plusieurs articles, plusieurs colis</h2>
            <p>
              Si votre commande contient plusieurs articles, ils peuvent être expédiés en colis
              séparés, avec des délais différents. Ce n&apos;est pas une erreur. Si un article tarde à
              arriver alors que les autres sont livrés, écrivez-nous.
            </p>
          </section>
          <section>
            <h2 className={heading}>Suivi de votre colis</h2>
            <p>
              Un numéro de suivi vous est communiqué dès que le colis est pris en charge par le
              transporteur. Vous pouvez aussi consulter l&apos;état de votre commande à tout
              moment sur la page{" "}
              <Link href="/suivi-commande" className="underline">
                Suivi de commande
              </Link>
              , avec votre numéro de commande et l&apos;e-mail utilisé lors de l&apos;achat.
            </p>
          </section>
          <section>
            <h2 className={heading}>Un problème avec votre livraison ?</h2>
            <p>
              Colis en retard, abîmé ou incomplet : écrivez-nous à{" "}
              <a href="mailto:contact@whatelsebyvinc.com" className="underline">
                contact@whatelsebyvinc.com
              </a>{" "}
              en indiquant votre numéro de commande. Nous répondons sous 48h ouvrées. Les
              conditions de retour et de remboursement sont détaillées sur la page{" "}
              <Link href="/retours" className="underline">
                Livraison &amp; retours
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
