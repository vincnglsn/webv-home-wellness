-- Ajout du 2026-10-13 : cônes d'encens à reflux, recharge des brûle-encens de la sous-catégorie objets-zen.
-- Bâtonnets écartés : boîtes de marque déposée (risque de contrefaçon) ou aucune route CJ vers la France.
-- cones-encens-reflux-lot-100 : 20,90 EUR, coût CJ 0,76 $ + port 10,07 $ (totalPostageFee), marge nette ~7,54 EUR (36,1 %), route CJPacket Liquid Line (7-11 j).
-- Photos : P0, P3 (cônes assortis), P4 (cotes, en dernier) ; écartées : texte superposé, cônes d'une autre couleur.
insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values (
  'cones-encens-reflux-lot-100',
  'Cônes d''Encens à Reflux (lot de 100, parfums assortis)',
  E'Des cônes d''encens percés à la base, pensés pour les brûle-encens à reflux : la fumée descend en cascade au lieu de monter.\n\nCe que vous obtenez :\n• 100 cônes d''encens à reflux, livrés en sachet\n• Parfums assortis : santal, rose et lavande\n• Cônes à base de bois, coloris variés selon le parfum\n• Format d''un cône : environ 2,8 x 1,5 cm\n\nPosez un cône sur votre brûle-encens à reflux, allumez la pointe puis soufflez la flamme pour laisser la fumée s''écouler.\nPar sécurité : utilisez-le sur un support stable et ininflammable, dans une pièce aérée, ne le laissez jamais se consumer sans surveillance et gardez-le hors de portée des enfants et des animaux.',
  2090,
  'https://cf.cjdropshipping.com/41f39740-099e-4e1d-a852-d8e1fd0dfe30.jpg',
  '["https://cf.cjdropshipping.com/41f39740-099e-4e1d-a852-d8e1fd0dfe30.jpg","https://cf.cjdropshipping.com/e8d087d1-2c3e-4c67-810c-8cd9105faac4.jpg","https://cf.cjdropshipping.com/2541cc2a-b4ea-41bc-91e5-15b0bee3398c.jpg"]'::jsonb,
  'decoration',
  'objets-zen',
  'https://cjdropshipping.com/product/1472081947906936832.html',
  '1472081947906936832',
  '2409250740291617500',
  'CJJT138312202BY',
  'CJPacket Liquid Line'
)
on conflict (slug) do nothing;
