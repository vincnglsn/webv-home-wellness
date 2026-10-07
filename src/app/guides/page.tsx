import type { Metadata } from "next";
import Link from "next/link";
import { LegalHeader } from "@/components/LegalHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GUIDES } from "@/lib/guides";
import { SITE_URL } from "@/lib/products";

export const metadata: Metadata = {
  title: "Guides et idées — Maison Bien-Être",
  description:
    "Idées cadeaux, décoration de saison, coin détente : nos guides pour aménager et décorer la maison.",
  alternates: { canonical: `${SITE_URL}/guides` },
};

export default function GuidesPage() {
  return (
    <div className="flex flex-1 flex-col bg-stone-50 dark:bg-stone-950">
      <LegalHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
        <h1 className="mb-6 text-2xl font-serif font-semibold text-stone-900 dark:text-stone-50">
          Guides et idées
        </h1>
        <ul className="flex flex-col gap-4">
          {GUIDES.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="block rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
              >
                <h2 className="font-semibold text-stone-900 dark:text-stone-50">{guide.title}</h2>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                  {guide.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
