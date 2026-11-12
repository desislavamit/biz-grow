import type { Metadata } from "next";
import { Literata, Manrope } from "next/font/google";
import { localeHref, withBase } from "@/i18n/config";
import "./globals.css";

const display = Literata({ variable: "--font-display", subsets: ["latin", "cyrillic"], display: "swap" });
const body = Manrope({ variable: "--font-body", subsets: ["latin", "cyrillic"], display: "swap" });

export const metadata: Metadata = {
  title: "404 — BizGrow",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="bg" className={`${display.variable} ${body.variable}`}>
      <body>
        <div aria-hidden className="page-wash" />
        <main className="grid min-h-dvh place-items-center px-6 text-center">
          <div className="card max-w-md p-10">
            <p className="font-serif text-6xl text-teal">404</p>
            <h1 className="mt-4 font-serif text-2xl font-medium text-ink">Страницата не е намерена</h1>
            <p lang="en" className="mt-1 text-ink-muted">
              Page not found
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={withBase(localeHref.bg)} className="btn btn-primary">
                Към началото
              </a>
              <a href={withBase(localeHref.en)} lang="en" hrefLang="en" className="btn btn-secondary">
                English home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
