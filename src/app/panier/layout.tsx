import type { Metadata } from "next";

// Page utile aux clients mais sans intérêt dans les résultats de recherche :
// exclue de l'index (et du sitemap), liens toujours suivis.
export const metadata: Metadata = {
  title: "Votre panier — Maison Bien-Être",
  description: "Votre panier sur Maison Bien-Être.",
  alternates: { canonical: "/panier" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
