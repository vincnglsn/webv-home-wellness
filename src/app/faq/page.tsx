import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LegalHeader } from "@/components/LegalHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/products";

export const metadata: Metadata = {
  title: "Questions fréquentes — Maison Bien-Être",
  description:
    "Livraison, délais, paiement, retours, remboursement : les réponses aux questions les plus posées.",
  alternates: { canonical: `${SITE_URL}/faq` },
};

type Faq = { question: string; answer: string };

// Les réponses reprennent strictement les informations des pages Livraison,
// Livraison & retours, CGV et Contact : toute modification de ces règles doit
// être répercutée ici.
const FAQS: Faq[] = [
  {
    question: "Dans quels pays livrez-vous ?",
    answer: "Nous livrons en France, en Belgique, en Suisse et au Luxembourg.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "Nos produits sont expédiés directement depuis nos entrepôts fournisseurs. Le délai moyen est de 7 à 20 jours ouvrés selon le produit et votre localisation.",
  },
  {
    question: "La livraison est-elle payante ?",
    answer:
      "Non, la livraison est offerte en France, en Belgique, en Suisse et au Luxembourg. Le prix affiché est le prix payé.",
  },
  {
    question: "Comment suivre ma commande ?",
    answer:
      "Un numéro de suivi vous est communiqué dès que le colis est pris en charge par le transporteur. Vous pouvez aussi consulter votre commande sur la page Suivi de commande, avec votre numéro de commande et l'e-mail utilisé lors de l'achat.",
  },
  {
    question: "Ma commande arrive en plusieurs colis, est-ce normal ?",
    answer:
      "Oui, une commande de plusieurs articles peut être expédiée en colis séparés, avec des délais différents. Si un article tarde alors que les autres sont livrés, écrivez-nous.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Le paiement se fait par carte bancaire, via notre prestataire de paiement sécurisé Stripe. Les prix sont indiqués en euros, toutes taxes comprises.",
  },
  {
    question: "Puis-je retourner un article ?",
    answer:
      "Oui. Vous disposez de 14 jours à compter de la réception pour exercer votre droit de rétractation, sans avoir à justifier de motif. Contactez-nous à contact@whatelsebyvinc.com avec votre numéro de commande : le retour s'effectue par envoi postal.",
  },
  {
    question: "Dans quel état dois-je retourner l'article ?",
    answer: "Les articles doivent nous être retournés neufs ou légèrement utilisés.",
  },
  {
    question: "Qui paie les frais de retour ?",
    answer:
      "Les frais de retour sont à la charge du client, sauf si le produit est défectueux ou non conforme à la commande : ils sont alors intégralement remboursés.",
  },
  {
    question: "Proposez-vous des échanges ?",
    answer:
      "Non, les échanges ne sont pas proposés. Tout retour accepté donne lieu à un remboursement.",
  },
  {
    question: "Quand serai-je remboursé ?",
    answer:
      "Le remboursement est effectué sous 14 jours à compter de la réception de l'article retourné, sur le même moyen de paiement que celui utilisé lors de l'achat.",
  },
  {
    question: "Mon produit est défectueux ou ne correspond pas à ma commande, que faire ?",
    answer:
      "Écrivez-nous à contact@whatelsebyvinc.com avec votre numéro de commande et, si possible, des photos. Les frais de retour d'un produit défectueux ou non conforme sont intégralement remboursés.",
  },
  {
    question: "Comment vous contacter, et sous quel délai répondez-vous ?",
    answer:
      "Par e-mail à contact@whatelsebyvinc.com. Nous répondons sous 48h ouvrées.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <div className="flex flex-1 flex-col bg-stone-50 dark:bg-stone-950">
      <JsonLd data={faqJsonLd} />
      <LegalHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
        <h1 className="mb-6 text-2xl font-serif font-semibold text-stone-900 dark:text-stone-50">
          Questions fréquentes
        </h1>
        <div className="flex flex-col gap-3">
          {FAQS.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-stone-200 bg-white px-5 py-4 dark:border-stone-800 dark:bg-stone-900"
            >
              <summary className="cursor-pointer list-none font-medium text-stone-900 dark:text-stone-50">
                {item.question}
              </summary>
              <p className="mt-3 text-stone-600 dark:text-stone-400">{item.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-sm text-stone-600 dark:text-stone-400">
          Vous ne trouvez pas votre réponse ? Consultez la page{" "}
          <Link href="/livraison" className="underline">
            Livraison
          </Link>
          , la page{" "}
          <Link href="/retours" className="underline">
            Livraison &amp; retours
          </Link>{" "}
          ou{" "}
          <Link href="/contact" className="underline">
            contactez-nous
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
