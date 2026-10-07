// Guides d'achat et d'inspiration publiés sur /guides. Le contenu est volontairement
// général (conseils d'usage, pas de promesse de santé) ; les produits affichés en bas
// de chaque guide sont lus en base d'après `products`, jamais écrits en dur.

export type GuideSection = { heading: string; paragraphs: string[] };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // AAAA-MM-JJ
  intro: string;
  sections: GuideSection[];
  productsHeading: string;
  // Sous-catégories dont on affiche les produits en stock, dans l'ordre.
  products: { category: string; subcategory: string }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "idees-cadeaux-noel-maison",
    title: "Idées cadeaux de Noël pour la maison : 6 pistes qui plaisent",
    description:
      "Lumières, textiles, petites déco à suspendre : comment choisir un cadeau de Noël pour la maison, selon la personne et le budget.",
    publishedAt: "2026-10-07",
    intro:
      "Offrir un objet pour la maison, c'est faire plaisir longtemps : il reste visible chaque hiver. Voici comment choisir sans se tromper, et sans y passer des heures.",
    sections: [
      {
        heading: "1. Une lumière douce, pour l'ambiance",
        paragraphs: [
          "Les lumières sont les cadeaux les plus faciles à réussir : elles transforment une pièce en quelques secondes. Une lanterne, un petit sapin lumineux ou un rideau d'anneaux lumineux apportent une ambiance de fête sans changer le reste de la décoration.",
          "Pensez aux modèles à LED : sans flamme, ils sont plus rassurants dans une maison avec des enfants ou des animaux.",
        ],
      },
      {
        heading: "2. Un objet à suspendre ou à remplir",
        paragraphs: [
          "Un calendrier de l'Avent en tissu, une chaussette à accrocher à la cheminée : ces objets se réutilisent chaque année et deviennent un rituel de famille. Le cadeau, c'est l'objet, mais aussi le moment que l'on passe à le remplir.",
        ],
      },
      {
        heading: "3. Une touche de textile",
        paragraphs: [
          "Un plaid, une housse de coussin ou une tenture donnent tout de suite un air d'hiver à un salon. C'est un cadeau passe-partout qui convient à presque tout le monde, surtout si vous ne connaissez pas bien les goûts de la personne.",
        ],
      },
      {
        heading: "4. Choisir selon la personne",
        paragraphs: [
          "Pour un proche qui aime décorer : une déco de table ou de cheminée. Pour quelqu'un qui reçoit souvent : des lumières et des objets à poser sur un buffet. Pour une famille avec des enfants : un calendrier de l'Avent ou une lampe-veilleuse sur le thème de Noël.",
        ],
      },
      {
        heading: "5. Fixer un budget par personne",
        paragraphs: [
          "Un cadeau de décoration se trouve facilement entre 15 et 30 €. Fixer un budget par personne avant de commencer évite les achats de dernière minute, et permet de grouper plusieurs petits cadeaux plutôt qu'un seul gros.",
        ],
      },
      {
        heading: "6. Commander tôt",
        paragraphs: [
          "Nos produits sont expédiés directement depuis nos entrepôts fournisseurs, avec un délai moyen de 7 à 20 jours ouvrés. Pour offrir à Noël, commandez de préférence dès le début du mois de décembre, voire en novembre : une commande passée trop tard ne pourra pas être livrée à temps. La livraison est offerte en France, en Belgique, en Suisse et au Luxembourg.",
        ],
      },
    ],
    productsHeading: "Notre sélection de Noël",
    products: [{ category: "decoration", subcategory: "noel" }],
  },
  {
    slug: "decoration-halloween-sans-flamme",
    title: "Décorer pour Halloween sans flamme : lumières, citrouilles et ambiance",
    description:
      "Comment réussir une décoration d'Halloween chaleureuse et sûre : lumières LED, citrouilles, squelettes, et astuces de placement.",
    publishedAt: "2026-10-07",
    intro:
      "Halloween se fête aussi bien avec de l'humour qu'avec des frissons. Voici comment composer une ambiance réussie, avec des lumières sans flamme, simples à installer et sans danger autour des enfants.",
    sections: [
      {
        heading: "Pourquoi choisir des bougies LED",
        paragraphs: [
          "Une vraie bougie dans une citrouille ou près d'un rideau, c'est un risque inutile. Les bougies et lumières à LED donnent le même effet vacillant, sans cire, sans fumée et sans risque de brûlure, ce qui les rend adaptées aux maisons avec de jeunes enfants.",
        ],
      },
      {
        heading: "Mixer le mignon et le macabre",
        paragraphs: [
          "Un décor d'Halloween plaît davantage quand il mélange les tons : un petit fantôme souriant à côté d'un crâne, une citrouille grimaçante près d'une main de squelette. Ce contraste fait sourire les enfants et plaît aussi aux adultes.",
        ],
      },
      {
        heading: "Où placer les lumières",
        paragraphs: [
          "Regroupez les objets en petits ensembles : une cheminée, un rebord de fenêtre, le centre d'une table ou le haut d'un buffet. Trois à cinq éléments de hauteurs différentes donnent plus d'effet qu'une rangée uniforme.",
          "Pour l'entrée, une lanterne ou une citrouille lumineuse sur une console ou un guéridon accueille les visiteurs du 31 octobre.",
        ],
      },
      {
        heading: "Des objets qui servent après Halloween",
        paragraphs: [
          "Certaines veilleuses en forme de citrouille ou de fantôme restent utiles toute l'année. En choisissant des objets réutilisables d'une année sur l'autre, vous évitez la décoration jetable.",
        ],
      },
      {
        heading: "Commander à temps",
        paragraphs: [
          "Le délai moyen de livraison est de 7 à 20 jours ouvrés. Pour décorer avant le 31 octobre, commandez le plus tôt possible : passé la mi-octobre, nous ne pouvons pas garantir que votre commande arrive à temps. La livraison est offerte en France, en Belgique, en Suisse et au Luxembourg.",
        ],
      },
    ],
    productsHeading: "Notre sélection d'Halloween",
    products: [{ category: "decoration", subcategory: "halloween" }],
  },
  {
    slug: "creer-un-coin-detente-chez-soi",
    title: "Créer un coin détente chez soi : lumière, textures et petits rituels",
    description:
      "Quelques idées simples pour aménager un coin calme à la maison : lumière douce, matières agréables et gestes du soir.",
    publishedAt: "2026-10-07",
    intro:
      "Il n'est pas nécessaire d'avoir une pièce entière : un fauteuil, une lumière et quelques objets bien choisis suffisent à créer un endroit où l'on se pose en fin de journée.",
    sections: [
      {
        heading: "Choisir l'endroit",
        paragraphs: [
          "Prenez un angle du salon, un coin de la chambre ou un fauteuil près d'une fenêtre. L'essentiel est qu'il soit un peu à l'écart de la télévision et du passage, pour que l'on s'y sente protégé.",
        ],
      },
      {
        heading: "Une lumière douce plutôt qu'un plafonnier",
        paragraphs: [
          "Une lumière chaude et basse change l'ambiance d'une pièce. Une veilleuse, une petite lampe d'appoint ou une guirlande suffit. Évitez les ampoules trop blanches dans ce coin : le but est de ralentir, pas d'éclairer comme un bureau.",
        ],
      },
      {
        heading: "Des matières agréables au toucher",
        paragraphs: [
          "Un plaid, un coussin avec une housse en lin ou en coton, une tenture au mur : les matières naturelles et douces donnent envie de s'installer. Quelques éléments suffisent, il vaut mieux peu et bien choisi que beaucoup.",
        ],
      },
      {
        heading: "Un petit rituel du soir",
        paragraphs: [
          "Le coin détente fonctionne mieux s'il est lié à un geste simple : une tisane, dix minutes de lecture, un moment de silence avant de dormir. Garder les écrans à distance de ce coin aide à en faire un vrai refuge.",
        ],
      },
      {
        heading: "Rester simple",
        paragraphs: [
          "Quelques objets bien placés valent mieux qu'un coin surchargé. Commencez par la lumière et un textile, puis ajoutez un objet à la fois, selon ce qui vous donne envie de vous y installer.",
        ],
      },
    ],
    productsHeading: "Pour votre coin détente",
    products: [
      { category: "bien-etre", subcategory: "sommeil-repos" },
      { category: "bien-etre", subcategory: "soin-rituel" },
      { category: "decoration", subcategory: "murs-textiles" },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}
