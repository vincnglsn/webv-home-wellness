-- Produits du 2026-10-14 pour compléter les collections (Sommeil & Nuit Douce, Relaxation & Anti-stress, Ambiance & Cocon).
-- oreiller-papillon-memoire-de-forme-blanc-50x30 : 3,20+13,99 USD ; net 11,89 EUR (36,1 %) ; 7-15 j
-- tapis-acupression-lotus-bleu-coussin-housse : 6,27+15,30 USD ; net 14,67 EUR (35,9 %) ; 7-15 j
-- diffuseur-huiles-essentielles-ultrasonique-led-bois-clair : 5,15+8,86 USD ; net 9,71 EUR (36,1 %) ; 7-15 j
insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values (
  'oreiller-papillon-memoire-de-forme-blanc-50x30',
  'Oreiller Papillon à Mémoire de Forme (blanc, 50 x 30 cm)',
  E'Un oreiller en mousse à mémoire de forme au profil papillon, pensé pour épouser la forme de la tête et de la nuque.

Ce que vous obtenez :
• 1 oreiller en mousse à rebond lent, en forme de papillon
• Dimensions : 50 x 30 cm, coloris blanc
• Garnissage en coton mémoire, housse en fibres de polyester
• Fabrication manuelle : un écart de 2 à 3 cm est possible

À glisser dans une taie d''oreiller pour le lit, ou à poser sur le canapé pour une sieste.',
  3290,
  'https://cf.cjdropshipping.com/20190920/448184377200.jpg',
  null,
  'bien-etre',
  'sommeil-repos',
  'https://cjdropshipping.com/product/9DF9D888-C5A9-4339-9AAD-1DE223D295FC.html',
  '9DF9D888-C5A9-4339-9AAD-1DE223D295FC',
  '26F7783F-E8AB-4806-9667-1E7326BF6EE1',
  'CJJJJFZT00204-White-50x30 cm',
  'CJPacket Ordinary E'
)
on conflict (slug) do nothing;
insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values (
  'tapis-acupression-lotus-bleu-coussin-housse',
  'Tapis d''Acupression Lotus avec Coussin et Housse (bleu, 68 x 42 cm)',
  E'Un tapis à picots en forme de fleurs de lotus, livré avec son coussin et sa housse de transport, pour des pauses détente à la maison.

Ce que vous obtenez :
• 1 tapis à picots de 68 x 42 cm, tissu bleu
• 1 coussin assorti de 37 x 15 x 10 cm
• 1 housse de transport (visible sur la photo)
• Picots en forme de fleurs de lotus

À poser au sol ou sur un lit pour des séances courtes. Placez un tissu fin entre la peau et les picots si c''est inconfortable ; cet article n''est pas prévu pour dormir dessus.',
  4090,
  'https://cf.cjdropshipping.com/1620885440925.jpg',
  null,
  'bien-etre',
  'massage-detente',
  'https://cjdropshipping.com/product/1392722039080620032.html',
  '1392722039080620032',
  '1432996802210172928',
  'CJJT112683104DW',
  'CJPacket Ordinary E'
)
on conflict (slug) do nothing;
insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values (
  'diffuseur-huiles-essentielles-ultrasonique-led-bois-clair',
  'Diffuseur d''Huiles Essentielles Ultrasonique LED (bois clair, USB)',
  E'Un diffuseur à brume ultrasonique en finition imitation bois clair, pour parfumer une pièce avec douceur.

Ce que vous obtenez :
• 1 diffuseur ultrasonique, finition imitation bois clair
• Réservoir d''environ 300 ml
• Éclairage LED à 7 couleurs, avec commande tactile
• Alimentation par USB (5 V)

Remplissez le réservoir d''eau, ajoutez quelques gouttes d''huile essentielle (non incluse) et posez-le sur un meuble stable, à l''écart des textiles. Nettoyez-le régulièrement.',
  2690,
  'https://cf.cjdropshipping.com/15481728/18242468860792.jpg',
  null,
  'decoration',
  'ambiance-cocon',
  'https://cjdropshipping.com/product/FA2F9C5D-519C-4A02-9A2A-0B77D9114A9F.html',
  'FA2F9C5D-519C-4A02-9A2A-0B77D9114A9F',
  '256F2780-BEEE-4257-82A8-CA9F506953EF',
  'CJJZJYGR00062-Shallow wood grain-USB',
  'CJPacket Ordinary E'
)
on conflict (slug) do nothing;
