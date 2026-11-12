export const locales = ["bg", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "bg";

/** Public path of each locale's home page. The default locale lives at the site root. */
export const localeHref: Record<Locale, string> = {
  bg: "/",
  en: "/en/",
};

export const localeLabel: Record<Locale, { short: string; name: string }> = {
  bg: { short: "BG", name: "Български" },
  en: { short: "EN", name: "English" },
};

/** localStorage key holding the visitor's explicit language choice. */
export const localeStorageKey = "bizgrow-locale";

export const site = {
  name: "BizGrow",
  // Used for canonical and hreflang URLs. Set to the real domain before launch.
  url: "https://bizgrow.example",
  email: "hello@bizgrow.example",
  // Every booking CTA, in every language, opens this page in a new tab. Change it here only.
  bookingUrl: "https://calendar.app.google/kn22dWg1BWVwSPHp6",
};
