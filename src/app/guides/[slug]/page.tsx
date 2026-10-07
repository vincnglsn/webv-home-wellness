import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { LegalHeader } from "@/components/LegalHeader";
import { ProductGrid } from "@/components/ProductGrid";
import { SiteFooter } from "@/components/SiteFooter";
import { GUIDES, getGuide } from "@/lib/guides";
import { getProductsBySubcategory, SITE_URL, type Product } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — Maison Bien-Être`,
    description: guide.description,
    alternates: { canonical: `${SITE_URL}/guides/${guide.slug}` },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  let products: Product[] = [];
  try {
    const groups = await Promise.all(
      guide.products.map((p) => getProductsBySubcategory(p.category, p.subcategory))
    );
    products = groups.flat().filter((p) => p.in_stock);
  } catch {
    // Base indisponible : le guide reste lisible sans la sélection de produits.
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
    author: { "@type": "Organization", name: "Maison Bien-Être" },
    publisher: { "@type": "Organization", name: "Maison Bien-Être" },
  };

  return (
    <div className="flex flex-1 flex-col bg-stone-50 dark:bg-stone-950">
      <JsonLd data={articleJsonLd} />
      <LegalHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <p className="mb-2 text-sm">
          <Link href="/guides" className="text-stone-500 underline">
            Tous les guides
          </Link>
        </p>
        <h1 className="mb-4 text-3xl font-serif font-semibold text-stone-900 dark:text-stone-50">
          {guide.title}
        </h1>
        <p className="mb-8 text-lg text-stone-600 dark:text-stone-400">{guide.intro}</p>
        <div className="flex flex-col gap-6">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-2 text-xl font-serif font-semibold text-stone-900 dark:text-stone-50">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mb-3 text-stone-600 dark:text-stone-400">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
        {products.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-serif font-semibold text-stone-900 dark:text-stone-50">
              {guide.productsHeading}
            </h2>
            <ProductGrid products={products} />
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
