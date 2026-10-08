import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { FAQS } from "@/lib/faq";
import { parseDescription } from "@/lib/product-sections";
import {
  categoryLabel,
  formatPrice,
  subcategoryLabel,
  type Product,
} from "@/lib/products";

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

export function ProductDetailV2({ product }: { product: Product }) {
  const { hook, benefits, usage } = parseDescription(product.description);
  const faqs = FAQS.filter((item) => PRODUCT_FAQ_QUESTIONS.includes(item.question));
  const price = formatPrice(product.price_cents, product.currency);

  return (
    <>
      <div className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-2 md:gap-12">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-stone-200 dark:from-stone-800 dark:to-stone-900">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={`${product.name} — ${categoryLabel(product.category)}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className={`object-cover ${!product.in_stock ? "opacity-50 grayscale" : ""}`}
            />
          ) : (
            <span className="flex h-full items-center justify-center text-sm text-stone-400">
              Image à venir
            </span>
          )}
          {!product.in_stock && (
            <span className="absolute left-3 top-3 rounded-full bg-stone-900/90 px-3 py-1 text-xs font-medium text-white">
              Rupture de stock
            </span>
          )}
        </div>

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
          <p className="text-2xl font-semibold text-stone-900 dark:text-stone-50">{price}</p>
          <p className="text-stone-600 dark:text-stone-400">{hook}</p>

          {benefits.length > 0 && (
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
