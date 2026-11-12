export const locales = ["bg", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "bg";

/** Public path of each locale's home page. The default locale lives at the site root. */
export const localeHref: Record<Locale, string> = {
  bg: "/",
  en: "/en/",
};

/**
 * Empty unless the Pages build set it (`GITHUB_PAGES=1` in next.config.ts).
 * Locale paths stay `/` and `/en/`; this prefixes links and public files so they resolve under the project site.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  if (!basePath || !path.startsWith("/")) return path;
  return `${basePath}${path}`;
}

export const localeLabel: Record<Locale, { short: string; name: string }> = {
  bg: { short: "BG", name: "Български" },
  en: { short: "EN", name: "English" },
};

/** localStorage key holding the visitor's explicit language choice. */
export const localeStorageKey = "bizgrow-locale";

export const site = {
  name: "BizGrow",
  // Canonical and hreflang base. The Pages build uses the project-site origin; other builds keep the placeholder.
  url: basePath ? "https://desislavamit.github.io/biz-grow" : "https://bizgrow.example",
  email: "hello@bizgrow.example",
  // Every booking CTA, in every language, opens this page in a new tab. Change it here only.
  bookingUrl: "https://calendar.app.google/kn22dWg1BWVwSPHp6",
};
