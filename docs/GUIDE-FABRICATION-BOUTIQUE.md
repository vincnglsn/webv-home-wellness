# Guide complet : fabriquer une boutique de dropshipping automatisée

> Modèle : **Maison Bien-Être** (décoration et bien-être pour la maison), construite avec Claude Code.
> Ce guide décrit tout ce qui a été fait, dans l'ordre, avec les choix, les formules, les pièges et les
> modèles de consignes, pour **recréer la même boutique sur un autre sujet** (jardin, animaux, bébé, sport,
> cuisine, bureau…). Il ne contient **aucun secret** : seuls les noms des variables sont indiqués.

Sommaire

0. Comment utiliser ce guide
1. Vue d'ensemble et architecture
2. Comptes et prérequis
3. Démarrer le projet
4. Variables d'environnement
5. Base de données
6. Catalogue : taxonomie, fiches produit, photos
7. Sourcing chez CJdropshipping
8. Prix et marges
9. Pages et composants du site
10. Paiement, commande fournisseur, suivi
11. Trésorerie à zéro capital (important)
12. Avis clients et administration
13. Chatbot conseiller
14. SEO technique et données structurées
15. Flux produits et plateformes (Google, Meta, Pinterest)
16. Automatisations (routine quotidienne)
17. Méthode de travail : Git, PR, déploiement
18. Plan de lancement pas à pas
19. Pièges et leçons apprises
20. Consignes prêtes à copier pour Claude
21. Annexes (extraits de code, glossaire)

---

## 0. Comment utiliser ce guide

**Pour créer une autre boutique sur un autre sujet**, remplacez ces variables partout :

| Variable | Exemple Maison Bien-Être | À définir pour la nouvelle boutique |
|---|---|---|
| `{{NOM_BOUTIQUE}}` | Maison Bien-Être | … |
| `{{SOUS_TITRE}}` | par : What else by Vinc | … |
| `{{DOMAINE}}` | home-wellness.whatelsebyvinc.com | … |
| `{{EMAIL_CONTACT}}` | contact@… | … |
| `{{THEME}}` | décoration et bien-être pour la maison | … |
| `{{CATEGORIES}}` | `decoration` (Maison), `bien-etre` | 2 catégories maximum au départ |
| `{{PAYS_LIVRES}}` | FR, BE, CH, LU | … |
| `{{DELAI}}` | 7 à 20 jours ouvrés | selon la route CJ choisie |
| `{{MARGE_MINI}}` | 35 % du prix TTC | … |
| `{{PRIX_MINI}}` | 12,90 € | … |

**Ordre conseillé** : lire les sections 1 à 8 (les règles du jeu), faire le plan de lancement (section 18),
puis donner à Claude la consigne de départ (section 20).

**Ce que Claude peut faire seul / ce que vous devez faire vous-même**

| Vous (obligatoire) | Claude |
|---|---|
| Créer les comptes (Vercel, Neon, Stripe, CJ, GitHub, Google, Meta, Pinterest) et accepter leurs conditions | Écrire tout le code, les pages, les textes, les scripts |
| Saisir vous-même les mots de passe, clés et jetons dans les bons outils | Lire les clés dans les fichiers locaux sans jamais les afficher |
| Recharger le solde CJ avec l'argent des ventes | Créer les commandes, relancer, alerter |
| Valider les fusions de PR et les opérations à risque (production, argent réel) | Préparer les PR, vérifier, tester en local |
| Renseigner les informations légales (SIRET, adresse, régime de TVA) | Rédiger les pages légales à adapter |

---

## 1. Vue d'ensemble et architecture

### 1.1 Principe de la boutique

Le client commande sur **votre site**, paie par **Stripe**. Le site transmet **automatiquement** la commande au
fournisseur **CJdropshipping (CJ)**, qui expédie directement au client (vous ne stockez rien). Vous touchez la
différence entre le prix de vente et le coût CJ.

```
Visiteur ─▶ Site Next.js (Vercel) ─▶ Stripe Checkout ─▶ paiement
                 │                              │
                 │                  webhook checkout.session.completed
                 ▼                              ▼
         Neon Postgres ◀── enregistre la commande (idempotent)
                                                │
                                   CJ API : créer la commande ─▶ payer sur le solde CJ
                                                │
                       cron quotidien : relance, suivi, numéro de colis
                                                │
                               alertes Slack (erreurs, commande à payer, nouvel avis)
```

### 1.2 Stack

| Brique | Choix | Rôle |
|---|---|---|
| Framework | **Next.js 16** (App Router), React 19, TypeScript | Pages, API, SEO |
| Style | **Tailwind CSS 4**, thème sombre/clair automatique | Design |
| Base | **Neon** (Postgres serverless) via `@neondatabase/serverless` | Produits, commandes, avis |
| Hébergement | **Vercel** (déploiement auto à chaque push sur `main`, cron, analytics) | Production |
| Paiement | **Stripe Checkout** (mode live) | Encaissement |
| Fournisseur | **CJdropshipping** (API v2) | Stock, expédition |
| Mesure | `@vercel/analytics` | Visites |
| Alertes | Webhook entrant Slack | Notifications |
| Code | GitHub + GitHub Actions (CI) | Revue, tests |

### 1.3 Principes qui ont guidé toutes les décisions

1. **Zéro capital d'avance** : c'est l'argent du client qui paie le fournisseur (section 11).
2. **Honnêteté** : aucun faux avis, aucune promesse de santé, aucun « fabriqué en… » faux, délais donnés comme
   une moyenne et non une garantie.
3. **Tout est idempotent** : un événement rejoué (webhook, relance) ne crée jamais de doublon ni de double
   paiement.
4. **Le serveur ne fait jamais confiance au navigateur** : les prix sont relus en base au moment du paiement.
5. **Une modification = une PR** : petites, vérifiées, réversibles.
6. **Les règles sont écrites une seule fois** (livraison, retours, FAQ) puis réutilisées partout (pages légales,
   FAQ, chatbot, fiches produit, données structurées, Merchant Center).

---

## 2. Comptes et prérequis

