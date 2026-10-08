import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductGallery } from "@/components/ProductGallery";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { deliveryWindow, formatShortDate, mayMissHalloween } from "@/lib/delivery";
import { FAQS } from "@/lib/faq";
import { parseDescription } from "@/lib/product-sections";
import {
  categoryLabel,
  formatPrice,
  subcategoryLabel,
  type Product,
} from "@/lib/products";
import type { ReviewSummary } from "@/lib/reviews";

// Questions de la page FAQ qui concernent directement un achat.
const PRODUCT_FAQ_QUESTIONS = [
  "Quels sont les délais de livraison ?",
  "La livraison est-elle payante ?",
  "Puis-je retourner un article ?",
  "Quand serai-je remboursé ?",
];

const TRUST = [
  { icon: "🚚", title: "Livraison offerte", text: "France, Belgique, Suisse, Luxembourg" },
  { icon: "↩️", title: "Retours sous 14 jours", text: "Droit de rétractation" },
  { icon: "🔒", title: "Paiement sécurisé", text: "Carte bancaire via Stripe" },
  { icon: "📦", title: "Suivi de colis", text: "Numéro communiqué à l'expédition" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-stone-900 px-4 py-2 text-center text-xs text-stone-50 dark:bg-stone-100 dark:text-stone-900">
      Livraison offerte · Retours sous 14 jours
    </div>
  );
}

function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="group border-b border-stone-200 py-4 dark:border-stone-800"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-stone-900 dark:text-stone-50">
        {title}
        <span className="text-stone-400 transition group-open:rotate-45">+</span>
      </summary>
      <div className="mt-3 text-sm text-stone-600 dark:text-stone-400">{children}</div>
    </details>
  );
}

function Stars({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <span aria-hidden="true" className="text-amber-500">
      {"★".repeat(full)}
      <span className="text-stone-300 dark:text-stone-700">{"★".repeat(5 - full)}</span>
    </span>
  );
}

export function ProductDetailV2({
  product,
  images,
  reviewSummary,
}: {
  product: Product;
  images: string[];
  reviewSummary: ReviewSummary | null;
}) {
  const { hook, benefits, usage } = parseDescription(product.description);
  const faqs = FAQS.filter((item) => PRODUCT_FAQ_QUESTIONS.includes(item.question));
  const price = formatPrice(product.price_cents, product.currency);
  const delivery = deliveryWindow();
  const halloweenWarning =
    product.subcategory === "halloween" && mayMissHalloween(delivery.end);

  return (
    <>
      <div className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-12">
        <ProductGallery
          images={images}
          alt={`${product.name} — ${categoryLabel(product.category)}`}
          inStock={product.in_stock}
        />

        <div className="flex flex-col gap-5">
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
          <h1 className="text-3xl font-serif font-semibold leading-tight text-stone-900 dark:text-stone-50">
            {product.name}
          </h1>

          <a href="#avis" className="flex items-center gap-2 text-sm text-stone-600 hover:underline dark:text-stone-400">
            {reviewSummary ? (
              <>
                <Stars value={reviewSummary.average} />
                <span>
                  {reviewSummary.average.toFixed(1).replace(".", ",")}/5 · {reviewSummary.count} avis
                </span>
              </>
            ) : (
              <span>Pas encore d&apos;avis · Donner mon avis</span>
            )}
          </a>

          <p className="text-2xl font-semibold text-stone-900 dark:text-stone-50">{price}</p>
          <p className="text-stone-600 dark:text-stone-400">{hook}</p>

          {benefits.length > 0 && (
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Ce que vous obtenez
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 rounded-xl border border-stone-200 bg-white p-3 text-sm text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
                  >
                    <span className="mt-0.5 text-amber-600" aria-hidden="true">
                      ✓
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.in_stock && (
            <div className="rounded-xl bg-stone-100 p-3 text-sm text-stone-700 dark:bg-stone-900 dark:text-stone-300">
              <p>
                <strong>Livraison estimée</strong> entre le {formatShortDate(delivery.start)} et le{" "}
                {formatShortDate(delivery.end)}, offerte.
              </p>
              {halloweenWarning && (
                <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
                  Pour Halloween : selon le délai, votre colis peut arriver après le 31 octobre.
                </p>
              )}
              <p className="mt-1 text-xs text-stone-500">
                Délai moyen de 7 à 20 jours ouvrés, donné à titre indicatif.
              </p>
            </div>
          )}

          <div id="achat">
            <AddToCartButton
              slug={product.slug}
              name={product.name}
              priceCents={product.price_cents}
              currency={product.currency}
              inStock={product.in_stock}
            />
          </div>

          <ul className="grid grid-cols-2 gap-3 pt-2">
            {TRUST.map((item) => (
              <li key={item.title} className="flex items-start gap-2 text-xs">
                <span aria-hidden="true" className="text-base">
                  {item.icon}
                </span>
                <span>
                  <strong className="block text-stone-900 dark:text-stone-50">{item.title}</strong>
                  <span className="text-stone-500">{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 w-full max-w-2xl border-t border-stone-200 dark:border-stone-800">
        {usage && (
          <Accordion title="Utilisation" defaultOpen>
            <p>{usage}</p>
          </Accordion>
        )}
        <Accordion title="Livraison et retours">
          <p>
            Livraison offerte en France, en Belgique, en Suisse et au Luxembourg. Délai moyen de 7 à
            20 jours ouvrés (moyenne, pas une garantie). Rétractation possible pendant 14 jours à
            compter de la réception.
          </p>
          <p className="mt-2">
            <Link href="/livraison" className="underline">
              Détails de la livraison
            </Link>{" "}
            ·{" "}
            <Link href="/retours" className="underline">
              Livraison &amp; retours
            </Link>
          </p>
        </Accordion>
        <Accordion title="Questions fréquentes">
          <div className="flex flex-col gap-3">
            {faqs.map((item) => (
              <div key={item.question}>
                <p className="font-medium text-stone-800 dark:text-stone-200">{item.question}</p>
                <p>{item.answer}</p>
              </div>
            ))}
            <p>
              <Link href="/faq" className="underline">
                Toutes les questions
              </Link>
            </p>
          </div>
        </Accordion>
      </div>

      <StickyBuyBar
        slug={product.slug}
        name={product.name}
        priceCents={product.price_cents}
        currency={product.currency}
        inStock={product.in_stock}
        priceLabel={price}
      />
    </>
  );
}
