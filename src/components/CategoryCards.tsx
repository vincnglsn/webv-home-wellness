import Link from "next/link";
import Image from "next/image";
import type { CategoryTree, Product } from "@/lib/products";

export function CategoryCards({
  tree,
  products,
}: {
  tree: CategoryTree[];
  products: Product[];
}) {
  const imageByCategory = new Map<string, string | null>();
  for (const product of products) {
    if (!imageByCategory.has(product.category)) {
      imageByCategory.set(product.category, product.image_url);
    }
  }

  const imageBySubcategory = new Map<string, string | null>();
  for (const product of products) {
    const key = `${product.category}/${product.subcategory}`;
    if (
      product.subcategory &&
      product.image_url &&
      !imageBySubcategory.has(key)
    ) {
      imageBySubcategory.set(key, product.image_url);
    }
  }
  const subcategories = tree.flatMap((entry) =>
    entry.subcategories.map((sub) => ({ ...sub, category: entry.category })),
  );

  return (
    <div className="mb-14 flex flex-col gap-12">
      <section>
        <div className="mb-5">
          <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">
            Choisissez votre univers
          </h2>
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Décoration pour la maison ou bien-être au quotidien : deux façons
            d&apos;adoucir votre intérieur.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {tree.map((entry) => {
            const image = imageByCategory.get(entry.category);
            return (
              <Link
                key={entry.category}
                href={`/categorie/${entry.category}`}
                className="group relative flex h-48 items-end overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 dark:border-stone-800 dark:bg-stone-800"
              >
                {image && (
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="scale-110 object-cover transition duration-300 group-hover:scale-125"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="relative z-10 flex w-full items-center justify-between px-6 py-5">
                  <div>
                    <p className="font-serif text-xl font-semibold text-white">
                      {entry.label}
                    </p>
                    <p className="text-sm text-white/80">
                      {entry.count} produit{entry.count > 1 ? "s" : ""}
                    </p>
                  </div>
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-stone-900 transition group-hover:bg-white">
                    Découvrir →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      {subcategories.length > 0 && (
        <section>
          <div className="mb-5">
            <h2 className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">
              Explorer par thème
            </h2>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Halloween, Noël, sommeil, massage… accédez directement à ce que
              vous cherchez.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {subcategories.map((sub) => {
              const image = imageBySubcategory.get(
                `${sub.category}/${sub.subcategory}`,
              );
              return (
                <Link
                  key={`${sub.category}/${sub.subcategory}`}
                  href={`/categorie/${sub.category}/${sub.subcategory}`}
                  className="group relative flex h-32 items-end overflow-hidden rounded-xl border border-stone-200 bg-stone-200 dark:border-stone-800 dark:bg-stone-800"
                >
                  {image && (
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="scale-110 object-cover transition duration-300 group-hover:scale-125"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="relative z-10 px-4 py-3">
                    <p className="font-serif text-base font-semibold text-white">
                      {sub.label}
                    </p>
                    <p className="text-xs text-white/80">
                      {sub.count} produit{sub.count > 1 ? "s" : ""}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
