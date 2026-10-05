# Maison Bien-Être

Boutique en ligne (dropshipping) d'objets de bien-être et de décoration.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind CSS), déployé sur Vercel
- [Neon](https://neon.tech) (Postgres serverless) via `@neondatabase/serverless`
- [Stripe](https://stripe.com) Checkout pour le paiement
- [CJdropshipping](https://developers.cjdropshipping.com) pour la commande fournisseur automatique

## Démarrer en local

```bash
npm install
cp .env.example .env.local   # puis renseigner les variables
npm run dev
```

Variables d'environnement : voir [`.env.example`](.env.example). Le schéma, les
migrations et le catalogue sont dans [`sql/schema.sql`](sql/schema.sql), conçu
pour être rejoué sans risque :

```bash
psql "$DATABASE_URL" -f sql/schema.sql
```

## Flux de commande

1. `/api/checkout` relit les prix en base et crée la session Stripe.
2. Le webhook `/api/webhooks/stripe` (`checkout.session.completed`) enregistre la
   commande de façon atomique et idempotente, puis la transmet à CJdropshipping
   (`src/lib/fulfillment.ts`). Les articles sont regroupés par route logistique,
   un groupe = une commande CJ. En mode test Stripe, la commande CJ est sandbox.
3. En cas d'erreur, le webhook répond 500 (Stripe rejoue l'événement) et une
   alerte est émise (logs + `ALERT_WEBHOOK_URL` si défini).
4. `/api/cron/supplier-sync` (Vercel Cron, quotidien, protégé par `CRON_SECRET`)
   relance les commandes non transmises et rafraîchit statut et numéro de suivi,
   affichés sur `/suivi-commande`.

## Conseiller IA (chatbot)

Widget flottant (`src/components/ChatWidget.tsx`) branché sur `/api/chat`, qui appelle
l'API Claude avec quatre outils (`src/lib/chat/tools.ts`) : recherche et fiche produit
dans la base, affichage de cartes produit avec ajout au panier, et suivi de commande
(numéro + e-mail exigés, comme `/suivi-commande`). Politique de livraison et de retours
dans `src/lib/chat/prompt.ts`, à garder synchronisée avec `/retours` et `/cgv`.

Variables : `ANTHROPIC_API_KEY` (obligatoire), `CHAT_MODEL` (optionnel, défaut `claude-opus-5-5`).

## À configurer côté services

- Stripe : endpoint webhook vers `/api/webhooks/stripe`, événement `checkout.session.completed`.
- Vercel : variables d'environnement de `.env.example`, dont `CRON_SECRET`.
- Neon : rejouer `sql/schema.sql` après chaque déploiement qui l'a modifié.
