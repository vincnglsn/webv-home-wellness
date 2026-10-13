-- 2026-10-13 : nouvelles collections.
-- Libellés (code, src/lib/products.ts) : massage-detente -> « Relaxation & Anti-stress »,
-- sommeil-repos -> « Sommeil & Nuit Douce » (slugs et adresses inchangés), nouvelle sous-catégorie
-- decoration / ambiance-cocon « Ambiance & Cocon » (diffuseurs, éclairages d'ambiance, humidificateurs).
-- À exécuter APRÈS la mise en ligne du libellé ambiance-cocon.
update products set category = 'decoration', subcategory = 'ambiance-cocon'
where slug in ('diffuseur-flamme-volcan', 'humidificateur-vase-decoratif', 'lampe-sel-himalaya-pyramide-usb',
               'veilleuse-lune-3d', 'lampe-rose-veilleuse')
  and subcategory in ('soin-rituel', 'objets-zen', 'sommeil-repos');
-- Les bouillottes rejoignent Relaxation & Anti-stress.
update products set subcategory = 'massage-detente'
where slug = 'bouillotte-peluche-nuage-sourire' and subcategory = 'sommeil-repos';
