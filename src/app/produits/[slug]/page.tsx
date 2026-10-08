import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProductBySlug,
  getRelatedProducts,
  formatPrice,
  categoryLabel,
  subcategoryLabel,
  descriptionExcerpt,
  SITE_URL,
} from "@/lib/products";
import { CartHeaderLink } from "@/components/CartHeaderLink";
import { AddToCartButton } from "@/components/AddToCartButton";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { ProductGrid } from "@/components/ProductGrid";
import { SiteLogo } from "@/components/SiteLogo";
import { ReviewForm } from "@/components/ReviewForm";
import { AnnouncementBar, ProductDetailV2 } from "@/components/ProductDetailV2";
import { galleryImages as galleryImagesFor, usesNewLayout } from "@/lib/product-sections";
import { getPublishedReviews, summarize } from "@/lib/reviews";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  if (!product) {
    return { title: "Produit introuvable — Maison Bien-Être" };
  }

  const title = `${product.name} — Maison Bien-Être`;
  const description = descriptionExcerpt(product.description);
  const url = `${SITE_URL}/produits/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      ...(product.image_url ? { images: [{ url: product.image_url }] } : {}),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product).catch(() => []);

  // La table des avis peut ne pas exister encore : la fiche reste affichée sans.
  const reviews = await getPublishedReviews(product.slug).catch(() => []);
  const reviewSummary = summarize(reviews);

  const newLayout = usesNewLayout(product.slug);
  const galleryImages = newLayout ? galleryImagesFor(product.slug, product.image_url) : [];
  const COUNTRIES = ["FR", "BE", "CH", "LU"];

  const productUrl =`${SITE_URL}/produits/${product.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Boutique", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLabel(product.category),
        item: `${SITE_URL}/categorie/${product.category}`,
      },
      ...(product.subcategory
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: subcategoryLabel(product.subcategory),
              item: `${SITE_URL}/categorie/${product.category}/${product.subcategory}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: product.subcategory ? 4 : 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: descriptionExcerpt(product.description, 500),
    ...(galleryImages.length > 0
      ? { image: galleryImages }
      : product.image_url
        ? { image: [product.image_url] }
        : {}),
    brand: { "@type": "Brand", name: "Maison Bien-Être" },
    // Note moyenne publiée uniquement si de vrais avis modérés existent.
    ...(reviewSummary
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviewSummary.average,
            reviewCount: reviewSummary.count,
          },
          review: reviews.map((review) => ({
            "@type": "Review",
            author: { "@type": "Person", name: review.display_name },
            datePublished: new Date(review.created_at).toISOString().slice(0, 10),
            reviewBody: review.body,
            reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5 },
          })),
        }
      : {}),
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: product.currency,
      price: (product.price_cents / 100).toFixed(2),
      // Livraison offerte et retours sous 14 jours : voir les pages Livraison et Livraison & retours.
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "EUR" },
        shippingDestination: COUNTRIES.map((addressCountry) => ({
          "@type": "DefinedRegion",
          addressCountry,
        })),
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: COUNTRIES,
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
      },
      availability: product.in_stock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="flex flex-1 flex-col bg-stone-50 dark:bg-stone-950">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={productJsonLd} />
      {newLayout && <AnnouncementBar />}
      <header className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <SiteLogo />
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-stone-600 dark:text-stone-400">
              ← Retour à la boutique
            </Link>
            <CartHeaderLink />
          </div>
        </div>
      </header>

      <main
        className={`mx-auto w-full max-w-5xl flex-1 px-6 py-12 ${newLayout ? "pb-28 md:pb-12" : ""}`}
      >
        {newLayout ? (
          <ProductDetailV2 product={product} images={galleryImages} reviewSummary={reviewSummary} />
        ) : (
        <div className="grid gap-10 md:grid-cols-2">
          <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-stone-200 text-stone-400 dark:from-stone-800 dark:to-stone-900">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={`${product.name} — ${categoryLabel(product.category)}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className={`scale-125 object-cover ${!product.in_stock ? "opacity-50 grayscale" : ""}`}
              />
            ) : (
              <span className="text-sm">Image à venir</span>
            )}
            {!product.in_stock && (
              <span className="absolute left-3 top-3 rounded-full bg-stone-900/90 px-3 py-1 text-xs font-medium text-white">
                Rupture de stock
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm text-stone-500">
              <Link href={`/categorie/${product.category}`} className="hover:underline">
                {categoryLabel(product.category)}
              </Link>
              {product.subcategory && (
                <>
                  {" "}
                  ·{" "}
                  <Link
                    href={`/categorie/${product.category}/${product.subcategory}`}
                    className="hover:underline"
                  >
                    {subcategoryLabel(product.subcategory)}
                  </Link>
                </>
              )}
            </p>
            <h1 className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-50">
              {product.name}
            </h1>
            <p className="text-lg font-semibold text-stone-900 dark:text-stone-50">
              {formatPrice(product.price_cents, product.currency)}
            </p>
            <p className="whitespace-pre-line text-stone-600 dark:text-stone-400">
              {product.description}
            </p>
            <AddToCartButton
              slug={product.slug}
              name={product.name}
              priceCents={product.price_cents}
              currency={product.currency}
              inStock={product.in_stock}
            />
          </div>
        </div>
        )}

        <section id="avis" className="mt-16 scroll-mt-6 border-t border-stone-200 pt-12 dark:border-stone-800">
          <h2 className="mb-4 text-lg font-serif font-semibold text-stone-900 dark:text-stone-50">
            Avis clients
            {reviewSummary && (
              <span className="ml-2 text-sm font-normal text-stone-500">
                {reviewSummary.average.toFixed(1).replace(".", ",")}/5 · {reviewSummary.count} avis
              </span>
            )}
          </h2>
          {reviews.length === 0 ? (
            <p className="mb-4 text-sm text-stone-600 dark:text-stone-400">
              Pas encore d&apos;avis sur ce produit.
            </p>
          ) : (
            <ul className="mb-6 flex flex-col gap-4">
              {reviews.map((review) => (
                <li
                  key={review.id}
                  className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900"
                >
                  <p className="text-amber-500" aria-label={`${review.rating} sur 5`}>
                    {"★".repeat(review.rating)}
                    <span className="text-stone-300 dark:text-stone-700">
                      {"★".repeat(5 - review.rating)}
                    </span>
                  </p>
                  <p className="mt-1 whitespace-pre-line text-stone-700 dark:text-stone-300">
                    {review.body}
                  </p>
                  <p className="mt-2 text-xs text-stone-500">
                    {review.display_name} · achat vérifié
                  </p>
                </li>
              ))}
            </ul>
          )}
          <ReviewForm slug={product.slug} />
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t border-stone-200 pt-12 dark:border-stone-800">
            <h2 className="mb-4 text-lg font-serif font-semibold text-stone-900 dark:text-stone-50">
              Vous aimerez peut-être aussi
            </h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
