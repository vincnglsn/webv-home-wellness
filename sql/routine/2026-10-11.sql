-- Produits du 2026-10-11 (routine quotidienne) : 8 produits (1 par sous-categorie active, aucun ajout en massage-detente), marge nette calculee avec le cout total de livraison CJ.
-- tenture-macrame-feuille-cercle-bois-gris : 28,90 EUR, marge nette ~10,32 EUR (35,7 %), route CJPacket Ordinary E (7-15 j).
-- bol-chantant-cuivre-grave-maillet-8cm : 32,90 EUR, marge nette ~11,73 EUR (35,6 %), route CJPacket Ordinary E (7-15 j).
-- anneaux-serviette-corde-jute-noeud-lot-de-6 : 24,90 EUR, marge nette ~8,78 EUR (35,3 %), route CJPacket Ordinary E (7-15 j).
-- couronne-de-porte-citrouille-toile-orange-40cm : 33,90 EUR, marge nette ~11,87 EUR (35,0 %), route CJPacket Ordinary (4-10 j).
-- tapis-de-sapin-120cm-camion-vichy-rouge-merry-christmas : 31,90 EUR, marge nette ~11,22 EUR (35,2 %), route CJPacket Ordinary E (7-15 j).
-- machine-bruit-blanc-rechargeable-veilleuse-minuteur : 29,90 EUR, marge nette ~10,77 EUR (36,0 %), route CJPacket Liquid Line (7-11 j).
-- bloc-de-yoga-liege-motif-lotus-22cm : 36,90 EUR, marge nette ~13,11 EUR (35,5 %), route CJPacket Ordinary E (7-15 j).
-- serviette-turban-microfibre-cheveux-rose : 15,90 EUR, marge nette ~5,76 EUR (36,2 %), route CJPacket Ordinary E (7-15 j).
insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'tenture-macrame-feuille-cercle-bois-gris',
  'Tenture Macramé Feuille sur Cercle en Bois (gris, 30 x 85 cm)',
  E'Une tenture en macramé tissée à la main, avec une grande feuille suspendue dans un cercle en bois, pour apporter une touche bohème au mur.\n\nCe que vous obtenez :\n• 1 tenture murale en coton tissé à la main, coloris gris\n• Format 30 x 85 cm\n• Motif de feuille et cercle en bois clair\n• Longues franges et cordon de suspension\n\nÀ accrocher dans le salon, la chambre ou l''entrée pour réchauffer un mur nu.',
  2890,
  'https://cf.cjdropshipping.com/1614068084247.jpg',
  null,
  'decoration', 'murs-textiles',
  'https://cjdropshipping.com/product/1364127069843361792.html',
  '1364127069843361792', '1364127071256842240', 'CJJT101930602BY', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'bol-chantant-cuivre-grave-maillet-8cm',
  'Bol Chantant en Cuivre Gravé avec Maillet (8 cm)',
  E'Un petit bol chantant en cuivre fait main, aux gravures traditionnelles, que l''on fait résonner avec son maillet pour marquer un moment de calme.\n\nCe que vous obtenez :\n• 1 bol chantant en cuivre, fait main\n• Diamètre du bol : 8 cm\n• Gravures sur l''intérieur et l''extérieur du bol\n• 1 maillet en bois à embout de cuir\n\nÀ poser sur une étagère ou un autel, ou à utiliser pour accompagner méditation, yoga ou pause du soir.',
  3290,
  'https://cf.cjdropshipping.com/1624002282977.jpg',
  null,
  'decoration', 'objets-zen',
  'https://cjdropshipping.com/product/1405794674144317440.html',
  '1405794674144317440', '1405799288163930112', 'CJJT118036401AZ', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'anneaux-serviette-corde-jute-noeud-lot-de-6',
  'Anneaux de Serviette en Corde de Jute Tressée (lot de 6)',
  E'Des ronds de serviette en corde de jute naturelle, au nœud tressé, pour une table simple et chaleureuse.\n\nCe que vous obtenez :\n• 6 anneaux de serviette en corde de jute naturelle\n• Nœud tressé à la main, coloris écru\n• Style rustique, pour dîners comme repas de fête\n• Serviettes non incluses\n\nÀ glisser autour d''une serviette en lin ou en coton pour dresser une jolie table.',
  2490,
  'https://cf.cjdropshipping.com/quick/product/577ea991-8008-47c3-b39c-3ec903431460.jpg',
  '["https://cf.cjdropshipping.com/quick/product/577ea991-8008-47c3-b39c-3ec903431460.jpg","https://cf.cjdropshipping.com/quick/product/c829ea5e-bb52-4991-80b7-edfad36964a4.jpg"]'::jsonb,
  'decoration', 'art-de-la-table',
  'https://cjdropshipping.com/product/2601160758011608700.html',
  '2601160758011608700', '2610071217551634400', 'CJYD273218602BY', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'couronne-de-porte-citrouille-toile-orange-40cm',
  'Couronne de Porte Citrouille en Toile Orange (Halloween, 40 cm)',
  E'Une couronne de porte en forme de citrouille, en toile orange, avec un visage souriant en feutrine noire, pour accueillir les visiteurs d''Halloween.\n\nCe que vous obtenez :\n• 1 couronne en tissu orange en forme de citrouille\n• Diamètre d''environ 40 cm\n• Visage souriant noir et haut de citrouille vert\n• Tige en toile naturelle ornée de raphia\n\nÀ suspendre sur la porte d''entrée ou un mur pour décorer la maison à l''automne.',
  3390,
  'https://cf.cjdropshipping.com/7c4b4bb7-4365-4938-9c7f-9b7e08e3e18e.jpg',
  '["https://cf.cjdropshipping.com/7c4b4bb7-4365-4938-9c7f-9b7e08e3e18e.jpg","https://cf.cjdropshipping.com/6bf39079-5f11-4d76-a3e1-f2f9740e6cef.jpg"]'::jsonb,
  'decoration', 'halloween',
  'https://cjdropshipping.com/product/1439403445844054016.html',
  '1439403445844054016', '1439403445915357184', 'CJHD129198601AZ', 'CJPacket Ordinary'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'tapis-de-sapin-120cm-camion-vichy-rouge-merry-christmas',
  'Tapis de Sapin de Noël Camion à Carreaux Rouges (120 cm)',
  E'Un tapis de pied de sapin en tissu imitation lin, bordé de carreaux rouges et noirs, avec un camion brodé chargé de petits sapins.\n\nCe que vous obtenez :\n• 1 tapis de sapin en tissu imitation lin\n• Diamètre de 120 cm\n• Bordure à carreaux rouges et noirs\n• Motif de camion et inscription « Merry Christmas »\n\nÀ poser au pied du sapin pour cacher le support et accueillir les cadeaux.',
  3190,
  'https://cf.cjdropshipping.com/9f72ecc2-ae02-44b1-a04c-e0f42ea22d66.jpg',
  '["https://cf.cjdropshipping.com/9f72ecc2-ae02-44b1-a04c-e0f42ea22d66.jpg","https://cf.cjdropshipping.com/46c02c38-0415-4e57-8195-56b37320ca2d.jpg"]'::jsonb,
  'decoration', 'noel',
  'https://cjdropshipping.com/product/1430786337954467840.html',
  '1430786337954467840', '1430786337992216576', 'CJSD126458801AZ', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'machine-bruit-blanc-rechargeable-veilleuse-minuteur',
  'Machine à Bruit Blanc Rechargeable avec Veilleuse et Minuteur (USB)',
  E'Un petit boîtier à poser sur la table de chevet, qui diffuse des sons apaisants et une lumière douce à la soirée.\n\nCe que vous obtenez :\n• 1 boîtier à sons, format 8 x 8 x 3,3 cm\n• Plusieurs sons : bruit blanc, vagues, chants d''oiseaux, cascade, grillons, berceuse\n• Minuteur d''arrêt automatique : 15, 30 ou 60 minutes\n• Batterie au lithium rechargeable en USB, câble inclus\n\nÀ glisser dans un sac pour le voyage ou à garder près du lit pour une ambiance sonore calme.',
  2990,
  'https://cf.cjdropshipping.com/0678aa71-9109-4b82-8bd2-e19afd682951.png',
  '["https://cf.cjdropshipping.com/0678aa71-9109-4b82-8bd2-e19afd682951.png","https://cf.cjdropshipping.com/d084390c-35bb-4973-be78-e17e82127370.jpg"]'::jsonb,
  'bien-etre', 'sommeil-repos',
  'https://cjdropshipping.com/product/1435478040732897280.html',
  '1435478040732897280', '1435478040804200448', 'CJJT127959001AZ', 'CJPacket Liquid Line'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'bloc-de-yoga-liege-motif-lotus-22cm',
  'Bloc de Yoga en Liège avec Motif de Lotus (22,3 x 14,5 x 7,2 cm)',
  E'Un bloc de yoga en liège naturel, à l''empreinte de lotus gravée, pour s''appuyer et s''installer plus facilement dans les postures.\n\nCe que vous obtenez :\n• 1 bloc de yoga en liège\n• Dimensions : 22,3 x 14,5 x 7,2 cm\n• Poids d''environ 700 g\n• Motif de lotus gravé sur une face\n\nÀ glisser sous la main, le dos ou les hanches pendant une séance de yoga ou de pilates.',
  3690,
  'https://cf.cjdropshipping.com/5dc65079-3183-43f6-b7c9-dd748a98e9e4.jpg',
  null,
  'bien-etre', 'sport-posture',
  'https://cjdropshipping.com/product/1679062139069272064.html',
  '1679062139069272064', '1679062139094437888', 'CJYD179882803CX', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'serviette-turban-microfibre-cheveux-rose',
  'Serviette Turban en Microfibre pour Cheveux (rose, 25 x 65 cm)',
  E'Une serviette turban en microfibre, avec bouton de fermeture, pour envelopper les cheveux après la douche.\n\nCe que vous obtenez :\n• 1 serviette turban en microfibre, coloris rose\n• Format d''environ 25 x 65 cm\n• Fermeture par bouton, qui la maintient en place\n• Convient à tous les types et longueurs de cheveux\n\nÀ enfiler après la douche, avant le maquillage ou au retour de la salle de sport.',
  1590,
  'https://cf.cjdropshipping.com/203103/223316272630.png',
  null,
  'bien-etre', 'soin-rituel',
  'https://cjdropshipping.com/product/D2CC8C8A-712C-4B3F-BAA7-D097950403FF.html',
  'D2CC8C8A-712C-4B3F-BAA7-D097950403FF', 'D3C8C981-AAE5-4258-93F6-A6EE0EC523C3', 'CJJJJFMJ00078-Pink', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;
