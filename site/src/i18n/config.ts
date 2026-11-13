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
 * Locale paths stay `/` and `/en/` in source; `withBase` prefixes them for that build only.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * How many directories the locale's page sits below the exported site root.
 * Bulgarian is `index.html`; English is `en/index.html`.
 */
export function localeDepth(locale: Locale): number {
  return locale === defaultLocale ? 0 : 1;
}

/**
 * Prefix a root path for the current build.
 * The Pages build (`basePath` `/biz-grow`) keeps host-absolute URLs.
 * Every other build uses paths relative to the page, so the same `out` folder
 * works as the web root and when a host serves that folder from a subdirectory.
 */
export function withBase(path: string, depth = 0): string {
  if (!path.startsWith("/")) return path;
  if (basePath) return `${basePath}${path}`;
  const rest = path.slice(1);
  const prefix = depth === 0 ? "./" : "../".repeat(depth);
  if (rest === "" || rest.startsWith("#")) return `${prefix}${rest}`;
  return `${"../".repeat(depth)}${rest}`;
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
