import type { Metadata } from "next";
import Link from "next/link";
import { LegalHeader } from "@/components/LegalHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "À propos — Maison Bien-Être",
  description:
    "Qui se cache derrière Maison Bien-Être, comment les objets de décoration et de bien-être sont choisis, et comment nous joindre.",
  alternates: { canonical: "/a-propos" },
};

const heading = "mt-4 font-serif text-lg font-semibold text-stone-900 dark:text-stone-50";

export default function AProposPage() {
  return (
    <div className="flex flex-1 flex-col bg-stone-50 dark:bg-stone-950">
      <LegalHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
        <h1 className="mb-6 text-2xl font-serif font-semibold text-stone-900 dark:text-stone-50">
          À propos de Maison Bien-Être
        </h1>
        <div className="flex flex-col gap-4 text-stone-600 dark:text-stone-400">
          <h2 className={heading}>Qui est derrière la boutique</h2>
          <p>
            Je m&apos;appelle Vincent Nageleisen et je tiens Maison Bien-Être seul, comme
            entrepreneur individuel, depuis Aubignan, dans le Vaucluse. C&apos;est aussi moi qui
            publie, sous la signature « What else by Vinc », des sélections d&apos;objets pour la
            maison.
          </p>
          <p>
            L&apos;idée de la boutique est simple : réunir une sélection restreinte d&apos;objets
            qui rendent le quotidien plus doux, plutôt qu&apos;un catalogue sans fin. Des lumières
            d&apos;ambiance, des textiles, des objets zen, des accessoires de massage, de soin et
            de sommeil, et quelques décorations de saison.
          </p>

          <h2 className={heading}>Comment les produits sont choisis</h2>
          <p>
            Chaque article est sélectionné dans le catalogue de fournisseurs partenaires, puis
            vérifié avant sa mise en ligne :
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>les photos doivent montrer le modèle réellement vendu, sans montage trompeur ;</li>
            <li>le délai de livraison doit rester raisonnable, avec un suivi du colis ;</li>
            <li>
              la fiche est rédigée en français et s&apos;en tient aux informations vérifiables :
              dimensions, matières, contenu du colis ;
            </li>
            <li>
              aucune promesse de santé ni d&apos;effet miracle : ce sont des objets de confort et
              de décoration.
            </li>
          </ul>
          <p>
            Les commandes partent directement des entrepôts partenaires, ce qui permet
            d&apos;inclure la livraison dans le prix affiché. Si un produit ne tient pas ses
            promesses, il est retiré de la boutique.
          </p>

          <h2 className={heading}>Livraison, retours et paiement</h2>
          <p>
            La livraison est offerte en France, en Belgique, en Suisse et au Luxembourg, dans un
            délai moyen de 7 à 20 jours ouvrés. Vous disposez de 14 jours après réception pour
            retourner un article, et le paiement est sécurisé par Stripe. Tous les détails sont
            sur les pages{" "}
            <Link href="/livraison" className="underline">
              Livraison
            </Link>{" "}
            et{" "}
            <Link href="/retours" className="underline">
              Livraison &amp; retours
            </Link>
            .
          </p>

          <h2 className={heading}>Me contacter</h2>
          <p>
            Une question sur un produit ou une commande ? Écrivez-moi depuis la page{" "}
            <Link href="/contact" className="underline">
              Contact
            </Link>{" "}
            , je vous répondrai.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
