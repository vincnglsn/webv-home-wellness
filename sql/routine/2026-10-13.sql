-- Produits du 2026-10-13 (routine quotidienne) : 9 produits, un par sous-catégorie active (halloween et noel actives).
-- Marges nettes (coût total de livraison inclus) : murs-textiles 10,13 € (36,3 %), objets-zen 13,86 € (37,5 %), art-de-la-table 11,92 € (35,2 %), halloween 7,18 € (36,1 %), noel 9,03 € (36,3 %), massage-detente 8,21 € (35,9 %), sommeil-repos 8,52 € (35,6 %), sport-posture 9,73 € (36,2 %), soin-rituel 7,19 € (36,1 %).

-- murs-textiles
insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('housse-coussin-touffetee-glands-vert-45x45','Housse de Coussin Touffetée à Glands (vert d''eau, 45 x 45 cm)','Des motifs en relief tuftés à la main et quatre glands assortis pour une touche bohème sur votre canapé.

Ce que vous obtenez :
• 1 housse de coussin de 45 x 45 cm (sans garnissage)
• Toile en coton et lin de couleur écrue
• Motifs géométriques touffetés en relief, coloris vert d''eau
• Un gland décoratif à chaque angle

Glissez-y un coussin de 45 x 45 cm pour réveiller un canapé, un lit ou un fauteuil.',2790,'https://cf.cjdropshipping.com/030bc681-e635-4c4c-927c-702782bf4cf1.jpg',null,'decoration','murs-textiles','https://cjdropshipping.com/product/1548132945133842432.html','1548132945133842432','1548132945230311425','CJJT152627603CX','CJPacket Ordinary E')
on conflict (slug) do nothing;

-- objets-zen
insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('brule-encens-reflux-main-lotus-cloche-verre-led','Brûle-Encens à Reflux Main et Lotus sous Cloche en Verre (boule LED)','Une main en céramique, un lotus et une cloche en verre : la fumée de l''encens descend en cascade jusqu''à une petite boule lumineuse.

Ce que vous obtenez :
• 1 brûle-encens à reflux en céramique en forme de main
• Un couvercle en forme de lotus qui accueille le cône d''encens
• Une cloche en verre transparent qui guide la fumée
• Une boule décorative LED posée au creux d''un petit lotus

Posez un cône d''encens à reflux sur le lotus et regardez la fumée glisser doucement le long de la cloche.',3690,'https://cf.cjdropshipping.com/20200808/75874436462943.jpg',null,'decoration','objets-zen','https://cjdropshipping.com/product/5779B662-8A17-45BD-9069-A82BD0247EA4.html','5779B662-8A17-45BD-9069-A82BD0247EA4','FCA94442-B20D-437C-8831-4692A793A20C','CJJJJTJT16646-Bergamot','CJPacket Liquid Line')
on conflict (slug) do nothing;

-- art-de-la-table
insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('beurrier-ceramique-blanc-couvercle-couteau','Beurrier en Céramique Blanc avec Couvercle et Couteau à Beurre','Un beurrier émaillé aux lignes douces, coiffé d''un bouton en bois, pour garder le beurre à portée de main sur la table.

Ce que vous obtenez :
• 1 plateau en céramique émaillée blanche (17 x 12,3 x 2,3 cm)
• 1 couvercle en céramique (14 x 9,5 x 5,5 cm) avec bouton de préhension en bois
• 1 couteau à beurre de 13 cm
• Une forme rectangulaire simple qui s''accorde à toutes les vaisselles

Posez-le sur la table du petit-déjeuner ou rangez-le au réfrigérateur pour garder votre beurre à l''abri.',3390,'https://cf.cjdropshipping.com/c3822f7f-257c-4b6b-9c6b-1717c07432b9.jpg',null,'decoration','art-de-la-table','https://cjdropshipping.com/product/1435119333620715520.html','1435119333620715520','1435119333704601600','CJCF127826003CX','CJPacket Ordinary E')
on conflict (slug) do nothing;

-- halloween
insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('chemin-de-table-halloween-citrouilles-noir-or-33x183','Chemin de Table Halloween Citrouilles Noir, Orange et Or (33 x 183 cm)','Des citrouilles à pois, pailletées et grimaçantes s''invitent sur votre table pour un dîner d''Halloween festif.

Ce que vous obtenez :
• 1 chemin de table de 33 x 183 cm
• Tissu à l''aspect lin (composition principale : polyester)
• Imprimé citrouilles orange, noires et dorées sur fond écru
• Visages de citrouilles d''Halloween répartis sur toute la longueur

Déroulez-le au centre de la table ou sur un buffet pour donner le ton de votre soirée d''Halloween.',1990,'https://cf.cjdropshipping.com/quick/product/f98e8473-0fd7-4a5a-b6c5-b293ea781626.jpg',null,'decoration','halloween','https://cjdropshipping.com/product/1740216921682882560.html','1740216921682882560','1740216921808711680','CJYD193224501AZ','CJPacket Ordinary')
on conflict (slug) do nothing;

-- noel
insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('coffret-6-casse-noisettes-bois-suspendre-12cm','Coffret de 6 Casse-Noisettes Soldats en Bois à Suspendre (12,5 cm)','Six petits soldats casse-noisettes peints, prêts à monter la garde dans le sapin ou sur la cheminée.

Ce que vous obtenez :
• 6 figurines casse-noisettes en bois de 12,5 cm
• Uniformes peints rouges, bleus et noirs avec détails dorés
• Une attache dorée pour suspendre chaque figurine
• Le tout présenté dans une boîte rouge à compartiments

Accrochez-les aux branches du sapin ou alignez-les sur une étagère pour une déco de Noël traditionnelle.',2490,'https://cf.cjdropshipping.com/3fb05d03-f9cd-4893-b84f-8a9a47511b9a.jpg','["https://cf.cjdropshipping.com/3fb05d03-f9cd-4893-b84f-8a9a47511b9a.jpg","https://cf.cjdropshipping.com/b0841119-bd95-4709-b06c-71b8165a901a.jpg"]'::jsonb,'decoration','noel','https://cjdropshipping.com/product/1592440339988754432.html','1592440339988754432','1592440340081029120','CJJT161314803CX','CJPacket Ordinary E')
on conflict (slug) do nothing;

-- massage-detente
insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('rouleau-massage-bille-acier-inoxydable-manche','Rouleau de Massage à Bille en Acier Inoxydable (manche ergonomique, violet)','Une grosse bille en acier inoxydable qui roule librement au bout d''un manche bien en main, pour un automassage simple.

Ce que vous obtenez :
• 1 rouleau de massage à bille
• Bille en acier inoxydable montée sur un axe pivotant
• Support violet et manche gris strié antidérapant
• Un format compact facile à glisser dans un sac de sport

Faites rouler la bille sur les épaules, les bras ou les jambes après l''effort ou en fin de journée.',2290,'https://cf.cjdropshipping.com/ecf9443a-4c16-4391-9487-c6c8bdcc577e.jpg','["https://cf.cjdropshipping.com/ecf9443a-4c16-4391-9487-c6c8bdcc577e.jpg","https://cf.cjdropshipping.com/cafc6f44-2647-4237-b501-1ae5d4a86cef.jpg","https://cf.cjdropshipping.com/c68ce590-5050-4d5f-b3a7-202ee6c08193.jpg"]'::jsonb,'bien-etre','massage-detente','https://cjdropshipping.com/product/1439183134594830336.html','1439183134594830336','1439183134854877184','CJAM129187801AZ','CJPacket Ordinary E')
on conflict (slug) do nothing;

-- sommeil-repos
insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('masque-de-nuit-soie-double-face-rose','Masque de Nuit en Soie Double Face (rose poudré)','Un masque de nuit doux et léger, en soie sur ses deux faces, pour faire le noir au moment de s''endormir.

Ce que vous obtenez :
• 1 masque de nuit couvrant les yeux
• Soie sur les deux faces, au toucher lisse
• Bandeau élastique froncé recouvert du même tissu
• Coloris rose poudré

Glissez-le sur vos yeux pour une sieste, un trajet ou une nuit dans une chambre trop lumineuse.',2390,'https://cf.cjdropshipping.com/20200725/939590976979.jpg',null,'bien-etre','sommeil-repos','https://cjdropshipping.com/product/BA0F6D33-85C3-44DC-A49E-6E1716DBEEB0.html','BA0F6D33-85C3-44DC-A49E-6E1716DBEEB0','4ACA0CEA-2680-427D-BD3C-67A7ACE41EB7','CJBJPFMB01218-Pink','CJPacket Ordinary E')
on conflict (slug) do nothing;

-- sport-posture
insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('appareil-musculation-poignets-avant-bras-ressorts','Appareil de Musculation Poignets et Avant-Bras à Ressorts (noir)','Un appareil compact à ressorts en acier pour travailler la force des poignets et des avant-bras à la maison ou au bureau.

Ce que vous obtenez :
• 1 appareil d''entraînement poignets et avant-bras (environ 440 g)
• Deux ressorts en acier au manganèse
• Poignées recouvertes de mousse épaisse pour le confort
• Une sangle en nylon réglable selon la taille de la main et du bras

Saisissez la poignée, calez l''avant-bras dans l''arceau en mousse et enchaînez les mouvements de flexion du poignet.',2690,'https://cf.cjdropshipping.com/20190306/7893345784007.png',null,'bien-etre','sport-posture','https://cjdropshipping.com/product/965198AB-DFA3-4EC7-A614-3A6540D3DAFC.html','965198AB-DFA3-4EC7-A614-3A6540D3DAFC','3E6B61E1-07BD-4B2C-9302-D697CAD75766','CJYDQTJM00163-Black','CJPacket Ordinary E')
on conflict (slug) do nothing;

-- soin-rituel
insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('peigne-massage-bois-5-dents-bouts-ronds','Peigne de Massage en Bois à 5 Larges Dents Arrondies (10,5 x 5,5 cm)','Un petit peigne en bois poli aux cinq dents larges terminées par des boules, à garder sous la main pour un moment de détente.

Ce que vous obtenez :
• 1 peigne de massage en bois (10,5 x 5,5 cm, environ 54 g)
• 5 larges dents rondes aux extrémités en boule
• Une finition poncée sans arêtes vives
• Un format léger qui se glisse facilement dans un sac

Passez-le doucement sur le cuir chevelu ou démêlez les cheveux épais dans le cadre de votre rituel du soir.',1990,'https://cf.cjdropshipping.com/4836c550-dfb2-4eb6-accf-8a84eb9ae94b.png',null,'bien-etre','soin-rituel','https://cjdropshipping.com/product/1572497369076346880.html','1572497369076346880','1572497369143455744','CJST156907201AZ','CJPacket Ordinary E')
on conflict (slug) do nothing;
