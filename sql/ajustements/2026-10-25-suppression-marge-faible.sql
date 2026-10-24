-- Suppression de 4 produits à marge nette < 10 % (2026-10-25, demande de l'utilisateur). 0 commande liée.
delete from products where slug in ('lanterne-halloween-retro-citrouille','mini-lampe-citrouille-led','lumiere-squelette-assis-led','rouleau-massage-mousse-eva-noir-45x14');
