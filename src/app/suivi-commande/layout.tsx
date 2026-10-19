import type { Metadata } from "next";

// Page utile aux clients mais sans intérêt dans les résultats de recherche :
// exclue de l'index (et du sitemap), liens toujours suivis.
export const metadata: Metadata = {
  title: "Suivi de commande — Maison Bien-Être",
  description: "Suivez votre commande Maison Bien-Être avec votre numéro de commande et votre email.",
  alternates: { canonical: "/suivi-commande" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
