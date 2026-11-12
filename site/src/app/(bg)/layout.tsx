import type { Viewport } from "next";
import type { ReactNode } from "react";
import { Literata, Manrope } from "next/font/google";
import { buildMetadata, localeHref, localeStorageKey } from "@/i18n";
import "../globals.css";

// Fraunces has no Cyrillic subset; Literata is the closest Cyrillic-capable serif (optical sizes + true italic).
const display = Literata({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata = buildMetadata("bg");

export const viewport: Viewport = { themeColor: "#d0ebfc" };

// Honors an explicit earlier choice of English. Runs before first paint, so there is no flash;
// browser language is deliberately ignored so Bulgarian stays the default.
const rememberedLocaleScript = `try{if(localStorage.getItem(${JSON.stringify(localeStorageKey)})==="en")location.replace(${JSON.stringify(localeHref.en)}+location.hash)}catch(e){}`;

export default function BgRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bg" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: rememberedLocaleScript }} />
      </head>
      <body>
        <noscript>
          <style>{`.reveal,.enter{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
