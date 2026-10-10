-- Produits du 2026-10-10 (routine quotidienne) : 9 produits (1 par sous-categorie active), marge nette calculee avec le cout total de livraison CJ.
-- housse-coussin-velours-pompons-vert-fonce : 20,90 EUR, marge nette ~7,60 EUR (36,4 %), route CJPacket Ordinary E (7-15 j).
-- jardin-zen-de-table-bois-sable-rateau : 27,90 EUR, marge nette ~9,95 EUR (35,7 %), route CJPacket Ordinary E (7-15 j).
-- tasse-verre-borosilicate-double-paroi-200ml : 19,90 EUR, marge nette ~6,99 EUR (35,1 %), route CJPacket Ordinary E (7-15 j).
-- plateau-bois-citrouille-halloween : 22,90 EUR, marge nette ~8,14 EUR (35,5 %), route CJPacket Ordinary (4-10 j).
-- guirlande-lumineuse-houx-baies-rouges-2m-20-led : 25,90 EUR, marge nette ~9,40 EUR (36,3 %), route CJPacket Liquid Line (7-11 j).
-- gua-sha-coeur-pierre-rose : 17,90 EUR, marge nette ~6,49 EUR (36,3 %), route CJPacket Ordinary E (7-15 j).
-- lampe-reveil-simulation-lever-soleil : 37,90 EUR, marge nette ~13,30 EUR (35,1 %), route CJPacket Liquid Line (7-11 j).
-- coussinets-genoux-yoga-ronds-roses-lot-de-2 : 23,90 EUR, marge nette ~8,56 EUR (35,8 %), route CJPacket Ordinary E (7-15 j).
-- brosse-de-bain-bambou-tete-amovible : 18,90 EUR, marge nette ~6,76 EUR (35,8 %), route CJPacket Ordinary E (7-15 j).
insert into products (slug, name, description, price_cents, image_url, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'housse-coussin-velours-pompons-vert-fonce',
  'Housse de Coussin en Velours à Pompons (vert foncé, 45 x 45 cm)',
  E'Une housse en velours très doux, ornée de petits pompons sur les côtés, pour habiller canapé ou lit d''une touche chaleureuse.\n\nCe que vous obtenez :\n• 1 housse de coussin en velours, coloris vert foncé\n• Format 45 x 45 cm\n• Bordure de pompons décoratifs sur les côtés\n• Toucher velouté et doux\n\nÀ glisser sur un coussin pour rafraîchir le salon, la chambre ou le coin lecture.',
  2090,
  'https://cf.cjdropshipping.com/20210124/476013351619.jpg',
  'decoration', 'murs-textiles',
  'https://cjdropshipping.com/product/416EA83A-7F9B-453A-B670-3656665952C0.html',
  '416EA83A-7F9B-453A-B670-3656665952C0', '61ABD24B-9E3A-4F9E-8A51-4D0F062209FE', 'CJJJJFCS01936-Dark Green-45x45cm', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'jardin-zen-de-table-bois-sable-rateau',
  'Jardin Zen de Table en Bois (sable, galets et râteau)',
  E'Un jardin zen miniature à poser sur un bureau ou une étagère, pour dessiner des motifs dans le sable et ralentir quelques minutes.\n\nCe que vous obtenez :\n• 1 cadre carré en bois clair\n• Du sable blanc fin\n• Des galets noirs décoratifs, dont un galet « ZEN »\n• 1 petit râteau en bois pour tracer les motifs\n\nÀ poser sur un bureau, une table basse ou un meuble d''entrée pour une pause calme.',
  2790,
  'https://cf.cjdropshipping.com/20180822/2479869697628.png',
  'decoration', 'objets-zen',
  'https://cjdropshipping.com/product/C14ED535-B9AF-48C6-B478-2BD887625820.html',
  'C14ED535-B9AF-48C6-B478-2BD887625820', '83228078-93A0-499F-9873-ADC978DB3B09', 'CJJJJTJT00570-4', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'tasse-verre-borosilicate-double-paroi-200ml',
  'Tasse en Verre Borosilicate à Double Paroi (200 ml, transparente)',
  E'Une tasse en verre à double paroi, élégante et légère, pour savourer thé, café ou infusion en voyant la boisson.\n\nCe que vous obtenez :\n• 1 tasse en verre borosilicate transparent\n• Double paroi\n• Capacité de 200 ml\n• Anse pour une prise en main confortable\n\nÀ utiliser pour le thé du matin, un expresso ou une infusion du soir.',
  1990,
  'https://cf.cjdropshipping.com/1612514971416.jpg',
  'decoration', 'art-de-la-table',
  'https://cjdropshipping.com/product/1357612944980054016.html',
  '1357612944980054016', '1357612945009414146', 'CJHS100737303CX', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'plateau-bois-citrouille-halloween',
  'Plateau en Bois Citrouille Halloween (pin, 19 x 18 cm)',
  E'Un petit plateau en pin en forme de citrouille grimaçante, pour servir des gourmandises ou décorer une table d''Halloween.\n\nCe que vous obtenez :\n• 1 plateau en bois de pin, forme citrouille\n• Visage de citrouille gravé dans le bois\n• Dimensions : environ 19 x 18 x 1,5 cm\n• Rebord surélevé pour garder le contenu en place\n\nÀ poser sur une table, un buffet ou un meuble d''entrée pour la saison d''Halloween.',
  2290,
  'https://cf.cjdropshipping.com/59ab3d01-559b-4362-b8d3-4206468e885f.jpg',
  'decoration', 'halloween',
  'https://cjdropshipping.com/product/1554085625073250304.html',
  '1554085625073250304', '1554085625161330688', 'CJHD153655901AZ', 'CJPacket Ordinary'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'guirlande-lumineuse-houx-baies-rouges-2m-20-led',
  'Guirlande Lumineuse Houx et Baies Rouges (2 m, 20 LED, piles)',
  E'Une guirlande lumineuse au feuillage vert et aux baies rouges, pour une ambiance de Noël chaleureuse sur un miroir, une cheminée ou un meuble.\n\nCe que vous obtenez :\n• 1 guirlande de 2 mètres avec 20 LED blanc chaud\n• Fil de cuivre souple, facile à draper\n• Feuillage décoratif et baies rouges\n• Boîtier à piles (piles non fournies)\n\nÀ draper autour d''un miroir, d''une étagère, d''une cheminée ou d''une porte.',
  2590,
  'https://cf.cjdropshipping.com/e15b1936-ef88-4057-8a94-673d599e6137.jpg',
  'decoration', 'noel',
  'https://cjdropshipping.com/product/1467775953852829696.html',
  '1467775953852829696', '1467775953974464512', 'CJSD137324402BY', 'CJPacket Liquid Line'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'gua-sha-coeur-pierre-rose',
  'Gua Sha en Forme de Cœur (pierre rose)',
  E'Un gua sha en pierre rose de forme cœur, pour un massage du visage doux dans votre rituel du soir.\n\nCe que vous obtenez :\n• 1 planche de gua sha en pierre, coloris rose\n• Forme en cœur, prise en main facile\n• Bords arrondis et surface lisse\n• Léger et facile à ranger\n\nÀ utiliser avec votre huile ou crème habituelle pour masser le visage et le cou.',
  1790,
  'https://cf.cjdropshipping.com/quick/product/aeb34ad7-f6d9-455d-aa93-e808283687cc.jpg',
  'bien-etre', 'massage-detente',
  'https://cjdropshipping.com/product/2602120829411639000.html',
  '2602120829411639000', '2602120829411639400', 'CJYD276145201AZ', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'lampe-reveil-simulation-lever-soleil',
  'Lampe Réveil à Simulation de Lever de Soleil (affichage blanc)',
  E'Une lampe de chevet en demi-dôme qui diffuse une lumière douce et affiche l''heure, pour un réveil plus agréable.\n\nCe que vous obtenez :\n• 1 lampe réveil à simulation de lever de soleil\n• Écran numérique à affichage blanc, boutons Time, Alarm, Up et Down\n• Boîtier en ABS, environ 150 x 50 x 105 mm\n• Câble d''alimentation DC de 1 mètre\n\nÀ poser sur une table de chevet pour remplacer le réveil et la lampe.',
  3790,
  'https://cf.cjdropshipping.com/quick/product/9cdaad3f-e820-4109-971e-396c0e6d8c38.jpg',
  'bien-etre', 'sommeil-repos',
  'https://cjdropshipping.com/product/1730134185349746688.html',
  '1730134185349746688', '1730134185408466944', 'CJYD191002201AZ', 'CJPacket Liquid Line'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'coussinets-genoux-yoga-ronds-roses-lot-de-2',
  'Coussinets de Genoux pour Yoga et Pilates (ronds, roses, lot de 2)',
  E'Deux petits coussinets ronds à glisser sous les genoux, les coudes ou les mains pour pratiquer yoga et pilates avec plus de confort.\n\nCe que vous obtenez :\n• 2 coussinets ronds de 16 cm de diamètre\n• Épaisseur de 6 mm\n• Surface texturée, coloris rose\n• Format léger, facile à glisser dans un sac\n\nÀ utiliser pendant une séance de yoga, de pilates ou d''étirements au sol.',
  2390,
  'https://cf.cjdropshipping.com/1620871309419.jpg',
  'bien-etre', 'sport-posture',
  'https://cjdropshipping.com/product/1392455760448983040.html',
  '1392455760448983040', '1392661954463666176', 'CJJM112597604DW', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, images, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'brosse-de-bain-bambou-tete-amovible',
  'Brosse de Bain en Bambou à Tête Amovible (poils naturels, 42 cm)',
  E'Une brosse à long manche en bambou, avec une tête amovible aux poils naturels, pour la douche ou le brossage à sec.\n\nCe que vous obtenez :\n• 1 brosse de bain en bambou, longueur totale 42 cm\n• Tête de brosse de 12,5 x 8 cm, poils naturels mi-doux\n• Tête amovible avec sangle en coton\n• Cordelette pour l''accrocher après usage\n\nÀ utiliser sous la douche ou en brossage à sec pour un rituel de soin du corps.',
  1890,
  'https://cf.cjdropshipping.com/20200829/1815628011951.png',
  '["https://cf.cjdropshipping.com/20200829/1815628011951.png","https://cf.cjdropshipping.com/20190425/184639997268.png","https://cf.cjdropshipping.com/20190425/716316802707.png","https://cf.cjdropshipping.com/20190425/94818919513.png"]'::jsonb,
  'bien-etre', 'soin-rituel',
  'https://cjdropshipping.com/product/A30BE622-EDFB-4A5B-913B-CE3D4E9E26D1.html',
  'A30BE622-EDFB-4A5B-913B-CE3D4E9E26D1', '2656753F-9F0C-48DB-AE60-5DF375B3DED7', 'CJJJJTYS00482-Massage brush', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;
