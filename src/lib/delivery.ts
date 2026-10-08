// Estimation de livraison affichée sur la fiche produit : délai moyen annoncé de
// 7 à 20 jours ouvrés (voir la page Livraison). C'est une fourchette indicative,
// jamais une garantie.
export const DELIVERY_MIN_BUSINESS_DAYS = 7;
export const DELIVERY_MAX_BUSINESS_DAYS = 20;

export function addBusinessDays(from: Date, days: number): Date {
  const date = new Date(from);
  let remaining = days;
  while (remaining > 0) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }
  return date;
}

export function deliveryWindow(from: Date = new Date()): { start: Date; end: Date } {
  return {
    start: addBusinessDays(from, DELIVERY_MIN_BUSINESS_DAYS),
    end: addBusinessDays(from, DELIVERY_MAX_BUSINESS_DAYS),
  };
}

export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    timeZone: "Europe/Paris",
  }).format(date);
}

// Vrai si la fin de la fourchette dépasse le 31 octobre de l'année en cours,
// pour avertir honnêtement les acheteurs d'articles Halloween.
export function mayMissHalloween(end: Date, now: Date = new Date()): boolean {
  const limit = new Date(now.getFullYear(), 9, 31, 23, 59, 59);
  return now <= limit && end > limit;
}
