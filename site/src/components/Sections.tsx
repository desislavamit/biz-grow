import type { CSSProperties } from "react";
import { localeHref, site, withBase, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { BookingLink } from "./BookingLink";
import { HeroVisual } from "./HeroVisual";
import { ArrowRight, serviceIcons } from "./Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Nav";

const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
const enterDelay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

const container = "mx-auto w-full max-w-[1120px] px-5 sm:px-6";

type Props = { t: Dictionary };

export function Hero({ t }: Props) {
  const { hero } = t;
  return (
    <section id="hero" aria-labelledby="hero-title" className="pt-28 pb-16 sm:pt-36 md:pb-24">
      <div className={container}>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="min-w-0">
            <h1
              id="hero-title"
              className="heading hero-title font-serif text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.04] font-medium tracking-[-0.02em] text-ink"
            >
              <span className="enter block" style={enterDelay(0)}>
                {hero.line1}
              </span>
              <span className="enter block" style={enterDelay(80)}>
                <span className="headline-accent">{hero.line2}</span>
              </span>
            </h1>

            <p
              className="enter mt-6 max-w-[38ch] text-[1.0625rem] leading-relaxed text-ink-soft sm:text-[1.125rem]"
              style={enterDelay(160)}
            >
              {hero.body}
            </p>

            <div className="enter mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={enterDelay(240)}>
              <BookingLink newTabLabel={t.a11y.newTab} className="btn btn-primary w-full sm:w-auto">
                {hero.primary}
                <ArrowRight className="btn-arrow" />
              </BookingLink>
              <a href="#services" className="btn btn-secondary w-full sm:w-auto">
                {hero.secondary}
              </a>
            </div>
          </div>

          <HeroVisual hero={hero} />
        </div>

        <ul
          className="mx-auto mt-14 grid max-w-[920px] grid-cols-3 gap-3 sm:mt-16 sm:gap-5"
          aria-label={t.a11y.results}
        >
          {t.metrics.map((m, i) => (
            <li
              key={m.value}
              className="reveal card card-hover px-2 py-4 text-center sm:px-5 sm:py-7"
              style={revealDelay(i * 80)}
            >
              <p className="font-serif text-[clamp(1.6rem,3.4vw,2.9rem)] leading-none font-normal tracking-[-0.01em] whitespace-nowrap text-teal">
                <span aria-hidden={m.label ? true : undefined}>{m.value}</span>
                {m.label ? <span className="sr-only">{m.label}</span> : null}
              </p>
              <p className="sr-only mt-3 text-[0.95rem] font-medium text-ink md:not-sr-only md:block">{m.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SectionHeading({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <div className="reveal max-w-2xl">
      <h2
        id={id}
        className="heading font-serif text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.12] font-medium tracking-[-0.015em] text-ink"
      >
        {title}
      </h2>
      {lead ? <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">{lead}</p> : null}
    </div>
  );
}

export function Services({ t }: Props) {
  return (
    <section id="services" aria-labelledby="services-title" className="py-16 md:py-24">
      <div className={container}>
        <SectionHeading id="services-title" title={t.services.title} />
        <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-6">
          {t.services.items.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            return (
              <li
                key={s.icon}
                className="reveal card card-hover group flex gap-4 p-5 md:block md:p-7"
                style={revealDelay(i * 80)}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-icon-mint text-ink transition-transform duration-300 ease-out-soft group-hover:scale-110 group-hover:-rotate-6">
                  <Icon />
                </span>
                <div className="min-w-0">
                  <h3 className="heading font-serif text-[1.25rem] leading-snug font-medium text-ink md:mt-6 md:text-[1.35rem]">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-soft md:mt-3">{s.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Process({ t }: Props) {
  const { process } = t;
  return (
    <section id="process" aria-labelledby="process-title" className="py-16 md:py-24">
      <div className={container}>
        <SectionHeading id="process-title" title={process.title} lead={process.lead} />
        <ol className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-6">
          {process.steps.map((step, i) => (
            <li key={step.n} className="reveal card card-hover p-6 md:p-7" style={revealDelay(i * 80)}>
              <p aria-hidden className="font-serif text-[2.6rem] leading-none font-normal text-teal">
                {step.n}
              </p>
              <h3 className="heading mt-5 font-serif text-[1.35rem] font-medium text-ink">
                <span className="sr-only">
                  {t.a11y.step} {step.n}:{" "}
                </span>
                {step.label}
              </h3>
              <p className="mt-1.5 text-[1.05rem] font-semibold text-ink">{step.title}</p>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CtaBand({ t }: Props) {
  const { cta } = t;
  return (
    <section id="audit" aria-labelledby="audit-title" className="pb-16 md:pb-24">
      <div className={container}>
        <div className="reveal relative overflow-hidden rounded-band bg-[linear-gradient(110deg,#111619_0%,#122222_45%,#0c413b_100%)] px-6 py-12 text-white shadow-visual sm:px-12 md:px-16 md:py-16">
          <div aria-hidden className="band-glow" />
          <div className="relative max-w-[700px]">
            <h2
              id="audit-title"
              className="heading font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] font-medium tracking-[-0.015em]"
            >
              {cta.title}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/80">{cta.body}</p>
            <BookingLink newTabLabel={t.a11y.newTab} className="btn btn-glow mt-8 w-full sm:w-auto">
              {cta.button}
              <ArrowRight className="btn-arrow" />
            </BookingLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ t, locale }: Props & { locale: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="pb-10">
      <div className={container}>
        <div className="flex flex-col gap-6 border-t border-ink/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo homeHref={withBase(`${localeHref[locale]}#top`)} label={t.a11y.home} />
            <p className="mt-2 text-[0.95rem] text-ink-muted">{t.footer.descriptor}</p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-medium">
              <li>
                <a className="nav-link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li>
                <a className="nav-link" href="#services">
                  {t.footer.services}
                </a>
              </li>
              <li>
                <a className="nav-link" href="#process">
                  {t.footer.process}
                </a>
              </li>
              <li>
                <a className="nav-link" href="#contact">
                  {t.footer.contact}
                </a>
              </li>
              <li>
                <a className="nav-link" href="#top">
                  {t.footer.privacy}
                </a>
              </li>
            </ul>
            <LanguageSwitcher locale={locale} label={t.a11y.language} />
          </div>
        </div>
        <p className="mt-6 text-[0.85rem] text-ink-muted">
          © {year} {site.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
