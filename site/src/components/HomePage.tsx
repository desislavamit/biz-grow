import { getDictionary, type Locale } from "@/i18n";
import { Nav } from "./Nav";
import { RevealObserver } from "./RevealObserver";
import { Contact } from "./Contact";
import { CtaBand, Footer, Hero, Process, Services } from "./Sections";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <div id="top">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-white px-4 py-2 font-semibold text-ink shadow-nav focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {t.a11y.skipToContent}
      </a>
      <div aria-hidden className="page-wash" />
      <Nav locale={locale} t={{ nav: t.nav, a11y: t.a11y }} />
      <main id="main">
        <Hero t={t} />
        <Services t={t} />
        <Process t={t} />
        <CtaBand t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} locale={locale} />
      <RevealObserver />
    </div>
  );
}
