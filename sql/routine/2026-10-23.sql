-- Produits du 2026-10-23 (routine quotidienne) : 6 produits ajoutés, un par sous-catégorie active.
-- Marges nettes : fontaine 35,2 % ; projecteur 35,9 % ; rouleaux 35,0 % ; renforçateur 37,1 % ; couverts 36,2 % ; coussin 35,8 %.
-- Sans ajout aujourd'hui : murs-textiles, massage-detente, noel (aucun produit ne passait les contrôles), halloween (inactif après le 17 octobre).
-- Livraison : route CJ la moins chère, délai maximal 15 jours.

insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('fontaine-eau-zen-table-cascade', $$Fontaine d'eau zen de table à cascade$$, $$Une fontaine décorative qui installe une ambiance calme dans une pièce grâce au bruit de l'eau qui ruisselle.

Ce que vous obtenez :
• Une fontaine de table en résine à l'aspect poterie et pierre
• Deux vasques en cascade et des pierres décoratives à la base
• Une pompe intégrée qui fait circuler l'eau en continu, alimentée en USB
• Une décoration à poser sur un bureau, une étagère ou une console

Remplissez le bassin d'eau claire et posez la fontaine sur une surface stable.$$, 4790, 'https://cf.cjdropshipping.com/b97d1de1-e60f-40a0-aef9-23765e5afdc1.jpg', '["https://cf.cjdropshipping.com/b97d1de1-e60f-40a0-aef9-23765e5afdc1.jpg","https://cf.cjdropshipping.com/e17aaf0b-6bf5-4de4-96f4-ea20d7cf295b.jpg","https://cf.cjdropshipping.com/56c37de4-9ee5-40cd-bdc8-d78498b61db1.jpg"]'::jsonb, 'decoration', 'objets-zen', 'https://cjdropshipping.com/product/1589543321641431040.html', '1589543321641431040', '1589543321729511424', 'CJJT160709301AZ', 'YunExpress Ordinary')
on conflict (slug) do nothing;

insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('veilleuse-projecteur-coucher-soleil-chat', $$Projecteur coucher de soleil rose en forme de chat$$, $$Un petit projecteur qui transforme un mur en coucher de soleil, pour une lumière douce et chaleureuse.

Ce que vous obtenez :
• Un projecteur de couleur rose en forme de tête de chat
• Un rayon dégradé jaune et rose à projeter sur le mur
• Une tête orientable pour choisir l'angle de projection
• Une alimentation par port USB

Posez-le sur une étagère ou un bureau face à un mur clair, puis allumez-le.$$, 1990, 'https://cf.cjdropshipping.com/35ccd0fb-a6c3-4a9f-a596-6bd834e5d36f.jpg', null, 'decoration', 'ambiance-cocon', 'https://cjdropshipping.com/product/1474218058418622464.html', '1474218058418622464', '1474218058536062976', 'CJJT138704101AZ', 'YunExpress Sensitive')
on conflict (slug) do nothing;

insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('lot-4-rouleaux-massage-visage-pierre-verte', $$Lot de 4 rouleaux de massage visage en pierre verte$$, $$Des rouleaux en pierre verte pour masser le visage et le cou en douceur, au quotidien.

Ce que vous obtenez :
• Quatre rouleaux de massage aux embouts ovales et ronds
• Une structure dorée qui relie les deux extrémités de chaque rouleau
• Une pierre verte polie, avec des finitions dorées
• Un lot de quatre pièces, comme indiqué sur la fiche produit

Appliquez le rouleau sur une peau propre et hydratée, en remontant du centre du visage vers l'extérieur.$$, 2790, 'https://cf.cjdropshipping.com/1622695689075.jpg', null, 'bien-etre', 'soin-rituel', 'https://cjdropshipping.com/product/1400313603868987392.html', '1400313603868987392', '1400313605240524800', 'CJAM115719901AZ', 'CJPacket Ordinary E')
on conflict (slug) do nothing;

insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('renforcateur-main-ressort-noir-50-lb', $$Renforçateur de main à ressort noir, résistance 50 lb$$, $$Un petit appareil à ressort pour travailler la force de la main et de l'avant-bras.

Ce que vous obtenez :
• Un renforçateur de main noir à deux poignées moletées
• Un ressort en acier de résistance 50 lb (environ 23 kg)
• Une structure en métal, sans pile ni fil
• Un format compact, facile à ranger dans un sac de sport ou un tiroir

Serrez les poignées lentement puis relâchez, le poignet bien droit.$$, 1990, 'https://cf.cjdropshipping.com/quick/product/489d0160-5403-4a23-bc8b-fd1521171e69.jpg', null, 'bien-etre', 'sport-posture', 'https://cjdropshipping.com/product/2604190234301607400.html', '2604190234301607400', '2604190234301608200', 'CJYD284236801AZ', 'CJPacket Ordinary E')
on conflict (slug) do nothing;

insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('couverts-bambou-pochette-tissu', $$Couverts en bambou avec pochette en tissu$$, $$Un couvert en bambou naturel, à ranger dans sa pochette pour les repas en extérieur ou au bureau.

Ce que vous obtenez :
• Une cuillère, une fourchette et un couteau en bambou naturel
• Une pochette en tissu à motif fleuri pour les ranger
• Des pièces d'environ 20 cm de long
• Un bambou aux teintes légèrement variables, comme le veut sa nature

Idéal pour un pique-nique, un déjeuner sur le pouce ou la table du quotidien.$$, 1690, 'https://cf.cjdropshipping.com/20200301/2728341557729.jpg', null, 'decoration', 'art-de-la-table', 'https://cjdropshipping.com/product/D3BD0EEC-F2D4-4B14-9D11-B7312AF4AED0.html', 'D3BD0EEC-F2D4-4B14-9D11-B7312AF4AED0', '29514032-AE2D-4879-B979-9175DD1427A9', 'CJJJCFCJ01140-Wood', 'CJPacket Ordinary E')
on conflict (slug) do nothing;

insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('coussin-sieste-bureau-en-u-gris', $$Coussin de sieste en U pour bureau, gris$$, $$Un coussin en forme de U à poser sur le bureau pour un court moment de repos.

Ce que vous obtenez :
• Un coussin en U en velours gris, rembourré en coton PP
• Une ouverture centrale pour y poser la tête ou les bras
• Un appui-bras intégré
• Un format d'environ 34 x 43 x 17 cm

Posez-le sur le bureau ou sur une chaise, et utilisez-le pour une courte pause.$$, 3490, 'https://cf.cjdropshipping.com/20200828/1395931309019.jpg', null, 'bien-etre', 'sommeil-repos', 'https://cjdropshipping.com/product/38D67B82-B9F0-4BB4-92C4-36C97340AA18.html', '38D67B82-B9F0-4BB4-92C4-36C97340AA18', 'C9F99B8D-5495-4C54-90B7-39A9B5744EBC', 'CJJJJFZT00596-Grey', 'CJPacket Ordinary E')
on conflict (slug) do nothing;
