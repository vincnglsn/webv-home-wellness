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

// Slugs qui utilisent le nouveau gabarit de page produit. Phase de test : on
// l'étend au catalogue entier une fois le rendu validé.
export const NEW_LAYOUT_SLUGS = new Set<string>(["lanterne-halloween-retro-citrouille"]);

export function usesNewLayout(slug: string): boolean {
  return NEW_LAYOUT_SLUGS.has(slug);
}

// Galeries de photos choisies à la main parmi celles de CJ (uniquement la variante
// vendue). La première photo est celle de la fiche ; la dernière porte les cotes.
// Pour le reste du catalogue, une colonne en base remplacera cette liste.
const GALLERY_IMAGES: Record<string, string[]> = {
  "lanterne-halloween-retro-citrouille": [
    "https://cf.cjdropshipping.com/quick/product/0d345fdc-9bea-4ded-8b16-3ca1e9eaeda8.jpg",
    "https://cf.cjdropshipping.com/886284c6-c9df-41f7-94f1-7d70f4512802.jpg",
    "https://cf.cjdropshipping.com/fd64f0e7-c798-47d0-aca5-eeb1dd0a2343.jpg",
    "https://cf.cjdropshipping.com/129186d4-97b2-424a-b712-f145d7d1a568.jpg",
  ],
};

export function galleryImages(slug: string, mainImage: string | null): string[] {
  const curated = GALLERY_IMAGES[slug];
  if (curated && curated.length > 0) return curated;
  return mainImage ? [mainImage] : [];
}
