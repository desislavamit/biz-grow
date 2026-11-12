"use client";

import type { MouseEvent } from "react";
import { localeHref, localeLabel, localeStorageKey, locales, withBase, type Locale } from "@/i18n/config";

export function LanguageSwitcher({
  locale,
  label,
  className = "",
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const remember = (target: Locale) => (e: MouseEvent<HTMLAnchorElement>) => {
    try {
      localStorage.setItem(localeStorageKey, target);
    } catch {
      // Storage can be unavailable (private mode); switching still works via the link.
    }
    if (window.location.hash) e.currentTarget.href = withBase(localeHref[target]) + window.location.hash;
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex items-center rounded-full bg-ink/[0.06] p-1 text-[0.8rem] font-semibold ${className}`}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <a
            key={l}
            href={withBase(localeHref[l])}
            hrefLang={l}
            lang={l}
            aria-label={localeLabel[l].name}
            aria-current={active ? "true" : undefined}
            onClick={active ? undefined : remember(l)}
            className={`grid min-h-9 min-w-10 place-items-center rounded-full px-2.5 tracking-wide transition-colors duration-200 ${
              active ? "bg-white text-ink shadow-[0_2px_8px_-3px_rgb(23_41_51/0.35)]" : "text-ink-muted hover:text-ink"
            }`}
          >
            {localeLabel[l].short}
          </a>
        );
      })}
    </div>
  );
}
