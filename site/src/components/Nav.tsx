"use client";

import { useEffect, useState } from "react";
import { localeHref, site, withBase, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { BookingLink } from "./BookingLink";
import { MenuIcon } from "./Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Logo({ homeHref, label }: { homeHref: string; label: string }) {
  return (
    <a href={homeHref} className="flex items-center gap-2.5 rounded-full py-1" aria-label={label}>
      <span
        aria-hidden
        className="block size-[22px] shrink-0 rounded-full bg-[linear-gradient(135deg,#2a8178,#256f9e)] shadow-[inset_0_1px_2px_rgb(255_255_255/0.45)]"
      />
      <span lang="en" className="font-serif text-[1.3rem] font-semibold tracking-[-0.01em] text-ink">
        {site.name}
      </span>
    </a>
  );
}

export function Nav({ locale, t }: { locale: Locale; t: Pick<Dictionary, "nav" | "a11y"> }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6">
      <nav
        aria-label={t.a11y.primaryNav}
        className={`glass mx-auto max-w-[1120px] rounded-[30px] transition-[box-shadow,background-color] duration-300 ${
          scrolled || open ? "bg-white/85 shadow-nav" : "shadow-[0_6px_24px_-14px_rgb(23_41_51/0.18)]"
        }`}
      >
        <div className="flex h-[60px] items-center justify-between gap-3 pr-2 pl-5">
          <Logo homeHref={withBase(`${localeHref[locale]}#top`)} label={t.a11y.home} />

          <ul className="hidden items-center gap-4 text-[0.9rem] font-medium md:flex lg:gap-6 lg:text-[0.95rem]">
            {t.nav.links.map((link) => (
              <li key={link.href}>
                <a className="nav-link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <div className="mr-1 hidden md:block">
              <LanguageSwitcher locale={locale} label={t.a11y.language} />
            </div>
            <BookingLink newTabLabel={t.a11y.newTab} className="btn btn-primary min-h-[44px] px-5 text-[0.92rem]">
              {t.nav.cta}
            </BookingLink>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>

        <div id="mobile-menu" hidden={!open} className="border-t border-ink/10 px-3 pt-2 pb-3 md:hidden">
          <ul className="grid gap-1">
            {t.nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-2xl px-3 font-medium text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t border-ink/10 px-3 pt-3">
            <span className="text-[0.9rem] font-medium text-ink-muted">{t.a11y.language}</span>
            <LanguageSwitcher locale={locale} label={t.a11y.language} />
          </div>
        </div>
      </nav>
    </header>
  );
}
