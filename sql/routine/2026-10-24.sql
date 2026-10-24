-- Produits du 2026-10-24 (routine quotidienne) : 2 produits ajoutés sur 9 sous-catégories actives.
-- Marges nettes calculées avec le coût total de livraison : calendrier de l'Avent en bois (noel) 36,8 % ; rond de serviette doré (art-de-la-table) 35,4 %.
-- Sous-catégories sans ajout aujourd'hui : murs-textiles, objets-zen, ambiance-cocon, massage-detente, sommeil-repos, sport-posture, soin-rituel (aucun produit ne passait tous les contrôles ou le plafond de recherches).
-- Halloween : inactif (hors période).

insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('calendrier-avent-bois-compte-a-rebours-noel','Calendrier de l''Avent en Bois Compte à Rebours de Noël','Un calendrier de l''Avent en bois au toit enneigé, à poser pour compter les jours jusqu''à Noël.

Ce que vous obtenez :
• 1 panneau en bois d''environ 30 cm de haut avec 25 cases numérotées
• 1 petit Père Noël en bois à placer chaque jour sur la case du jour
• Un pied de pose intégré
• Finition brune, toit blanc et inscription « Christmas is almost here »

À poser sur une console ou un buffet pendant l''Avent pour suivre le décompte.',2190,'https://cf.cjdropshipping.com/quick/product/dcf5f538-67ce-440c-986a-1a025827c7f7.jpg',null,'decoration','noel','https://cjdropshipping.com/product/1718189961024905216.html','1718189961024905216','1718189961112985600','CJYD188221801AZ','CJPacket Ordinary E')
on conflict (slug) do nothing;

insert into products (slug,name,description,price_cents,image_url,images,category,subcategory,supplier_url,cj_product_id,cj_variant_id,cj_sku,cj_logistic_name) values
('rond-de-serviette-epi-ble-dore','Rond de Serviette Doré Branches de Blé','Un rond de serviette doré aux branches de blé, pour dresser une table simple et élégante.

Ce que vous obtenez :
• 1 rond de serviette en fer à finition dorée
• Motif de branches de blé en relief
• Style nordique, pour la table de fête comme au quotidien
• Vendu à l''unité

À glisser autour d''une serviette en tissu pour habiller chaque couvert.',1390,'https://cf.cjdropshipping.com/quick/product/880fee08-df2e-4e0c-89d6-524ab9ccce78.jpg',null,'decoration','art-de-la-table','https://cjdropshipping.com/product/1785533258986434560.html','1785533258986434560','1785533259070320640','CJYD202523701AZ','CJPacket Ordinary E')
on conflict (slug) do nothing;
