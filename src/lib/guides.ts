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
  {
    slug: "decoration-noel-petit-budget",
    title: "Décoration de Noël à petit budget : 8 idées sous 25 €",
    description:
      "Comment décorer sa maison pour Noël sans dépenser beaucoup : lumières LED, objets à suspendre, textiles et astuces pour choisir.",
    publishedAt: "2026-10-09",
    intro:
      "Une belle décoration de Noël ne demande pas un gros budget : quelques objets bien choisis, une lumière chaude et un peu d'organisation suffisent. Voici par où commencer.",
    sections: [
      {
        heading: "1. Commencer par la lumière",
        paragraphs: [
          "C'est l'élément qui change le plus l'ambiance pour le moins cher : une guirlande lumineuse, une lanterne à bougie LED ou un rideau lumineux à la fenêtre. Les modèles LED chauffent peu et évitent le risque lié à la flamme.",
        ],
      },
      {
        heading: "2. Miser sur de petits sapins",
        paragraphs: [
          "Pas la place pour un grand sapin ? Un mini sapin sur un bureau, une console ou une table basse suffit à installer l'esprit de Noël. On peut en répartir un par pièce.",
        ],
      },
      {
        heading: "3. Habiller les portes et les fenêtres",
        paragraphs: [
          "Une couronne de porte, une étoile en cordage ou une suspension en velours se voient de loin et donnent le ton dès l'entrée. Ce sont des objets que l'on range facilement et que l'on ressort chaque année.",
        ],
      },
      {
        heading: "4. Un coin pour les enfants",
        paragraphs: [
          "Un calendrier de l'Avent en tissu à remplir soi-même, une grande chaussette à suspendre : ces objets créent un rituel quotidien en décembre, sans racheter un calendrier jetable chaque année.",
        ],
      },
      {
        heading: "5. Quelques textiles de saison",
        paragraphs: [
          "Une housse de coussin à motif de sapins change un canapé en cinq minutes. Elle se range à plat et se remplace sans effort le reste de l'année.",
        ],
      },
      {
        heading: "6. Rester sur deux ou trois couleurs",
        paragraphs: [
          "Rouge et blanc, vert et or, ou bleu et argent : limiter la palette donne un résultat cohérent même avec des objets de provenances différentes.",
        ],
      },
      {
        heading: "7. Choisir des objets réutilisables",
        paragraphs: [
          "Mieux vaut une dizaine d'objets que l'on garde dix ans qu'une décoration jetable. Regardez les matières et les finitions plutôt que le seul prix.",
        ],
      },
      {
        heading: "8. Commander à temps",
        paragraphs: [
          "Nos produits sont expédiés depuis les entrepôts de nos fournisseurs, avec un délai moyen de 7 à 20 jours ouvrés. Pour décorer début décembre, commandez dès la fin octobre ou en novembre. La livraison est offerte en France, en Belgique, en Suisse et au Luxembourg.",
        ],
      },
    ],
    productsHeading: "Notre sélection de Noël",
    products: [{ category: "decoration", subcategory: "noel" }],
  },
  {
    slug: "dresser-une-belle-table-sans-se-ruiner",
    title: "Dresser une belle table sans se ruiner : chemin, nappe et plateaux",
    description:
      "Nappe, chemin de table, dessous de verre, plateaux : comment habiller une table de repas ou de fête avec quelques pièces bien choisies.",
    publishedAt: "2026-10-09",
    intro:
      "Une table réussie tient souvent à trois choses : une base textile, quelques matières naturelles et une touche de lumière. Pas besoin d'une vaisselle neuve pour changer l'effet.",
    sections: [
      {
        heading: "Choisir la base : nappe ou chemin de table",
        paragraphs: [
          "Une nappe habille toute la table et cache un plateau abîmé. Un chemin de table, plus léger, laisse voir le bois et convient aux tables que l'on aime montrer. Vérifiez les dimensions : le chemin doit dépasser de chaque côté d'environ 20 à 30 cm.",
        ],
      },
      {
        heading: "Jouer avec les matières naturelles",
        paragraphs: [
          "Lin, coton gaufré, bois, céramique : ces matières s'accordent entre elles et restent élégantes d'une saison à l'autre. Les franges et les nœuds de style macramé ajoutent du relief sans surcharger.",
        ],
      },
      {
        heading: "Protéger la table au quotidien",
        paragraphs: [
          "Des dessous de verre en céramique ou un set de table rond évitent les cernes et les rayures. Un lot de plusieurs pièces dans un support se range facilement et se pose sur la table basse comme sur la table de repas.",
        ],
      },
      {
        heading: "Utiliser des plateaux pour servir et regrouper",
        paragraphs: [
          "Un petit plateau en bois permet de servir des biscuits, un café ou des amuse-bouches, et de regrouper bougies et vase au centre de la table pour un effet ordonné.",
        ],
      },
      {
        heading: "Ajouter une lumière douce",
        paragraphs: [
          "Des bougies LED ou une petite lanterne au centre donnent une ambiance chaleureuse sans risque. Évitez d'en mettre trop : trois éléments de hauteurs différentes suffisent.",
        ],
      },
      {
        heading: "Penser à l'entretien",
        paragraphs: [
          "Regardez les consignes de lavage de chaque textile avant d'acheter, et rangez nappes et chemins à plat ou roulés pour éviter les plis. Les matières naturelles se froissent : c'est normal et fait partie de leur charme.",
        ],
      },
    ],
    productsHeading: "Pour habiller votre table",
    products: [
      { category: "decoration", subcategory: "art-de-la-table" },
      { category: "decoration", subcategory: "murs-textiles" },
    ],
  },
  {
    slug: "choisir-et-accrocher-une-tenture-murale",
    title: "Tenture murale : comment la choisir et l'accrocher sans percer",
    description:
      "Taille, style, matière et fixation : nos conseils pour choisir une tenture murale et l'installer proprement, même en location.",
    publishedAt: "2026-10-09",
    intro:
      "Une tenture murale, c'est la façon la plus simple de donner du caractère à un mur nu. Voici comment éviter les erreurs de taille et d'accrochage.",
    sections: [
      {
        heading: "1. Choisir la bonne taille",
        paragraphs: [
          "Au-dessus d'un canapé ou d'un lit, la tenture doit couvrir environ les deux tiers de la largeur du meuble. Une petite pièce sur un grand mur paraît perdue : en cas de doute, prenez plus grand.",
        ],
      },
      {
        heading: "2. Choisir un style qui vous ressemble",
        paragraphs: [
          "Forêt, montagne, tarot, mandala, bohème : choisissez un motif qui vous plaît vraiment, car c'est lui que vous verrez chaque jour. Pour une pièce déjà chargée, préférez un motif simple et des teintes proches de celles de la pièce.",
        ],
      },
      {
        heading: "3. Regarder la matière",
        paragraphs: [
          "Un tissu léger se drape facilement, mais peut garder des plis après le transport. Un coup de vapeur ou un passage au fer doux, en suivant les consignes, suffit en général.",
        ],
      },
      {
        heading: "4. Accrocher sans percer",
        paragraphs: [
          "Des crochets adhésifs, des bandes de fixation ou des punaises fines permettent d'installer une tenture sans abîmer un mur de location. Pour une grande pièce, répartissez les points de fixation sur tout le haut.",
        ],
      },
      {
        heading: "5. Compléter avec des textiles et des plantes",
        paragraphs: [
          "Une tenture s'accorde bien avec une housse de coussin, un plaid et une suspension pour plantes : reprenez deux couleurs, pas plus, pour garder un ensemble cohérent.",
        ],
      },
    ],
    productsHeading: "Nos tentures et textiles",
    products: [{ category: "decoration", subcategory: "murs-textiles" }],
  },
  {
    slug: "creer-une-ambiance-zen-a-la-maison",
    title: "Créer une ambiance zen à la maison : encens, thé, lumières et objets",
    description:
      "Quelques idées simples pour installer une ambiance calme chez soi : encens, thé, bougeoirs, objets décoratifs et petits rituels.",
    publishedAt: "2026-10-09",
    intro:
      "Une ambiance zen ne demande ni grande pièce ni gros budget : un peu de lumière, quelques objets en matières naturelles et un moment à soi chaque jour.",
    sections: [
      {
        heading: "Commencer par désencombrer",
        paragraphs: [
          "Dégagez une surface : une étagère, un coin de table. Un petit nombre d'objets bien disposés rend l'espace plus calme qu'une accumulation.",
        ],
      },
      {
        heading: "Choisir des matières naturelles",
        paragraphs: [
          "Céramique, bois, laiton, pierre : ces matières s'associent facilement et vieillissent bien. Un brûle-encens en céramique ou un bol en palissandre donne un point d'ancrage visuel à un coin de pièce.",
        ],
      },
      {
        heading: "Faire une place à l'encens",
        paragraphs: [
          "Utilisez l'encens avec modération et aérez toujours après usage. Posez le brûleur sur une surface stable, à l'écart des textiles et hors de portée des enfants et des animaux.",
        ],
      },
      {
        heading: "Un moment thé",
        paragraphs: [
          "Un pot à thé en céramique et une tasse avec infuseur transforment une pause en petit rituel. Quelques minutes sans écran suffisent pour en faire un repère dans la journée.",
        ],
      },
      {
        heading: "Une lumière douce le soir",
        paragraphs: [
          "Bougeoirs, boules lumineuses et lampes à lumière chaude remplacent avantageusement le plafonnier en fin de journée. Les modèles LED évitent tout risque lié à la flamme.",
        ],
      },
      {
        heading: "Un décor qui évoque la nature",
        paragraphs: [
          "Une branche décorative, un vase aux lignes simples, une pyramide en pierre : quelques éléments évoquant la nature suffisent à adoucir une pièce. Ce sont des objets de décoration, sans effet particulier sur la santé.",
        ],
      },
    ],
    productsHeading: "Pour votre coin zen",
    products: [{ category: "decoration", subcategory: "objets-zen" }],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}