À créer **par vous** (Claude ne crée pas de comptes et n'accepte pas de conditions à votre place) :

1. **GitHub** : un dépôt privé. Installer `git` et l'outil `gh` (GitHub CLI).
2. **Vercel** : importer le dépôt, activer le déploiement automatique sur `main`.
3. **Neon** : une base Postgres ; copier l'URL de connexion (variable `DATABASE_URL`).
4. **Stripe** : compte activé (identité, **compte bancaire pour les virements**), mode test d'abord puis live.
5. **CJdropshipping** : compte, **clé API** et jeton d'accès (`CJ_ACCESS_TOKEN`), IOSS (voir 10.4).
6. **Domaine** : un sous-domaine suffit (`boutique.mondomaine.fr`), relié à Vercel.
7. **Slack** (optionnel mais recommandé) : une application avec *Incoming Webhooks* pour les alertes.
8. **Google Merchant Center**, **Meta Commerce Manager**, **Pinterest Business** (catalogue) : voir section 15.
9. **Un compte bancaire professionnel** pour recevoir les virements Stripe (ex. Revolut Business).

Outils locaux : Node.js ≥ 20, npm, git, `gh`, Python (facultatif, pour les planches de photos), un navigateur.

**Informations légales à avoir sous la main** : raison sociale, SIRET, adresse, e-mail de contact, régime de TVA
(la formule de marge de ce guide suppose une boutique qui **collecte la TVA à 20 %** ; si vous êtes en franchise
en base de TVA, adaptez la formule section 8).

---

## 3. Démarrer le projet

### 3.1 Création

```bash
npx create-next-app@latest ma-boutique --ts --tailwind --app --eslint --src-dir
cd ma-boutique
npm i @neondatabase/serverless stripe @vercel/analytics
```

### 3.2 Particularité Next.js 16

Cette version a des **changements incompatibles** avec ce que les modèles d'IA connaissent. Le projet contient
un fichier `AGENTS.md` (réécrit par `next dev`) qui ordonne de lire `node_modules/next/dist/docs/` avant d'écrire
du code. Points rencontrés :

- `params` et `searchParams` des pages sont des **Promesses** (`const { slug } = await params`).
- `cookies()` de `next/headers` est **asynchrone**.
- Les mutations passent par des **Server Actions** (`"use server"`), sans route d'API dédiée.
- Pas de `middleware` utilisé : l'accès admin est vérifié dans les pages et les actions elles-mêmes.

### 3.3 Fichiers de consignes pour Claude

- `CLAUDE.md` : `@AGENTS.md` (importe les règles Next.js).
- Conserver à la racine un fichier de règles du projet (langue française, ne pas toucher aux secrets, une PR par
  changement…).

### 3.4 Arborescence finale (à reproduire)

```
src/
  app/
    layout.tsx  page.tsx  globals.css  sitemap.ts  robots.ts  not-found.tsx
    produits/[slug]/page.tsx            fiche produit
    categorie/[category]/page.tsx       page catégorie
    categorie/[category]/[subcategory]/page.tsx
    panier/  commande/succes/  commande/meta/   tunnel de commande
    suivi-commande/  faq/  livraison/  retours/  contact/  a-propos/
    mentions-legales/  cgv/  confidentialite/  guides/  guides/[slug]/
    flux/produits.xml/route.ts          flux produits Google/Meta/Pinterest
    admin/avis/  admin/commandes/       modération et commandes à payer
    api/checkout  api/webhooks/stripe  api/cron/supplier-sync
    api/order-status  api/avis  api/chat
  components/   ProductDetailV2, ProductGallery, StickyBuyBar, CategoryCards,
                RotatingImage, ProductGrid, ReviewForm, ChatWidget, JsonLd, SiteFooter…
  lib/          db, products, orders, reviews, fulfillment, cjdropshipping, stripe,
                alerts, admin-auth, delivery, faq, guides, product-sections, cart-context,
                chat/{engine,catalog}
sql/            schema.sql, ajustements/*.sql, routine/*.sql
vercel.json     cron quotidien
```

---

## 4. Variables d'environnement

À définir **localement** (`.env.local`, jamais commité) et **sur Vercel** (Settings → Environment Variables,
cocher Production, puis *Redeploy*).

| Variable | Rôle |
|---|---|
| `DATABASE_URL` | Connexion Neon (pooled) |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (`sk_test_…` en test, `sk_live_…` en production) |
| `STRIPE_WEBHOOK_SECRET` | Secret de signature du webhook Stripe |
| `CJ_ACCESS_TOKEN` | Jeton d'accès à l'API CJ |
| `CRON_SECRET` | Secret envoyé par Vercel Cron à `/api/cron/supplier-sync` |
| `NEXT_PUBLIC_SITE_URL` | URL publique (`https://{{DOMAINE}}`) |
| `ALERT_WEBHOOK_URL` | Webhook entrant Slack (facultatif mais conseillé) |
| `ADMIN_PASSWORD` | Mot de passe unique des écrans `/admin/*` (sans lui, l'admin est fermé) |

Règles : ne **jamais** coller une clé dans le chat ; stocker une copie locale hors du dépôt (ex.
`~/.claude/secrets/boutique.env`) ; vérifier qu'une clé `sk_live_` n'est en production que **volontairement**.

---

## 5. Base de données

### 5.1 Tables

```sql
create table if not exists products (
  id serial primary key,
  slug text not null unique,
  name text not null,
  description text not null default '',
  price_cents integer not null,
  currency text not null default 'EUR',
  image_url text,
  category text not null default 'ma-categorie',
  subcategory text,
  in_stock boolean not null default true,
  created_at timestamptz not null default now(),
  -- fournisseur
  supplier_url text,
  cj_product_id text, cj_variant_id text, cj_sku text,
  cj_from_country_code text not null default 'CN',
  cj_logistic_name text not null default 'CJPacket Ordinary',
  -- galerie de photos (tableau JSON d'URL, la 1re = image_url)
  images jsonb
);

create table if not exists orders (
  id serial primary key,
  stripe_checkout_session_id text not null unique,
  stripe_payment_intent_id text,
  status text not null default 'paid',
  mode text not null default 'test',             -- 'test' ou 'live'
  amount_total_cents integer not null,
  currency text not null default 'EUR',
  customer_email text, customer_phone text,
  shipping_address jsonb,
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id serial primary key,
  order_id integer not null references orders (id) on delete cascade,
  product_slug text, name text not null,
  unit_amount_cents integer not null, quantity integer not null,
  currency text not null default 'EUR'
);

create table if not exists supplier_orders (
  id serial primary key,
  order_id integer not null references orders (id) on delete cascade,
  provider text not null default 'cjdropshipping',
  provider_order_id text, order_number text,
  status text not null default 'pending',         -- pending | placed | shipped | failed
  tracking_number text,
  error_message text,                              -- aussi : « Paiement CJ en attente : … »
  is_sandbox boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reviews (
  id serial primary key,
  product_slug text not null,
  order_id integer not null references orders (id) on delete cascade,
  display_name text not null,
  rating smallint not null check (rating between 1 and 5),
  body text not null,
  status text not null default 'pending' check (status in ('pending','published','rejected')),
  created_at timestamptz not null default now(),
  unique (order_id, product_slug)
);
```

Index utiles : `products(category)`, `products(subcategory)`, `orders(mode)`, `order_items(order_id)`,
`supplier_orders(order_id)`, `reviews(product_slug, status)`.

### 5.2 Conventions de migration

- `sql/schema.sql` : schéma complet, **rejouable sans risque** (`create … if not exists`, `add column if not exists`).
- `sql/ajustements/AAAA-MM-JJ-sujet.sql` : chaque changement de données ou de structure, daté (prix, galeries,
  vagues de produits, nouvelles tables). Sert de **trace** dans Git.
- `sql/routine/AAAA-MM-JJ.sql` : trace des produits ajoutés par la routine quotidienne.
- Les écritures sur la base de production sont faites par scripts Node jetables (`node script.tmp.mjs`) qui lisent
  `DATABASE_URL` dans le fichier de secrets, **n'affichent jamais** les valeurs, et sont **supprimés** après usage.
- Toute insertion de produit utilise `on conflict (slug) do nothing` et des paramètres (`$1…`), jamais de
  concaténation.

### 5.3 Accès à la base (extrait)

```ts
// src/lib/db.ts : client instancié à la première requête (le build ne casse pas sans DATABASE_URL)
import { neon } from "@neondatabase/serverless";
let cached: ReturnType<typeof neon> | null = null;
export function getSql() {
  if (!cached) {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
    cached = neon(process.env.DATABASE_URL);
  }
  return cached;
}
```

---

## 6. Catalogue : taxonomie, fiches produit, photos

### 6.1 Taxonomie

- **2 catégories** (champ `category`) : ici `decoration` (affichée « Maison ») et `bien-etre`.
- **Sous-catégories** (champ `subcategory`, 6 à 10 au total) : ici `halloween`, `noel`, `murs-textiles`,
  `objets-zen`, `art-de-la-table`, `massage-detente`, `soin-rituel`, `sommeil-repos`, `sport-posture`.
- Les libellés affichés sont dans `SUBCATEGORY_LABELS` et `CATEGORY_LABELS` (`src/lib/products.ts`).
  **Ajouter un libellé dans le code et le mettre en ligne AVANT d'insérer des produits** dans une nouvelle
  sous-catégorie, sinon le site affiche le slug brut (« art-de-la-table »).
- Les sous-catégories saisonnières ont des **dates limites** (ex. Halloween jusqu'au 17 octobre, Noël du 1er
  octobre au 10 décembre) : après, on n'y ajoute plus de produits.

### 6.2 Format d'une fiche produit (strict, parsé par le site)

Le champ `description` suit **toujours** ce format, car le gabarit de page le découpe automatiquement :

```
Une phrase d'accroche (ce que c'est, pour quel usage).

Ce que vous obtenez :
• 4 puces factuelles (dimensions, matière, contenu, mode d'alimentation si CJ le précise)

Une phrase d'usage (où et comment s'en servir).
```

Règles de rédaction :

1. Français soigné, ton chaleureux, **uniquement des faits** présents dans la fiche CJ ou visibles sur la photo.
2. **Aucune allégation de santé** (« soulage », « guérit »…), aucune marque, aucun nom de licence.
3. Dimensions, matériaux, « fonctionne sur piles » **seulement s'ils figurent chez CJ**.
4. Si la photo montre d'autres modèles que celui vendu : ajouter une puce « Vendu à l'unité (modèle X ; les autres
   modèles visibles ne sont pas inclus) ».
5. Nom court et clair, avec la matière ou le format entre parenthèses ; `slug` en kebab-case sans accents,
   **unique**.

Le gabarit de page lit : accroche → paragraphe d'introduction ; puces → cartes « Ce que vous obtenez » ; phrase
d'usage → section dépliable « Utilisation » (`parseDescription` dans `src/lib/product-sections.ts`).

### 6.3 Photos

- `image_url` : la photo principale (celle de la **variante vendue**).
- `images` (jsonb) : galerie de 2 à 4 photos **de la même variante**, la première = `image_url`. Vide = une seule
  photo.
- Domaines d'images autorisés dans `next.config.ts` (`images.remotePatterns`) : ceux de CJ.
- **Critères de rejet** d'une photo : texte publicitaire superposé, cotes ou dimensions écrites, filigrane, logo
  d'une autre marque, autres couleurs ou variantes côte à côte, rendu IA qui ne correspond pas au vrai produit.
  Les photos avec cotes sont acceptables **en dernière position** de la galerie.

**Méthode de revue (très efficace)** : pour chaque produit candidat, construire une **planche contact** (une image
avec toutes les photos numérotées : `V:` = photos des variantes, `P` = photos du produit) avec Python/Pillow,
l'ouvrir et choisir à l'œil. 3 produits par planche, 140 px par vignette.

---

## 7. Sourcing chez CJdropshipping

### 7.1 Aide-mémoire de l'API (v2)

Base : `https://developers.cjdropshipping.com/api2.0`. En-tête : `CJ-Access-Token: <jeton>`.
**Limite : 1 appel par seconde** (erreur `1600200`) → attendre ~1,6 s entre deux appels et réessayer 3 fois.

| Usage | Méthode et chemin |
|---|---|
| Recherche | `GET /v1/product/listV2?keyWord=<mots anglais>&size=20` → `data.content[0].productList` (`id`, `nameEn`, `sellPrice`, `warehouseInventoryNum`, `listedNum`) |
| Détail | `GET /v1/product/query?pid=<id>` → variantes (`vid`, `variantKey`, `variantSellPrice`, `variantWeight`, `variantImage`, `variantSku`), `productImage`, `materialNameEn` |
| Livraison | `POST /v1/logistic/freightCalculate` `{"startCountryCode":"CN","endCountryCode":"FR","products":[{"quantity":1,"vid":"…"}]}` → `logisticName`, `logisticPrice`, `totalPostageFee`, `logisticAging` |
| Créer une commande | `POST /v1/shopping/order/createOrderV3` (champ `isSandbox` 1/0 ; `iossType: 3` pour l'IOSS CJ) |
| Détail commande | `GET /v1/shopping/order/getOrderDetail?orderId=…` (statut, numéro de suivi) |
| Payer une commande | `POST /v1/shopping/pay/payBalance` `{"orderId":"…"}` (solde du portefeuille CJ) |
| Solde | `GET /v1/shopping/pay/getBalance` |
| Ajouter à « My Products » | `POST /v1/product/addToMyProduct` `{"productId":"…"}` (code `100002` = déjà ajouté) |
| Liste « My Products » | `GET /v1/product/myProduct/query?pageNum=1&pageSize=20` |

Notes apprises :

- Les produits ajoutés par API n'apparaissent **pas** automatiquement dans « My Products » côté CJ : il faut
  l'appel `addToMyProduct` (l'affichage a quelques secondes de retard).
- Le navigateur automatisé est bloqué par la vérification « je ne suis pas un robot » du site CJ : tout passe par
  l'API.
- Les **commandes sandbox** ne peuvent pas être payées par `payBalance` (« Order not found ») : le premier
  paiement réel est la vraie validation.

### 7.2 Critères d'éligibilité d'un produit

1. Absent de la base (ni même `cj_product_id`, ni même `slug`).
2. **Stock** > 100 (champ `warehouseInventoryNum`), produit listé par d'autres vendeurs (`listedNum` > 0).
3. Pas de marque ni de licence, pas de produit médical ou thérapeutique, pas pour adultes, pas d'arme, pas de
   liquide dangereux, pas de cosmétique ingérable.
4. Photo principale propre (voir 6.3).
5. Une route de livraison **livrée en 15 jours maximum** (11 jours pour une fête proche : Halloween, dix derniers
   jours avant Noël).
6. Marge ≥ seuil au prix de vente final (section 8).
7. Éviter les articles fragiles et lourds (vases en céramique, verre) : le transport mange la marge.

### 7.3 Recherche efficace

1. Lister 15 à 20 mots-clés **en anglais** (ex. `christmas table runner`, `woven placemat`, `candle holder`).
2. Interroger `listV2` pour chacun, **exclure** les produits déjà en base, filtrer le bruit (bijoux, vêtements,
   animaux…).
3. Garder une quinzaine de pistes, récupérer le détail, générer les planches de photos, choisir.
4. Calculer livraison et prix pour la **variante précise** vendue (la plus petite ou la plus légère qui a du
   sens) ; écarter ce qui impose un prix trop élevé (> 35 € pour de la petite décoration).
5. **S'arrêter** quand il n'y a plus de bon produit : mieux vaut 7 bons produits que 10 moyens.

---

## 8. Prix et marges

### 8.1 Formule de marge nette (validée sur des commandes réelles de coûts CJ)

```
net = P / 1,2                      (retire la TVA à 20 %)
    − (0,015 × P + 0,25)           (frais Stripe : 1,5 % + 0,25 €)
    − (prix_de_gros_USD + totalPostageFee_USD) × 0,86     (coût CJ converti en euros)
```

- **P** = prix de vente TTC en euros.
- **`totalPostageFee`** est ce que CJ facture réellement ; **ne pas utiliser `logisticPrice`** (sous-estime les
  frais et fausse tous les calculs : c'est une erreur commise puis corrigée).
- Le taux 0,86 correspond à un taux dollar → euro prudent ; à ajuster.
- Si vous êtes **en franchise de TVA**, remplacez `P / 1,2` par `P`.

### 8.2 Règles de prix

- Prix TTC terminés par **,90** (ex. 17,90 €), **minimum 12,90 €**.
- **Marge nette ≥ 35 % du prix TTC** (le prix se calcule à partir de la marge, pas l'inverse).
- La livraison est **offerte** : son coût est donc dans le prix.
- Un prix se modifie par une instruction SQL **gardée** : `update products set price_cents = NEW where slug = 'x' and price_cents = OLD`.

### 8.3 Ce que ça donne (ordre de grandeur)

| Prix de vente | Coût CJ total (gros + port) | Marge nette |
|---|---|---|
| 14,90 € | ≈ 7,7 $ | ≈ 5,3 € (36 %) |
| 17,90 € | ≈ 9,0 $ | ≈ 6,6 € (37 %) |
| 21,90 € | ≈ 11,3 $ | ≈ 7,7 € (35 %) |
| 32,90 € | ≈ 17,6 $ | ≈ 11,6 € (35 %) |

Baisser un prix de 1 € TTC retire environ 0,82 € de marge (TVA et frais) : une baisse de 10 % exige ≈ 28 % de
commandes en plus pour rester à égalité. **On ne baisse pas les prix sans données de trafic** (voir section 19).

### 8.4 Audits

Faire un audit global (fichier CSV : prix, coût total, marge, route) à chaque grosse vague, et surtout quand les
frais de port CJ changent. Les produits sous 20 % de marge réelle sont remontés en prix.

---

## 9. Pages et composants du site

### 9.1 Pages

| Page | Contenu |
|---|---|
| `/` | Bannière compacte (titre, 2 boutons, 3 garanties), « Choisissez votre univers » (2 grandes cartes), « Explorer par thème » (une carte par sous-catégorie), « Nouveautés » (4 derniers produits en stock), catalogue groupé par sous-catégorie, « Guides et idées », bloc garanties |
| `/categorie/[c]` et `/categorie/[c]/[s]` | Liste filtrée, titre, canonique |
| `/produits/[slug]` | Fiche produit (gabarit V2, voir 9.3) |
| `/panier` | Panier (stocké dans le navigateur : `localStorage`, clé du projet) |
| `/commande/succes` | Confirmation, numéro de commande |
| `/commande/meta` | Pont pour Meta/Instagram/Facebook : lit `?products=slug:qty,…`, remplit le panier et redirige ; affiche aussi un **résumé rendu côté serveur** pour les robots sans JavaScript |
| `/suivi-commande` | Numéro de commande + e-mail → statut et numéro de colis |
| `/livraison`, `/retours`, `/faq`, `/contact`, `/a-propos` | Pages d'information, sources des règles |
| `/mentions-legales`, `/cgv`, `/confidentialite` | Pages légales (à faire relire) |
| `/guides`, `/guides/[slug]` | 3 articles de fond (idées cadeaux, décoration de saison, coin détente) avec produits de la base |
| `/admin/avis`, `/admin/commandes` | Modération, commandes à payer |
| `/flux/produits.xml` | Flux produits |
| `/sitemap.xml`, `/robots.txt` | Référencement (`/admin` interdit) |

### 9.2 Design

- Tailwind 4, **palette `stone`** + accent `amber`, **thème sombre automatique** (`prefers-color-scheme`),
  titres en police à empattement (`font-serif`), corps en Arial/Geist, sous-titre du logo en police manuscrite
  (Caveat).
- Cartes : `rounded-xl border`, ombres légères au survol ; images `object-cover` ; boutons en pilule.
- Mobile d'abord : une colonne, barre d'achat fixe en bas sur la fiche produit.
- Accessibilité : `aria-label` sur les boutons-icônes, ordre logique, `prefers-reduced-motion` respecté pour
  le défilement des images.

### 9.3 Gabarit de la fiche produit (V2)

De haut en bas : bandeau « Livraison offerte · Retours sous 14 jours » → galerie (photo carrée, miniatures,
flèches) → fil d'Ariane (catégorie · sous-catégorie) → titre → **note et lien vers les avis** → prix → accroche →
**« Ce que vous obtenez »** (cartes) → encadré **livraison estimée** (dates calculées, jamais une promesse) →
bouton d'achat → 4 pictogrammes de confiance → sections dépliables (Utilisation, Livraison et retours, Questions
fréquentes) → avis clients et formulaire → produits associés. Sur mobile, une **barre d'achat fixe** n'apparaît
que lorsque le gros bouton sort de l'écran, et la bulle de chat se décale au-dessus.

**Estimation de livraison** (`src/lib/delivery.ts`) : jours ouvrés ajoutés à la date du jour (7 à 20 ici) ;
avertissement honnête pour un article de saison dont la fin de fourchette dépasse la date de la fête.

### 9.4 Encarts de catégories animés

`RotatingImage` : fondu enchaîné toutes les 4 à 6 secondes entre les photos principales des produits en stock de
la catégorie (12 maximum), **décalé** d'un encart à l'autre, avec préchargement de la photo suivante, mise en
pause si l'onglet est masqué ou si le visiteur préfère moins d'animations.

### 9.5 Pages légales : ce qu'il faut y mettre

- **Livraison** : pays livrés, **délais présentés comme une moyenne**, colis multiples possibles, suivi, contact
  en cas de problème.
- **Retours** : **14 jours** de rétractation sans motif, état des articles (neufs ou légèrement utilisés), frais
  de retour à la charge du client sauf produit défectueux ou non conforme, **pas d'échange** (tout retour accepté
  est remboursé), remboursement sous 14 jours après réception.
- **CGV**, **mentions légales** (éditeur, hébergeur, contact), **confidentialité** (données collectées : e-mail,
  adresse, téléphone ; sous-traitants : Stripe, CJ, hébergeur ; durée de conservation ; droits RGPD).
- Ce guide ne remplace pas un avis juridique : faire relire ces pages.

La règle de chaque sujet est écrite **une seule fois** (page + `src/lib/faq.ts`) et les autres endroits (chatbot,
données structurées, Merchant Center, onglets de la fiche) la reprennent mot pour mot.

---

## 10. Paiement, commande fournisseur, suivi

### 10.1 Paiement (Stripe Checkout)

`POST /api/checkout` :

1. Reçoit seulement `{ slug, quantity }` par article.
2. **Relit prix et disponibilité en base** (jamais ceux du navigateur) ; quantité bornée de 1 à 99.
3. Crée une session `mode: "payment"` avec `shipping_address_collection` (pays livrés) et
   `phone_number_collection` activé (**le téléphone est exigé par CJ**).
4. Renvoie l'URL Stripe ; succès → `/commande/succes?session_id=…`, annulation → `/panier`.

### 10.2 Webhook Stripe

`POST /api/webhooks/stripe`, événement `checkout.session.completed` :

- Vérifier la **signature** sur le **corps brut** (`request.text()`), jamais sur du JSON déjà parsé.
- `mode = event.livemode ? "live" : "test"` : l'ordre en mode test ne déclenche que des commandes **sandbox**
  chez CJ.
- Enregistrer la commande et ses lignes **en une seule instruction SQL** (atomique), puis `fulfillOrder`.
- En cas d'erreur : alerte Slack et réponse **500** → Stripe rejoue l'événement ; tout est idempotent.

### 10.3 Commande fournisseur (`src/lib/fulfillment.ts`)

1. Charger la commande ; refuser proprement si l'adresse ou un produit manque (alerte + ligne `failed`).
2. **Regrouper les articles par route logistique** (pays d'expédition + `cj_logistic_name`) : un groupe = une
   commande CJ, avec un `orderNumber` stable (`<base>` ou `<base>-N`) pour l'idempotence.
3. `createOrderV3` avec l'adresse du client, `iossType: 3`, `isSandbox` selon le mode.
4. Enregistrer la ligne `supplier_orders` (`placed`, avec `provider_order_id`).
5. **Payer la commande** sur le solde CJ (`payBalance`). Si le paiement échoue (solde insuffisant), la commande
   reste « à payer » : `error_message = "Paiement CJ en attente : …"`, **une seule** alerte Slack par motif avec le
   montant à régler.
6. En cas d'échec de création : ligne `failed` + alerte, reprise par le cron.

### 10.4 TVA et IOSS

Pour les petits colis expédiés hors UE, la TVA à l'import est gérée avec l'**IOSS** : CJ propose son propre numéro
(`iossType: 3`, `iossNumber: "CJ-IOSS"`). À vérifier dans votre compte CJ et avec un comptable.

### 10.5 Tâche quotidienne (`/api/cron/supplier-sync`, `vercel.json`, 7 h)

Protégée par `Authorization: Bearer $CRON_SECRET`. Trois étapes :
`retryUnfulfilledOrders` (relance les commandes non transmises) → `payPendingSupplierOrders` (retente les
paiements en attente) → `syncTracking` (met à jour statut et numéro de suivi, passe la commande en `shipped`).
Le plan gratuit de Vercel ne permet qu'**un cron par jour**.

### 10.6 Suivi côté client

`/suivi-commande` : numéro de commande **et** e-mail doivent correspondre (sinon rien n'est montré). Statuts
affichés : en attente, transmise au fournisseur, expédiée (avec numéro de suivi), problème (« notre équipe a été
notifiée »).

---

## 11. Trésorerie à zéro capital (important)

C'est le point le plus mal compris au départ : **CJ ne livre qu'une commande payée**, et son solde est à 0 € si
vous n'y mettez rien.

**Principe** : l'argent du client paie CJ. Parcours d'une vente :

1. Le client paie par Stripe (ex. 17,90 €). L'argent est chez Stripe.
2. Le site crée la commande CJ et tente de la payer : le solde est à 0 → échec géré, **alerte Slack** avec le
   montant exact à régler.
3. Stripe verse l'argent sur votre compte bancaire (virements **automatiques quotidiens**, après un délai de
   quelques jours pour un compte neuf).
4. Vous rechargez le portefeuille CJ du montant de la commande **avec l'argent du client** (carte ou PayPal).
5. Vous ouvrez `/admin/commandes` et cliquez **Payer maintenant** (ou attendez le cron de 7 h) : CJ expédie.

**Conséquence** : pour la toute première vente, l'expédition est retardée de quelques jours (le temps du premier
virement). Ensuite, un petit solde CJ alimenté par les ventes précédentes finance les suivantes.

**Ce qui n'est pas automatisable** (vérifié) : le virement Revolut → CJ. Le portefeuille CJ n'accepte l'argent que
par Payoneer, virement bancaire (minimum 2 000 $) ou carte/PayPal dans son interface ; l'API Revolut Business
existe mais CJ n'a pas d'entrée pour recevoir un virement automatique. Un virement mensuel automatique ≥ 2 000 $
deviendra possible quand le volume le justifiera.

Avant le premier client : vérifier le solde CJ, faire **une vraie petite commande** vous-même (produit peu cher,
livré chez vous) pour valider le circuit complet, puis la rembourser dans Stripe si besoin.

---

## 12. Avis clients et administration

### 12.1 Avis vérifiés

- Table `reviews` ; **un avis par produit et par commande**.
- Dépôt par `POST /api/avis` avec numéro de commande + e-mail + produit : le serveur vérifie que la commande
  existe, que l'e-mail correspond et que le produit y figure. Champ piège (honeypot) contre les robots.
- Tout avis arrive en **`pending`** ; rien n'est visible avant validation.
- La note moyenne et les avis ne sont ajoutés aux **données structurées** que s'il existe au moins un avis publié.
- Alerte Slack à chaque nouvel avis à modérer.

### 12.2 Écrans d'administration

- Un seul mot de passe (`ADMIN_PASSWORD`). Cookie `httpOnly`, `sameSite=strict`, 8 heures, limité au chemin
  `/admin`. Comparaison à temps constant, **1 seconde d'attente** après un mauvais mot de passe.
- Les Server Actions revérifient la session avant d'agir.
- `/admin/avis` : avis en attente / traités, boutons Publier, Rejeter, Remettre en attente.
- `/admin/commandes` : solde CJ, commandes créées mais non payées, bouton **Payer maintenant**.
- Pages en `noindex`, `/admin` interdit dans `robots.txt`.

---

## 13. Chatbot conseiller

Un widget « Une question ? » **sans modèle de langage payant** : un moteur à règles (`src/lib/chat/engine.ts`) qui :

- reconnaît des intentions (livraison, retours, paiement, contact, suivi de commande, salutations) et répond avec
  les textes officiels ;
- cherche des produits dans le catalogue par besoin (« pour mieux dormir », « massage »…) et renvoie des cartes ;
- suit une commande si on lui donne le numéro et l'e-mail ;
- propose des suggestions de questions ; **reste dans le périmètre** et renvoie vers l'e-mail sinon.

Avantage : coût nul, réponses prévisibles, aucune promesse inventée. Limite : il ne comprend pas tout ; la réponse
de repli oriente vers le contact.

---

## 14. SEO technique et données structurées

### 14.1 Métadonnées

- Un `<title>` **avec mot-clé** par page (l'accueil : « {{NOM_BOUTIQUE}} — {{THEME}} »), une `description` de
  120 à 160 caractères, une URL **canonique**, Open Graph.
- Une seule balise `<h1>` par page.

### 14.2 JSON-LD

| Où | Type |
|---|---|
| Accueil | `Organization`, `WebSite` |
| Fiche produit | `Product` (nom, description, **galerie d'images**, marque, `Offer`), `BreadcrumbList` |
| Offre | `OfferShippingDetails` (livraison **offerte**, pays livrés), `MerchantReturnPolicy` (14 jours, par envoi postal, frais à la charge du client) ; **pas de délai structuré** si le format ne rend pas fidèlement « jours ouvrés » |
| Avis | `AggregateRating` + `Review` **uniquement s'il existe de vrais avis publiés** |
| FAQ | `FAQPage` |
| Guides | `Article` |

### 14.3 Sitemap et robots

`sitemap.ts` : pages fixes + catégories + sous-catégories + produits + guides. `robots.ts` : tout autoriser sauf
`/admin`, référencer le sitemap.

### 14.4 Contenu

Trois guides de fond liés aux produits, sans allégation de santé ; chaque sujet de saison (fêtes, rentrée) peut
avoir son guide. Le contenu met des mois à produire du trafic : il faut le faire tôt.

---

## 15. Flux produits et plateformes

### 15.1 Flux `/flux/produits.xml`

Format Google (RSS 2.0, espace de noms `g:`), accepté tel quel par Google, Meta et Pinterest. Par produit :
`g:id` (le slug), `title`, `description`, `link`, `g:image_link`, **`g:additional_image_link`** (galerie, jusqu'à
10, sans doublon), `g:availability`, `g:price` (« 17.90 EUR »), `g:condition`, `g:brand`,
`g:identifier_exists = no`, `g:google_product_category`, `g:product_type`. Mise en cache courte
(`s-maxage=300`) pour refléter la base à quelques minutes près. Les frais de livraison et la TVA se règlent
dans **chaque compte plateforme**, pas dans le flux.

### 15.2 Google Merchant Center

Réglages à faire (une fois) :

1. Ajouter le flux comme source de données (récupération planifiée + bouton « Mettre à jour » pour forcer).
2. **Pays** : Paramètres → Infos sur l'entreprise → Pays : ajouter chaque pays livré, puis « Ajouter tous les
   produits ».
3. **Conditions de livraison** (Livraison et retours) : un service par pays, livraison offerte, **délai de
   traitement 1 à 3 jours + acheminement 6 à 17 jours = total 7 à 20 jours ouvrés** ; **corriger le fuseau
   horaire** (le défaut est la côte ouest des États-Unis).
4. **Conditions de retour** (onglet Conditions de retour) : une règle par pays, reprenant **exactement** la page
   Retours. Attention aux valeurs par défaut : « échanges acceptés » → mettre **Non** ; « neufs uniquement » →
   « neufs et légèrement utilisés » ; étiquette « à la charge du client » ; cocher la confirmation de conformité
   avec le site (la vérifier réellement).
5. **Service client** : page contact, e-mail, cocher le chatbot (et **pas** le chat en direct s'il n'existe pas).
6. Facultatif : module Promotions (livraison offerte déjà affichée par les conditions de livraison),
   *Google Avis clients* (envoie des enquêtes à vos clients), amélioration automatique des images (déconseillée).

Lire les statuts : « Approuvé » vs **« limité »** = éligible aux fiches gratuites uniquement (normal sans
publicité). Un nouveau magasin n'apparaît dans Google qu'après **plusieurs semaines** : zéro clic au début est
normal.

### 15.3 Meta (Facebook / Instagram)

- Catalogue alimenté par le flux (import quotidien automatique, vers 18 h ; le bouton « Actualiser » n'importe
  pas).
- **URL de paiement** : `https://{{DOMAINE}}/commande/meta?products=<slug>:<qte>,…` (la page remplit le panier et
  redirige ; son résumé rendu côté serveur évite l'avertissement « panier vide » du robot de vérification).

### 15.4 Pinterest

- Catalogue alimenté par le flux (ingestion quotidienne vers 3 h) ; revendication du domaine par balise
  `p:domain_verify` dans `layout.tsx`.

### 15.5 À prévoir en plus

Google Search Console (soumettre le sitemap), un compte analytics (Vercel Analytics est installé ; ses
événements personnalisés sont réservés à l'offre Pro, donc pas d'entonnoir « ajout au panier » sur l'offre
gratuite).

---

## 16. Automatisations (routine quotidienne)

Une tâche planifiée Claude Code (l'application doit être ouverte) exécute chaque jour à 7 h :

1. **Choisir** une sous-catégorie par catégorie (la moins fournie ; les saisonnières en saison).
2. **Chercher** chez CJ un produit éligible par catégorie (section 7).
3. **Contrôler** la photo (téléchargée et regardée), la livraison, le prix et la marge.
4. **Rédiger** la fiche (format 6.2) et **insérer** en base (galerie comprise), puis **ajouter à « My Products »**.
5. **Tracer** dans `sql/routine/AAAA-MM-JJ.sql`, ouvrir une PR (et la fusionner seule si elle ne modifie que ce
   fichier).
6. **Forcer** la récupération du flux chez Google ; **constater** l'état de Meta et Pinterest.
7. **Rendre compte** : produits, prix, marge en € et %, route, lien de la PR, anomalies.

### 16.1 Règles pour qu'une routine tourne sans demander d'autorisations

- Chaque forme de commande **nouvelle** déclenche une demande d'approbation : utiliser des **scripts à noms
  constants** (`cj.mjs`, `q.mjs`, `ins.mjs`) et passer les paramètres en arguments ou dans un fichier JSON,
  jamais d'autres commandes ad hoc.
- Le prompt de la routine doit être **entièrement autonome** (contexte, chemins, règles, secrets lus dans un
  fichier, jamais affichés).
- Interdits explicites : pas de `push --force`, pas de modification de produit existant, pas de passage de
  commande, pas de saisie de mot de passe, aucune fusion hors de la PR du jour.
- Un modèle réglé sur « auto » dans les variables d'environnement a fait échouer des exécutions (« model
  (auto) unavailable ») : fixer un modèle valide.
- Le mode de permission de la routine se règle **dans l'application**, sur la routine elle-même (pas depuis la
  conversation).

---

## 17. Méthode de travail : Git, PR, déploiement

- **Une PR par changement**, depuis `origin/main` à jour : `git checkout -b claude/<sujet> origin/main`.
- Messages de commit en français, terminés par la ligne de co-autorat de Claude ; PR avec un corps clair
  (quoi, pourquoi, vérifié comment) terminé par la signature de génération.
- **CI GitHub Actions** (`npm run build` + lint + types) verte avant fusion ; Vercel crée une **prévisualisation**
  par PR.
- Avant de proposer une PR : `npx tsc --noEmit` et `npx eslint` propres, **page testée en local**
  (serveur de dev, capture d'écran en largeur ordinateur ET mobile).
- **Fusion** : `gh pr merge N --merge` après accord. Les actions à enjeu réel (paiement automatique chez le
  fournisseur, écriture en base de production non autorisée, déploiement) sont **toujours** soumises à une
  validation explicite.
- Les **écritures en base de production** (vagues de produits, galeries) sont faites **avant** la PR de trace
  SQL ; la PR de trace ne change rien au site.
- Un worktree par session (`.claude/worktrees/…`), fichiers temporaires (`*.tmp.mjs`) **supprimés** après usage,
  jamais commités.
- Avertissements « LF will be replaced by CRLF » sous Windows : sans conséquence ; les scripts de modification
  de fichiers doivent normaliser `\r\n` avant de remplacer du texte.

---

## 18. Plan de lancement pas à pas

### Phase 0 — Cadrage (½ journée)
- Choisir le **sujet** et 2 catégories ; vérifier qu'il existe 40+ produits CJ éligibles avec marge ≥ 35 %.
- Nom, domaine, e-mail de contact, pays livrés, délai moyen.

### Phase 1 — Fondations (1 jour)
1. Dépôt GitHub, projet Next.js, Vercel relié, Neon créé, variables d'environnement.
2. `schema.sql` rejoué ; page d'accueil vide qui s'affiche en production.

### Phase 2 — Catalogue (1 à 2 jours)
1. Taxonomie (catégories, sous-catégories, libellés).
2. **Première vague de 20 à 30 produits** (section 7), prix calculés (section 8), photos choisies, fiches écrites.
3. Gabarit de fiche produit, pages catégories, accueil.

### Phase 3 — Tunnel d'achat en mode TEST (1 jour)
1. Panier, `/api/checkout`, webhook (clé de test), `fulfillOrder` en **sandbox**, suivi de commande.
2. Faire plusieurs commandes de test ; vérifier base, alertes, pages.

### Phase 4 — Confiance et légal (1 jour)
Pages Livraison, Retours, FAQ, CGV, mentions légales, confidentialité, contact, à-propos ; données structurées ;
sitemap ; avis clients (table + admin).

### Phase 5 — Passage en réel (½ journée)
1. Clé Stripe **live**, webhook live, `STRIPE_WEBHOOK_SECRET` live, redéploiement.
2. Compte bancaire Stripe renseigné ; virements automatiques ; vérifier **le solde CJ**.
3. **Commande réelle de test** (produit peu cher livré chez vous), puis remboursement si besoin.

### Phase 6 — Visibilité (continu)
Flux Google/Meta/Pinterest, Merchant Center complet (pays, livraison, retours, service client), Search Console,
guides, routine quotidienne.

### Phase 7 — Pilotage (chaque semaine)
Regarder les impressions Google, les visites Vercel, les alertes Slack, les avis à modérer, les commandes à payer,
la marge ; ajuster le catalogue. **Mesurer avant de changer les prix.**

### Checklist de mise en production

- [ ] `STRIPE_SECRET_KEY` = `sk_live_…` volontairement, webhook live créé (événement `checkout.session.completed`)
- [ ] `ADMIN_PASSWORD`, `CRON_SECRET`, `ALERT_WEBHOOK_URL`, `NEXT_PUBLIC_SITE_URL` définis sur Vercel + redéployé
- [ ] Compte bancaire dans Stripe, virements quotidiens
- [ ] Solde CJ vérifié, procédure de recharge comprise
- [ ] Pages légales relues
- [ ] Commande réelle de test réussie, alerte Slack reçue sur téléphone
- [ ] Sitemap soumis, flux en cours d'import

---

## 19. Pièges et leçons apprises

1. **Ne pas confondre `logisticPrice` et `totalPostageFee`** : seul le second est facturé. Une marge calculée avec
   le premier est fausse (corrigée après audit, plusieurs prix remontés).
2. **Solde CJ à 0 = commande créée mais pas expédiée.** Le code doit **payer** la commande et alerter si le solde
   manque ; le sandbox ne permet pas de tester ce paiement.
3. **Ajouter un libellé de sous-catégorie dans le code et le déployer avant d'insérer les produits**, sinon le
   slug brut s'affiche.
4. **Le zéro clic Google des premières semaines est normal** ; le statut « limité » n'est pas un défaut. Corriger
   d'abord pays, livraison, retours, service client.
5. **Baisser les prix n'attire pas de trafic** : avec ~4 visiteurs par jour (en partie des robots), le prix n'est
   pas le problème. Mesurer d'abord.
6. **Les valeurs par défaut des formulaires de Merchant Center sont fausses pour vous** (fuseau horaire,
   échanges acceptés, état des produits) : tout relire.
7. **Un changement purement « invisible » (SEO, flux) ne se voit pas** : prévenir, et grouper avec un changement
   visible pour éviter la déception.
8. **Les galeries doivent montrer la variante vendue** ; si une photo montre plusieurs modèles, le préciser dans
   la fiche.
9. **Photos de CJ** : beaucoup ont du texte ou des cotes ; faire une revue visuelle systématique, ne jamais
   automatiser la sélection.
10. **Routines planifiées** : une commande de forme nouvelle = une demande d'autorisation qui bloque la nuit.
    Scripts à noms constants, prompt autonome, modèle fixe.
11. **Production et argent réel** : le contrôle de sécurité de Claude Code bloque (à raison) les fusions qui
    déclenchent des paiements réels, les modifications de la base de production non autorisées, la saisie de
    mots de passe. Prévoir ces validations dans le processus.
12. **Vercel gratuit** : un seul cron par jour ; analytics sans événements personnalisés.
13. **Copie des secrets** : la copie locale peut contenir des clés **de test** alors que la production est en
    réel ; vérifier dans Vercel, pas dans la copie.
14. **Le navigateur automatisé** est bloqué par certains sites (CJ) et lent sur d'autres (tableaux Google) ;
    préférer l'API, garder le volet du navigateur affiché, patienter.
15. **Les pages doivent tolérer une table absente** (avis avant migration) : `catch(() => [])`.
16. **Ne jamais coller un secret dans le chat** ; si une adresse de webhook apparaît dans un résultat d'outil, la
    révoquer et la recréer si cela gêne.
17. **Les remboursements et retours** coûtent : garder de la marge et une politique claire (frais à la charge du
    client, sauf défaut).

---

## 20. Consignes prêtes à copier pour Claude

### 20.1 Lancement d'un nouveau site

```
Je veux créer une boutique de dropshipping automatisée sur le sujet : {{THEME}}.
Reproduis fidèlement la méthode du fichier GUIDE-FABRICATION-BOUTIQUE.md.
Nom : {{NOM_BOUTIQUE}} — domaine : {{DOMAINE}} — pays livrés : {{PAYS_LIVRES}}.
Commence par la Phase 0 (cadrage) puis la Phase 1. Travaille par petites PR, teste en local
(types, lint, capture d'écran ordinateur et mobile), n'effectue AUCUNE action sur Stripe en mode
réel ni sur la base de production sans mon accord explicite, n'affiche jamais de secret, et
demande-moi seulement ce que toi seul ne peux pas faire (création de comptes, recharge du solde).
```

### 20.2 Nouvelle vague de produits

```
Ajoute environ {{N}} produits dans la sous-catégorie {{SOUS_CATEGORIE}} (thème : {{THEME_VAGUE}}).
Méthode : recherche CJ avec 15 à 20 mots-clés anglais en excluant ce qui est déjà en base ; détail et
planches de photos numérotées que tu regardes ; critères d'éligibilité de la section 7.2 ; livraison <= 15 jours
au coût total (totalPostageFee) ; prix ,90 minimum 12,90 € avec marge nette >= 35 % ; fiches au format 6.2 ;
galeries de photos de la variante vendue ; insertion en base ; ajout à « My Products » ; fichier de trace
sql/ajustements/ + PR. Arrête-toi plutôt que de forcer un produit médiocre. Si la sous-catégorie est nouvelle,
ajoute d'abord son libellé dans le code et mets-le en ligne avant l'insertion.
```

### 20.3 Audit de visibilité

```
Regarde les impressions et clics dans Google Merchant Center, les visites dans Vercel Analytics (pays, sources,
pages), l'état des produits (approuvés, limités, refusés) et ce qui manque (pays, livraison, retours, service
client). Conclus si le blocage est le trafic, la confiance ou le prix, sans modifier de réglage sans mon accord.
```

### 20.4 Vérification avant fusion

```
Pour la PR en cours : tsc et eslint propres, page testée en local (largeur ordinateur et mobile), aucun secret,
aucun fichier temporaire commité, description de PR claire. Dis-moi ce qui est vérifié et ce qui ne l'est pas.
```

---

## 21. Annexes

### 21.1 Fonction de prix (modèle)

```ts
// Marge nette en euros pour un prix TTC `price`, avec coût CJ total en dollars.
export function netMargin(price: number, wholesaleUsd: number, postageUsd: number): number {
  const cost = (wholesaleUsd + postageUsd) * 0.86;
  return price / 1.2 - (0.015 * price + 0.25) - cost;
}

// Plus petit prix en ,90 (minimum 12,90 €) qui donne >= 35 % de marge nette.
export function priceFor(wholesaleUsd: number, postageUsd: number, minMargin = 0.35): number {
  let p = 12.9;
  while (netMargin(p, wholesaleUsd, postageUsd) < minMargin * p) p = Math.round((p + 0.5) * 100) / 100;
  const cand = Math.ceil(p) - 0.1;
  return cand >= p ? cand : cand + 1;
}
```

### 21.2 Découpage d'une description

```ts
// Accroche, puces « • », phrase d'usage (voir src/lib/product-sections.ts).
export function parseDescription(description: string) {
  const blocks = description.replace(/\r\n/g, "\n").split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  const hook = blocks[0] ?? "";
  let benefits: string[] = [];
  let usage: string | null = null;
  for (const block of blocks.slice(1)) {
    const bullets = block.split("\n").map((l) => l.trim()).filter((l) => l.startsWith("•"));
    if (bullets.length) benefits = bullets.map((l) => l.replace(/^•\s*/, ""));
    else if (!usage) usage = block;
  }
  return { hook, benefits, usage };
}
```

### 21.3 Insertion d'un produit (modèle de requête)

```sql
insert into products (slug, name, description, price_cents, image_url, images, category, subcategory,
  supplier_url, cj_product_id, cj_variant_id, cj_sku, cj_logistic_name)
values ($1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9, $10, $11, $12, $13)
on conflict (slug) do nothing;
```

### 21.4 Élément de flux (modèle)

```xml
<item>
  <g:id>mon-produit</g:id>
  <title>Nom du produit</title>
  <description>Accroche…</description>
  <link>https://{{DOMAINE}}/produits/mon-produit</link>
  <g:image_link>https://…/photo-principale.jpg</g:image_link>
  <g:additional_image_link>https://…/photo-2.jpg</g:additional_image_link>
  <g:availability>in_stock</g:availability>
  <g:price>17.90 EUR</g:price>
  <g:condition>new</g:condition>
  <g:brand>{{NOM_BOUTIQUE}}</g:brand>
  <g:identifier_exists>no</g:identifier_exists>
  <g:google_product_category>696</g:google_product_category>
  <g:product_type>Maison &gt; Noël</g:product_type>
</item>
```

### 21.5 Glossaire

| Terme | Sens |
|---|---|
| Dropshipping | Vous vendez, le fournisseur expédie directement au client |
| CJ | CJdropshipping, fournisseur et plateforme d'expédition |
| Variante (`vid`) | Une déclinaison précise d'un produit (couleur, taille) |
| `totalPostageFee` | Frais de livraison réellement facturés par CJ |
| Sandbox | Commande fictive, sans argent ni envoi |
| Webhook | Appel automatique d'un service (Stripe) vers votre site |
| Idempotent | Rejouer l'opération ne change pas le résultat |
| Merchant Center | Outil Google qui reçoit le flux de produits |
| Flux produits | Fichier XML qui décrit le catalogue pour les plateformes |
| IOSS | Régime européen de TVA à l'import pour les petits colis |
| PR | *Pull request* : proposition de modification relue avant fusion |

### 21.6 Ordre de grandeur de l'effort (avec Claude)

| Bloc | Durée indicative |
|---|---|
| Fondations + catalogue + tunnel de test | 2 à 3 jours |
| Légal, SEO, avis, admin | 1 jour |
| Passage en réel et validation | ½ jour |
| Plateformes (Merchant Center, Meta, Pinterest) | 1 jour |
| Chaque nouvelle vague de 7 à 10 produits | 1 à 2 heures |

Coût fixe : 0 € d'avance côté fournisseur (le client finance), frais Stripe à la vente, hébergement gratuit au
départ (Vercel Hobby, Neon gratuit), nom de domaine.
