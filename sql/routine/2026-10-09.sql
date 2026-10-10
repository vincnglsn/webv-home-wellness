-- Produits du 2026-10-09 (routine quotidienne) : 9 produits (1 par sous-categorie), marge nette calculee avec le cout total de livraison CJ.
-- guirlande-murale-pompons-coton-arc-en-ciel : 23,90 EUR, marge nette ~8,82 EUR (36,9 %), route CJPacket Ordinary E (7-15 j).
-- guirlande-halloween-fantomes-feutre-perles-bois : 19,90 EUR, marge nette ~7,38 EUR (37,1 %), route CJPacket Ordinary (4-10 j).
-- lot-24-decorations-bois-noel-gnomes-bleus : 19,90 EUR, marge nette ~7,25 EUR (36,4 %), route CJPacket Ordinary E (7-15 j).
-- set-de-table-rond-mandala-pompons-noirs : 15,90 EUR, marge nette ~5,86 EUR (36,8 %), route CJPacket Ordinary E (7-15 j).
-- boule-de-massage-eva-noire : 16,90 EUR, marge nette ~6,18 EUR (36,5 %), route CJPacket Ordinary E (7-15 j).
-- oreiller-de-bain-4d-maille-respirante-blanc : 23,90 EUR, marge nette ~8,39 EUR (35,1 %), route CJPacket Ordinary E (7-15 j).
-- corde-a-sauter-grise-boules-pvc : 18,90 EUR, marge nette ~6,68 EUR (35,3 %), route CJPacket Ordinary E (7-15 j).
-- bol-encens-palissandre-4-trous : 22,90 EUR, marge nette ~8,36 EUR (36,5 %), route CJPacket Ordinary E (7-15 j).
-- bouillotte-peluche-nuage-sourire : 19,90 EUR, marge nette ~7,09 EUR (35,6 %), route CJPacket Ordinary E (7-15 j).
insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'guirlande-murale-pompons-coton-arc-en-ciel',
  'Guirlande Murale à Pompons Arc-en-Ciel (coton tissé)',
  E'Une guirlande de pompons colorés à suspendre au mur pour apporter une touche bohème et joyeuse à la pièce.\n\nCe que vous obtenez :\n• 1 guirlande murale à pompons en fil de coton\n• Tissage artisanal à la main\n• Perles en bois sur une cordelette à accrocher\n• Coloris arc-en-ciel multicolore\n\nÀ accrocher au-dessus d''un lit, d''un bureau ou dans un coin lecture.',
  2390,
  'https://cf.cjdropshipping.com/quick/product/9a047283-a5af-40a4-ae1e-2c3925d42a2e.jpg',
  null,
  'decoration', 'murs-textiles',
  'https://cjdropshipping.com/product/1688796335547359232.html',
  '1688796335547359232', '1688796335698354176', 'CJYD181737701AZ', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'guirlande-halloween-fantomes-feutre-perles-bois',
  'Guirlande Halloween Fantômes en Feutrine et Perles en Bois',
  E'Une guirlande de petits fantômes en feutrine enfilés sur des perles en bois, pour une ambiance d''Halloween douce et facile à installer.\n\nCe que vous obtenez :\n• 1 guirlande de fantômes en tissu (feutrine)\n• Fantômes blancs aux yeux noirs, en deux tailles\n• Perles en bois naturel entre chaque fantôme\n• Style nordique, version fantômes (grande taille)\n\nÀ suspendre sur une cheminée, une étagère, un miroir ou le long d''une porte.',
  1990,
  'https://cf.cjdropshipping.com/quick/product/1c057cb7-1f7f-4d98-82ef-33bf28f147c0.jpg',
  null,
  'decoration', 'halloween',
  'https://cjdropshipping.com/product/2408250902071611200.html',
  '2408250902071611200', '2408250902071611500', 'CJJT211986801AZ', 'CJPacket Ordinary'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'lot-24-decorations-bois-noel-gnomes-bleus',
  'Lot de 24 Décorations en Bois à Suspendre, Gnomes de Noël (bleu)',
  E'Un lot de petites décorations en bois imprimées de gnomes de Noël aux bonnets bleus et blancs, à accrocher au sapin ou ailleurs dans la maison.\n\nCe que vous obtenez :\n• 24 pièces décoratives en bois à suspendre\n• Motifs de gnomes de Noël aux tons bleus et blancs\n• Pièces percées, prêtes à accrocher\n• Idéales pour le sapin, une couronne ou un cadeau\n\nÀ répartir sur le sapin, une guirlande ou une fenêtre pour habiller la maison pour les fêtes.',
  1990,
  'https://cf.cjdropshipping.com/quick/product/cafe0209-2fd7-4ca0-9975-cdffe04da450.jpg',
  null,
  'decoration', 'noel',
  'https://cjdropshipping.com/product/1727623257509081088.html',
  '1727623257509081088', '1727623257764933632', 'CJYD190459203CX', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'set-de-table-rond-mandala-pompons-noirs',
  'Set de Table Rond Motif Mandala à Pompons Noirs',
  E'Un set de table rond à motif mandala, bordé de petits pompons noirs, pour une table d''inspiration bohème.\n\nCe que vous obtenez :\n• 1 set de table rond en tissu\n• Motif mandala imprimé en noir sur fond naturel\n• Bordure ornée de pompons noirs\n• Pièce vendue à l''unité\n\nÀ poser sous une assiette ou un plat pour habiller la table au quotidien comme pour recevoir.',
  1590,
  'https://cf.cjdropshipping.com/7242f46e-b25c-4158-8496-acd0306e10e7.jpg',
  null,
  'decoration', 'art-de-la-table',
  'https://cjdropshipping.com/product/1556541759596015616.html',
  '1556541759596015616', '1556541759700873216', 'CJJT154087012LO', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'boule-de-massage-eva-noire',
  'Boule de Massage en EVA (noire, 6,4 cm)',
  E'Une boule de massage compacte à la surface texturée, facile à glisser dans un sac pour vos moments de détente.\n\nCe que vous obtenez :\n• 1 boule de massage en mousse EVA, coloris noir\n• Diamètre de 6,4 cm\n• Surface texturée\n• Poids d''environ 145 g\n\nÀ utiliser à la maison, au bureau ou en salle de sport, contre un mur ou posée au sol.',
  1690,
  'https://cf.cjdropshipping.com/1618308488661.jpg',
  null,
  'bien-etre', 'massage-detente',
  'https://cjdropshipping.com/product/1381914923667427328.html',
  '1381914923667427328', '1381914925257068544', 'CJJT107847104DW', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'oreiller-de-bain-4d-maille-respirante-blanc',
  'Oreiller de Bain 4D en Maille Respirante (blanc)',
  E'Un oreiller de baignoire en maille 4D souple et respirante, pour transformer le bain en vrai moment de pause.\n\nCe que vous obtenez :\n• 1 oreiller de bain en maille 4D, coloris blanc\n• Matière souple et respirante\n• Lavable en machine\n• Forme enveloppante pour la nuque et le dos, avec ventouses visibles sur la photo\n\nÀ fixer dans la baignoire pour un bain détente avec bougies, sels ou musique.',
  2390,
  'https://cf.cjdropshipping.com/quick/product/5b516f2c-ca1b-41af-867f-49709b007efb.jpg',
  '["https://cf.cjdropshipping.com/quick/product/5b516f2c-ca1b-41af-867f-49709b007efb.jpg","https://cf.cjdropshipping.com/quick/product/eae0582d-3967-4141-a038-1636b93b7348.jpg"]'::jsonb,
  'bien-etre', 'soin-rituel',
  'https://cjdropshipping.com/product/2512040753031610600.html',
  '2512040753031610600', '2512040753031610800', 'CJYD263150101AZ', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'corde-a-sauter-grise-boules-pvc',
  'Corde à Sauter en PVC avec Poignées (grise)',
  E'Une corde à sauter simple et légère pour s''entraîner à la maison, au parc ou en salle.\n\nCe que vous obtenez :\n• 1 corde à sauter en PVC, coloris gris\n• 2 poignées striées\n• 2 boules avec cordon court, visibles sur la photo\n• Poids d''environ 145 g, facile à ranger\n\nÀ glisser dans un sac pour votre routine de cardio ou d''échauffement.',
  1890,
  'https://cf.cjdropshipping.com/1622363478359.jpg',
  null,
  'bien-etre', 'sport-posture',
  'https://cjdropshipping.com/product/1398920310576779264.html',
  '1398920310576779264', '1398920311981871104', 'CJSD115145602BY', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'bol-encens-palissandre-4-trous',
  'Bol à Encens en Palissandre avec Insert en Laiton (4 trous)',
  E'Un petit bol en palissandre à la teinte chaude, avec un insert à quatre trous pour poser des bâtonnets d''encens.\n\nCe que vous obtenez :\n• 1 bol en palissandre, finition semi-artisanale\n• Diamètre de 5,9 cm, épaisseur de 2,3 cm\n• Insert central à 4 trous (environ 1,2 / 1,5 / 2 / 3 mm)\n• Coloris brun clair\n\nÀ poser sur une table basse, un bureau ou un coin méditation ; à protéger du soleil direct pour éviter que le bois ne se fende.',
  2290,
  'https://cf.cjdropshipping.com/quick/product/3a034a84-4e18-4f78-a02b-6a9c2cfedc78.jpg',
  null,
  'decoration', 'objets-zen',
  'https://cjdropshipping.com/product/1667133587877007360.html',
  '1667133587877007360', '1667133587952504832', 'CJYD177497902BY', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'bouillotte-peluche-nuage-sourire',
  'Bouillotte en Peluche Nuage Souriant (14,5 x 22 cm)',
  E'Une bouillotte à eau chaude dans une housse en peluche douce, ornée d''un petit visage souriant brodé.\n\nCe que vous obtenez :\n• 1 bouillotte à remplir d''eau chaude\n• Housse en peluche moelleuse, coloris crème\n• Visage souriant brodé\n• Format de 14,5 x 22 cm\n\nÀ glisser dans le lit ou sur le canapé pour une soirée cocooning.',
  1990,
  'https://cf.cjdropshipping.com/01a13c0b-601a-442a-9a9f-f2fc6adf1f19.jpg',
  null,
  'bien-etre', 'sommeil-repos',
  'https://cjdropshipping.com/product/1621682530485284864.html',
  '1621682530485284864', '1621682530552393728', 'CJJT167591601AZ', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;
