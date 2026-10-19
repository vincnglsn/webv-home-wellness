import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { getProductsForSitemap, SITE_URL } from "@/lib/products";

// Régénéré toutes les heures : les produits ajoutés chaque jour y figurent sans redéploiement.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages utiles aux clients mais sans intérêt pour la recherche (panier, suivi de
  // commande) : volontairement absentes, et marquées noindex.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/a-propos`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/mentions-legales`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/cgv`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/confidentialite`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/retours`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/livraison`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/faq`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/guides`, changeFrequency: "monthly", priority: 0.5 },
    ...GUIDES.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      lastModified: new Date(guide.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getProductsForSitemap();
    productRoutes = products.map((p) => ({
      url: `${SITE_URL}/produits/${p.slug}`,
      lastModified: new Date(p.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    // Date d'une catégorie = celle du produit le plus récent qu'elle contient.
    const latest = new Map<string, Date>();
    const bump = (path: string, date: Date) => {
      const current = latest.get(path);
      if (!current || date > current) latest.set(path, date);
    };
    for (const p of products) {
      const date = new Date(p.created_at);
      bump(`/categorie/${p.category}`, date);
      if (p.subcategory) bump(`/categorie/${p.category}/${p.subcategory}`, date);
    }
    categoryRoutes = [...latest.entries()].map(([path, date]) => ({
      url: `${SITE_URL}${path}`,
      lastModified: date,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // Base de données indisponible au moment de la génération : on se
    // contente des routes statiques plutôt que de faire échouer le build.
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
