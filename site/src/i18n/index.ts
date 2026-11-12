import type { Metadata } from "next";
import { localeHref, locales, site, type Locale } from "./config";
import { bg } from "./dictionaries/bg";
import { en } from "./dictionaries/en";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { bg, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function buildMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: localeHref[locale],
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localeHref[l]])),
        "x-default": localeHref.bg,
      },
    },
    openGraph: {
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      type: "website",
      locale: t.meta.ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => getDictionary(l).meta.ogLocale),
      url: localeHref[locale],
      siteName: site.name,
    },
  };
}

export * from "./config";
export type { Dictionary } from "./types";
