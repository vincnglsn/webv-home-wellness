// Les descriptions produit suivent le format : accroche, ligne vide,
// « Ce que vous obtenez : » + puces « • », ligne vide, phrase d'usage.
// On les découpe pour le nouveau gabarit de page produit, sans réécrire
// aucune fiche. Si le format n'est pas reconnu, tout le texte reste dans l'accroche.
export type ProductSections = {
  hook: string;
  benefits: string[];
  usage: string | null;
};

export function parseDescription(description: string): ProductSections {
  const blocks = description
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const hook = blocks[0] ?? "";
  let benefits: string[] = [];
  let usage: string | null = null;

  for (const block of blocks.slice(1)) {
    const lines = block.split("\n").map((line) => line.trim());
    const bullets = lines.filter((line) => line.startsWith("•"));
    if (bullets.length > 0) {
      benefits = bullets.map((line) => line.replace(/^•\s*/, ""));
    } else if (!usage) {
      usage = block;
    }
  }

  return { hook, benefits, usage };
}

// Photos de la galerie : la colonne `images` de la base (choisies à la main parmi celles
// de CJ, variante vendue uniquement) ou, à défaut, la photo principale du produit.
export function galleryImages(images: string[] | null | undefined, mainImage: string | null): string[] {
  if (Array.isArray(images) && images.length > 0) return images;
  return mainImage ? [mainImage] : [];
}
