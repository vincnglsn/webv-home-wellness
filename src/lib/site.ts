// Identité du site : adresse publique et email de contact, définis en un seul endroit.
// Pour changer de domaine, il suffit de régler NEXT_PUBLIC_SITE_URL et
// NEXT_PUBLIC_CONTACT_EMAIL dans Vercel (puis de redéployer) : tout le site, le sitemap,
// le flux produits et les pages légales suivent.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://home-wellness.whatelsebyvinc.com";

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@whatelsebyvinc.com";
