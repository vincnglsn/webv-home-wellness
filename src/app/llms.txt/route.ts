import { GUIDES } from "@/lib/guides";
import { CATEGORY_INTROS, SUBCATEGORY_INTROS } from "@/lib/category-intros";
import { getCategoryTree, SITE_URL } from "@/lib/products";

// Présentation de la boutique pour les assistants IA (format llms.txt) : rayons, guides
// et pages pratiques, avec un lien vers chacune.
export const revalidate = 3600;

export async function GET() {
  const lines: string[] = [
    "# Maison Bien-Être",
    "",
    "> Boutique en ligne indépendante d'objets de décoration et de bien-être pour la maison (lumières d'ambiance, textiles, objets zen, art de la table, massage, soin, sommeil, posture). Livraison offerte en France, Belgique, Suisse et Luxembourg, retours sous 14 jours.",
    "",
  ];

  try {
    const tree = await getCategoryTree();
    for (const entry of tree) {
      lines.push(`## ${entry.label}`, "");
      if (CATEGORY_INTROS[entry.category]) lines.push(CATEGORY_INTROS[entry.category], "");
      lines.push(`- [${entry.label}](${SITE_URL}/categorie/${entry.category}) : ${entry.count} produits`);
      for (const sub of entry.subcategories) {
        const intro = SUBCATEGORY_INTROS[sub.subcategory];
        lines.push(
          `- [${sub.label}](${SITE_URL}/categorie/${entry.category}/${sub.subcategory})${intro ? ` : ${intro}` : ""}`,
        );
      }
      lines.push("");
    }
  } catch {
    // Base indisponible : on publie quand même les guides et les pages pratiques.
  }

  lines.push("## Guides", "");
  for (const guide of GUIDES) {
    lines.push(`- [${guide.title}](${SITE_URL}/guides/${guide.slug}) : ${guide.description}`);
  }

  lines.push(
    "",
    "## Pages pratiques",
    "",
    `- [Livraison](${SITE_URL}/livraison) : pays livrés, délais (7 à 20 jours ouvrés en moyenne), suivi`,
    `- [Livraison et retours](${SITE_URL}/retours) : retours sous 14 jours, remboursement`,
    `- [Questions fréquentes](${SITE_URL}/faq)`,
    `- [À propos](${SITE_URL}/a-propos)`,
    `- [Contact](${SITE_URL}/contact)`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
