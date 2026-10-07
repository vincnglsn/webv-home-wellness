-- Produits du 2026-10-07 (routine quotidienne) : 2 produits, marge nette calculee avec le cout total de livraison CJ.
-- chaussettes-yoga-antiderapantes-orteils-separes : 16,90 EUR, marge nette ~6,41 EUR (37,9 %), route CJPacket Ordinary E (7-15 j).
-- housse-coussin-coton-lave-franges-blanc : 17,90 EUR, marge nette ~6,65 EUR (37,1 %), route CJPacket Ordinary E (7-15 j).
insert into products (slug, name, description, price_cents, image_url, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'chaussettes-yoga-antiderapantes-orteils-separes',
  'Chaussettes de Yoga Antidérapantes à Orteil Séparé (noir)',
  E'Des chaussettes à orteil séparé et picots antidérapants, pensées pour la pratique du yoga et du pilates.\n\nCe que vous obtenez :\n• 1 paire de chaussettes à orteil séparé, coloris noir\n• Picots antidérapants sous le talon et la plante du pied\n• Coton peigné (80 % de la composition du tissu), épaisseur moyenne, tissu respirant\n• Taille unique, du 35 au 42\n\nÀ enfiler en cours de yoga ou de pilates, ou pour vos étirements à la maison.',
  1690,
  'https://cf.cjdropshipping.com/20200528/3101336937365.jpg',
  'bien-etre', 'sport-posture',
  'https://cjdropshipping.com/product/14DE49BF-EE4B-49B6-9D83-B48CD263873A.html',
  '14DE49BF-EE4B-49B6-9D83-B48CD263873A', '6CCB22DC-613E-406E-ACE3-A93F17F5C5F4', 'CJNSFSWZ00542-Black', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'housse-coussin-coton-lave-franges-blanc',
  'Housse de Coussin en Coton Lavé à Franges (30 x 50 cm, blanc)',
  E'Une housse de coussin rectangulaire en coton lavé, bordée de franges, pour apporter une touche douce et naturelle au canapé ou au lit.\n\nCe que vous obtenez :\n• 1 housse de coussin en coton lavé, coloris blanc\n• Format rectangulaire de 30 x 50 cm\n• Bordure à franges sur le pourtour\n• Housse seule, sans garnissage\n\nÀ associer à un plaid ou à d''autres coussins pour créer un coin salon cocooning.',
  1790,
  'https://cf.cjdropshipping.com/quick/product/c5558eb8-8370-4696-9344-e75c68113cfb.jpg',
  'decoration', 'murs-textiles',
  'https://cjdropshipping.com/product/2411060912291619600.html',
  '2411060912291619600', '2411060912291619700', 'CJZT218451501AZ', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;
