import Link from "next/link";

// Petit pictogramme maison + feuille (dessin maison, aucune image externe).
function LogoMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      width="34"
      height="34"
      aria-hidden="true"
      className="shrink-0 text-amber-600 dark:text-amber-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15.5 16 5l12 10.5" />
      <path d="M7 13.5V26h18V13.5" />
      <path d="M16 23c-3.2 0-5.2-2.2-5.2-5 3.4 0 5.2 2 5.2 5Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M16 23c3.2 0 5.2-2.2 5.2-5-3.4 0-5.2 2-5.2 5Z" fill="currentColor" fillOpacity="0.35" />
      <path d="M16 23v-5" />
    </svg>
  );
}

export function SiteLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <LogoMark />
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">
          Maison Bien-Être
        </span>
        <span className="font-caveat text-base text-stone-500 dark:text-stone-400">
          par : What else by Vinc
        </span>
      </span>
    </Link>
  );
}
