"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Fait défiler en fondu enchaîné les photos d'une catégorie dans un encart. Le parent doit
// être en `position: relative` : les images le remplissent. La photo suivante est déjà
// chargée (invisible) avant de s'afficher, et l'animation s'arrête si le visiteur a
// demandé de réduire les animations.
export function RotatingImage({
  images,
  sizes,
  className,
  intervalMs = 4500,
  offset = 0,
}: {
  images: string[];
  sizes: string;
  className: string;
  intervalMs?: number;
  offset?: number;
}) {
  const [state, setState] = useState<{ cur: number; prev: number | null }>({ cur: 0, prev: null });
  const count = images.length;

  useEffect(() => {
    if (count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Décalage par encart pour qu'ils ne changent pas tous en même temps.
    const delay = intervalMs + (offset % 6) * 450;
    const timer = setInterval(() => {
      if (document.hidden) return;
      setState((s) => ({ cur: (s.cur + 1) % count, prev: s.cur }));
    }, delay);
    return () => clearInterval(timer);
  }, [count, intervalMs, offset]);

  if (count === 0) return null;

  const next = (state.cur + 1) % count;
  const layers: { index: number; role: "prev" | "cur" | "next" }[] = [];
  if (state.prev !== null && state.prev !== state.cur) layers.push({ index: state.prev, role: "prev" });
  layers.push({ index: state.cur, role: "cur" });
  if (count > 2 && next !== state.prev) layers.push({ index: next, role: "next" });

  return (
    <>
      {layers.map(({ index, role }) => (
        <Image
          key={images[index]}
          src={images[index]}
          alt=""
          fill
          sizes={sizes}
          className={`${className} ${role === "next" ? "opacity-0" : ""} ${
            role === "cur" && state.prev !== null ? "tile-fade" : ""
          }`}
        />
      ))}
    </>
  );
}
