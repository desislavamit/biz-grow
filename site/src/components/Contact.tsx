"use client";

import { type FormEvent } from "react";
import { site } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { BookingLink } from "./BookingLink";

const fieldClass =
  "min-h-12 w-full rounded-2xl border border-ink/10 bg-white/80 px-4 text-base font-normal text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.8)]";

export function Contact({ t }: { t: Pick<Dictionary, "contact" | "a11y"> }) {
  const { contact } = t;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    const subject = `${contact.mailSubject} ${name}`;
    const body = [
      `${contact.fields.name}: ${name}`,
      `${contact.fields.email}: ${email}`,
      "",
      `${contact.fields.description}:`,
      description,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-16 md:pb-24">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6">
        <div className="reveal card p-7 md:p-12">
          <h2
            id="contact-title"
            className="heading font-serif text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.12] font-medium tracking-[-0.015em] text-ink"
          >
            {contact.title}
          </h2>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-14">
            <div>
              <BookingLink newTabLabel={t.a11y.newTab} className="btn btn-primary w-full sm:w-auto">
                {contact.book}
              </BookingLink>
              <p className="mt-6 max-w-[36ch] text-[1.0625rem] leading-relaxed text-ink-soft">
                {contact.emailBefore}{" "}
                <a className="nav-link font-semibold text-ink" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </p>
            </div>

            <form className="grid gap-4" onSubmit={onSubmit}>
              <label className="grid gap-2 text-[0.95rem] font-semibold text-ink" htmlFor="contact-name">
                {contact.fields.name}
                <input id="contact-name" name="name" type="text" required autoComplete="name" className={fieldClass} />
              </label>
              <label className="grid gap-2 text-[0.95rem] font-semibold text-ink" htmlFor="contact-email">
                {contact.fields.email}
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-2 text-[0.95rem] font-semibold text-ink" htmlFor="contact-description">
                {contact.fields.description}
                <textarea
                  id="contact-description"
                  name="description"
                  required
                  rows={5}
                  className={`${fieldClass} min-h-32 resize-y py-3`}
                />
              </label>
              <button type="submit" className="btn btn-secondary w-full sm:w-auto">
                {contact.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
