"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  alt,
  inStock,
}: {
  images: string[];
  alt: string;
  inStock: boolean;
}) {
  const [index, setIndex] = useState(0);
  const current = images[index];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-stone-200 dark:from-stone-800 dark:to-stone-900">
        {current ? (
          <Image
            key={current}
            src={current}
            alt={`${alt} (photo ${index + 1} sur ${images.length})`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
            className={`object-cover ${!inStock ? "opacity-50 grayscale" : ""}`}
          />
        ) : (
          <span className="flex h-full items-center justify-center text-sm text-stone-400">
            Image à venir
          </span>
        )}
        {!inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-stone-900/90 px-3 py-1 text-xs font-medium text-white">
            Rupture de stock
          </span>
        )}
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Photo précédente"
              onClick={() => setIndex((index - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg text-stone-900 shadow hover:bg-white"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Photo suivante"
              onClick={() => setIndex((index + 1) % images.length)}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg text-stone-900 shadow hover:bg-white"
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <ul className="grid grid-cols-4 gap-3" aria-label="Photos du produit">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Afficher la photo ${i + 1}`}
                aria-current={i === index}
                className={`relative block aspect-square w-full overflow-hidden rounded-xl border-2 transition ${
                  i === index
                    ? "border-stone-900 dark:border-stone-50"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
