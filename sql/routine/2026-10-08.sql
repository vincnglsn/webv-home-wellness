-- Produits du 2026-10-08 (routine quotidienne) : 2 produits, marge nette calculee avec le cout total de livraison CJ.
-- set-sommeil-satin-4-pieces-champagne : 25,90 EUR, marge nette ~9,28 EUR (35,8 %), route CJPacket Ordinary E (7-15 j).
-- housse-coussin-noel-sapins-rouge-noir : 16,90 EUR, marge nette ~6,60 EUR (39,0 %), route CJPacket Ordinary E (7-15 j).
insert into products (slug, name, description, price_cents, image_url, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'set-sommeil-satin-4-pieces-champagne',
  'Set Sommeil en Satin 4 Pièces (champagne)',
  E'Un set en satin imitation soie, coloris champagne, pour composer un rituel de nuit assorti.\n\nCe que vous obtenez :\n• 1 masque de sommeil occultant (20,5 x 9,5 cm)\n• 1 taie d''oreiller (48 x 65 cm)\n• 1 chouchou et 1 bandeau pour les cheveux\n• Satin doux, coloris champagne\n\nÀ associer pour la nuit, ou pour vos moments de détente à la maison.',
  2590,
  'https://cf.cjdropshipping.com/dc02e2c4-db49-43e3-9963-a12d1e4049c4.jpg',
  'bien-etre', 'sommeil-repos',
  'https://cjdropshipping.com/product/1524212426772852736.html',
  '1524212426772852736', '1524212426919653376', 'CJCS148046301AZ', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;

insert into products (slug, name, description, price_cents, image_url, category, subcategory, supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name) values (
  'housse-coussin-noel-sapins-rouge-noir',
  'Housse de Coussin Noël Sapins Rouge et Noir (45 x 45 cm)',
  E'Une housse de coussin imprimée de sapins de Noël rouges, noirs et à carreaux, pour une ambiance de fêtes chaleureuse sur le canapé ou le lit.\n\nCe que vous obtenez :\n• 1 housse de coussin imprimée, motif sapins et flocons\n• Format carré de 45 x 45 cm\n• Tissu imprimé\n• Housse seule, sans garnissage\n\nÀ glisser sur un coussin du salon pour habiller la maison à l''approche de Noël.',
  1690,
  'https://cf.cjdropshipping.com/quick/product/167e5474-4244-40c7-9fa1-9d978d3f4cf9.jpg',
  'decoration', 'noel',
  'https://cjdropshipping.com/product/2410220638191619000.html',
  '2410220638191619000', '2410220638191619200', 'CJZT216757501AZ', 'CJPacket Ordinary E'
) on conflict (slug) do nothing;
