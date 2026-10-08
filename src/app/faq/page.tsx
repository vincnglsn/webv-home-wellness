import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LegalHeader } from "@/components/LegalHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FAQS } from "@/lib/faq";
import { SITE_URL } from "@/lib/products";

export const metadata: Metadata = {
  title: "Questions fréquentes — Maison Bien-Être",
  description:
    "Livraison, délais, paiement, retours, remboursement : les réponses aux questions les plus posées.",
  alternates: { canonical: `${SITE_URL}/faq` },
};


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
