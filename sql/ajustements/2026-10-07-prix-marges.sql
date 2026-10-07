-- Hausse de prix du 2026-10-07 : 10 produits dont la marge reelle (cout total de livraison CJ
-- inclus) etait sous 20%. Nouveaux prix calcules pour environ 35% de marge nette.
update products set price_cents = 1690 where slug = 'chandelier-squelette-led' and price_cents = 990;
update products set price_cents = 2690 where slug = 'guirlande-lumineuse-citrouilles' and price_cents = 1690;
update products set price_cents = 2190 where slug = 'masque-sommeil-3d-ajustable' and price_cents = 1390;
update products set price_cents = 6490 where slug = 'miroir-led-sans-fil' and price_cents = 4490;
update products set price_cents = 4990 where slug = 'taie-oreiller-satin' and price_cents = 3490;
update products set price_cents = 2790 where slug = 'fantomes-lumineux-suspendre-x3' and price_cents = 1990;
update products set price_cents = 2790 where slug = 'correcteur-posture-intelligent' and price_cents = 1990;
update products set price_cents = 3390 where slug = 'bruleur-encens-zen-ceramique' and price_cents = 2490;
update products set price_cents = 6090 where slug = 'veilleuse-lune-3d' and price_cents = 4490;
update products set price_cents = 2090 where slug = 'housse-coussin-lin-coton-glands-kaki' and price_cents = 1490;
