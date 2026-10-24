-- Produits du 2026-10-21 (routine quotidienne) : 3 produits, un par sous-catégorie active ayant passé tous les contrôles. Aucun ajout : murs-textiles (plafond de recherches atteint), objets-zen, ambiance-cocon, art-de-la-table, massage-detente, soin-rituel (photos non conformes, doublon de type ou prix non viable). Halloween inactive (hors période).
-- Marges nettes (coût total de livraison inclus) : noel 6,12 € (36,2 %), sommeil-repos 10,09 € (36,2 %), sport-posture 9,72 € (39,0 %).

insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values ('renne-noel-bois-poser-15cm', 'Renne de Noël en Bois à Poser (15 cm)', $$Un renne en bois à poser, pour une touche de Noël chaleureuse sur une console ou une étagère.

Ce que vous obtenez :
• Un renne découpé en bois, d'une hauteur d'environ 15 cm
• Un nœud rouge noué autour du cou
• Un socle rond qui lui permet de tenir debout
• Un design simple, dans des tons naturels

À poser sur une console, une étagère ou la table de fête pendant la période de Noël.$$, 1690, 'https://cf.cjdropshipping.com/ab9e98dd-d087-484b-af3a-5fc5286cf78e.jpg', null, 'decoration', 'noel', 'https://cjdropshipping.com/product/1570984248725745664.html', '1570984248725745664', '1570984248750911488', 'CJJT156597401AZ', 'CJPacket Ordinary E') on conflict (slug) do nothing;

insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values ('bandeau-sommeil-bluetooth-panda', 'Bandeau de Sommeil Bluetooth Motif Panda', $$Un bandeau doux en polyester, avec haut-parleurs intégrés, pour écouter de la musique au calme avant de dormir.

Ce que vous obtenez :
• Un bandeau élastique en polyester, motif panda
• Une connexion Bluetooth, portée annoncée jusqu'à 20 mètres
• Une autonomie annoncée de plus de 8 heures
• Une fonction d'appel et de commande vocale

Idéal pour écouter une playlist ou un podcast au calme le soir.$$, 2790, 'https://oss-cf.cjdropshipping.com/product/2026/05/06/06/4d15588e-6a8e-4b10-8f09-3b4d027970d4_water.jpeg', null, 'bien-etre', 'sommeil-repos', 'https://cjdropshipping.com/product/2605060655151614700.html', '2605060655151614700', '2605060655151615200', 'CJYP287146501AZ', 'CJPacket Liquid Line') on conflict (slug) do nothing;

insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values ('gourde-pliable-500ml-sport', 'Gourde Pliable Anti-fuite 500 ml', $$Une gourde de 500 ml qui se replie pour tenir dans un sac, pratique pour le sport et les déplacements.

Ce que vous obtenez :
• Une gourde pliable d'une contenance de 500 ml
• Un couvercle à fermeture anti-fuite
• Un mousqueton pour l'accrocher à un sac
• Un format replié d'environ 4,6 cm de haut

À emporter à la salle, en randonnée ou pour une balade.$$, 2490, 'https://cf.cjdropshipping.com/af82558b-73ad-430a-9320-712d264b26c9.jpg', null, 'bien-etre', 'sport-posture', 'https://cjdropshipping.com/product/1654377365398626304.html', '1654377365398626304', '1654377365474123776', 'CJHS175071801AZ', 'CJPacket Ordinary E') on conflict (slug) do nothing;
