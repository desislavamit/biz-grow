export type ServiceIcon = "spark" | "loop" | "brain";

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogLocale: string;
  };
  a11y: {
    skipToContent: string;
    primaryNav: string;
    home: string;
    openMenu: string;
    closeMenu: string;
    newTab: string;
    language: string;
    results: string;
    step: string;
  };
  nav: {
    links: { label: string; href: string }[];
    cta: string;
  };
  hero: {
    line1: string;
    line2: string;
    body: string;
    primary: string;
    secondary: string;
    /** Hero banner in `public/`; its baked-in text is localized, so each language has its own file (1436×1074). */
    imageSrc: string;
    imageAlt: string;
    overlayLabel: string;
    overlayValue: number;
    overlayUnit: string;
  };
  metrics: { value: string; caption: string; label?: string }[];
  services: {
    title: string;
    items: { icon: ServiceIcon; title: string; body: string }[];
  };
  process: {
    title: string;
    lead: string;
    steps: { n: string; label: string; title: string; body: string }[];
  };
  cta: {
    title: string;
    body: string;
    button: string;
  };
  contact: {
    title: string;
    book: string;
    emailBefore: string;
    fields: {
      name: string;
      email: string;
      description: string;
    };
    submit: string;
    /** Start of the mailto subject, followed by the name the visitor typed. */
    mailSubject: string;
  };
  footer: {
    descriptor: string;
    services: string;
    process: string;
    contact: string;
    privacy: string;
    rights: string;
  };
}
