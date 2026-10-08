import Link from "next/link";
import { getCategoryTree, getProducts, type CategoryTree, type Product } from "@/lib/products";
import { CartHeaderLink } from "@/components/CartHeaderLink";
import { SiteFooter } from "@/components/SiteFooter";
import { CategoryNav } from "@/components/CategoryNav";
import { CategoryCards } from "@/components/CategoryCards";
import { GroupedProductGrid, ProductGrid } from "@/components/ProductGrid";
import { GUIDES } from "@/lib/guides";
import { SiteLogo } from "@/components/SiteLogo";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/products";

export const revalidate = 60;

const HOME_TITLE = "Maison Bien-Être — Décoration et bien-être pour la maison";
const HOME_DESCRIPTION =
  "Objets de décoration et de bien-être choisis pour un intérieur serein : lumières, textiles, massage, sommeil. Livraison offerte en France, Belgique, Suisse et Luxembourg, retours sous 14 jours.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    siteName: "Maison Bien-Être",
    locale: "fr_FR",
    type: "website",
  },
};

const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Maison Bien-Être",
    url: SITE_URL,
    email: "contact@whatelsebyvinc.com",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Maison Bien-Être",
    url: SITE_URL,
    inLanguage: "fr-FR",
  },
];

export default async function Home() {
  let products: Product[] = [];
  let tree: CategoryTree[] = [];
  let dbError = false;

  try {
    [products, tree] = await Promise.all([getProducts(), getCategoryTree()]);
  } catch {
    dbError = true;
  }

  const newArrivals = products
    .filter((product) => product.in_stock)
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  return (
    <div className="flex flex-1 flex-col bg-stone-50 dark:bg-stone-950">
      {siteJsonLd.map((data) => (
        <JsonLd key={data["@type"]} data={data} />
      ))}
      <header className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <SiteLogo />
          <nav className="flex items-center gap-4 text-sm text-stone-600 dark:text-stone-400">
            <Link href="/">Boutique</Link>
            <CartHeaderLink />
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 via-stone-100 to-stone-200 px-6 py-6 text-center sm:px-10 sm:py-8 dark:from-stone-800 dark:via-stone-900 dark:to-stone-950">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
            Maison Bien-Être
          </p>
          <h1 className="mx-auto max-w-2xl text-2xl font-serif font-semibold leading-tight text-stone-900 sm:text-3xl dark:text-stone-50">
            Une maison apaisée, un quotidien plus doux
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-stone-700 sm:text-base dark:text-stone-300">
            Une sélection d&apos;objets de bien-être et de décoration pour créer un intérieur serein.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
            <a
              href="#catalogue"
              className="rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-stone-700 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              Découvrir la boutique
            </a>
            <Link
              href="/guides/idees-cadeaux-noel-maison"
              className="rounded-full border border-stone-400 px-5 py-2 text-sm font-medium text-stone-900 transition hover:bg-white/60 dark:border-stone-600 dark:text-stone-50 dark:hover:bg-stone-800"
            >
              Idées cadeaux de Noël
            </Link>
          </div>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-stone-700 dark:text-stone-300">
            <li>🚚 Livraison offerte</li>
            <li>↩️ Retours sous 14 jours</li>
            <li>🔒 Paiement sécurisé</li>
          </ul>
        </section>

        {dbError && (
          <p className="mb-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
            La base de données n&apos;est pas encore accessible (variable{" "}
            <code>DATABASE_URL</code> manquante ou schéma non initialisé). Exécute{" "}
            <code>sql/schema.sql</code> sur ta base Neon puis recharge la page.
          </p>
        )}

        {!dbError && (
          <>
            <CategoryCards tree={tree} products={products} />

            {newArrivals.length > 0 && (
              <section className="mb-14">
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">
                      Nouveautés
                    </h2>
                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                      Les derniers objets ajoutés à la boutique.
                    </p>
                  </div>
                </div>
                <ProductGrid products={newArrivals} />
              </section>
            )}

            <div id="catalogue" className="scroll-mt-6">
              <CategoryNav tree={tree} />
            </div>

            {products.length === 0 ? (
              <p className="text-stone-500">Aucun produit disponible pour le moment.</p>
            ) : (
              <GroupedProductGrid products={products} />
            )}
          </>
        )}

        <section className="mt-16 border-t border-stone-200 pt-12 dark:border-stone-800">
          <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">
            Guides et idées
          </h2>
          <p className="mt-1 mb-5 text-sm text-stone-600 dark:text-stone-400">
            Pour décorer, offrir et aménager la maison.
          </p>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {GUIDES.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="flex h-full flex-col rounded-xl border border-stone-200 bg-white p-5 transition hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
                >
                  <span className="font-semibold text-stone-900 dark:text-stone-50">{guide.title}</span>
                  <span className="mt-2 text-sm text-stone-600 dark:text-stone-400">{guide.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 grid grid-cols-1 gap-8 border-t border-stone-200 pt-12 text-center sm:grid-cols-3 dark:border-stone-800">
          <div>
            <p className="font-semibold text-stone-900 dark:text-stone-50">Paiement sécurisé</p>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Transactions chiffrées via Stripe, aucune donnée bancaire stockée sur ce site.
            </p>
          </div>
          <div>
            <p className="font-semibold text-stone-900 dark:text-stone-50">Livraison suivie</p>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Numéro de suivi communiqué dès l&apos;expédition de votre commande.
            </p>
          </div>
          <div>
            <p className="font-semibold text-stone-900 dark:text-stone-50">
              Rétractation 14 jours
            </p>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Un produit ne convient pas ? Retour possible dans les 14 jours suivant réception.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
