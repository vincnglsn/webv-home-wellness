-- Galerie de photos : tableau JSON d'URL (colonne facultative). Quand elle est vide,
-- la fiche produit n'affiche que image_url. La premiere photo est celle de image_url.
alter table products add column if not exists images jsonb;
