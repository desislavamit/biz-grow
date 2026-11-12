import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: {
    title: "BizGrow — Practical AI ops for small businesses",
    description:
      "BizGrow designs AI and automation systems that quietly handle repetitive work so small teams can focus on customers and growth.",
    ogTitle: "BizGrow — Less busywork. More business.",
    ogDescription: "Practical AI ops for small businesses. Book a free 30-minute flow audit.",
    ogLocale: "en_US",
  },
  a11y: {
    skipToContent: "Skip to content",
    primaryNav: "Primary",
    home: "BizGrow home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    newTab: "(opens in a new tab)",
    language: "Language",
    results: "Results",
    step: "Step",
  },
  nav: {
    links: [
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "About", href: "#proof" },
    ],
    cta: "Book a call",
  },
  hero: {
    chip: "Now booking spring projects.",
    line1: "Less busywork.",
    line2: "More business.",
    body: "BizGrow designs AI and automation systems that quietly handle the repetitive work — so small teams can focus on customers and growth.",
    primary: "Get a free flow audit",
    secondary: "Explore services",
    imageSrc: "/bizgrow-banner.webp",
    imageAlt:
      "BizGrow — AI and automation for small businesses: integrate AI, automate workflows, save time and costs, grow your business.",
    overlayLabel: "Invoices processed today",
    overlayValue: 248,
    overlayUnit: "automated",
  },
  metrics: [
    { value: "12h", caption: "saved weekly on manual work", label: "12 hours" },
    { value: "18d", caption: "from audit to first live workflow", label: "18 days" },
    { value: "4.9★", caption: "client satisfaction", label: "4.9 out of 5 stars" },
  ],
  services: {
    title: "What we take off your plate",
    items: [
      {
        icon: "spark",
        title: "Workflow audit",
        body: "We map how work really moves through your business and find the hours lost to repetitive tasks.",
      },
      {
        icon: "loop",
        title: "Automation builds",
        body: "Invoicing, onboarding, scheduling, follow-ups — connected across the tools you already use.",
      },
      {
        icon: "brain",
        title: "AI assistants",
        body: "Custom assistants that answer customers, draft emails and summarize documents in your voice.",
      },
    ],
  },
  process: {
    title: "From friction to flow",
    lead: "A calm sequence — diagnose first, build second, keep it trustworthy.",
    steps: [
      {
        n: "01",
        label: "Diagnose",
        title: "Map the busywork",
        body: "We sit with your team, walk the real workflows, and rank what is worth automating this quarter.",
      },
      {
        n: "02",
        label: "Build",
        title: "Ship inside your stack",
        body: "We implement automations and assistants in the tools you already own — with training, not a black box.",
      },
      {
        n: "03",
        label: "Steady",
        title: "Keep it reliable",
        body: "We tune, monitor, and improve so systems stay accurate as your business changes.",
      },
    ],
  },
  proof: {
    title: "Built for operators, not slide decks",
    quote:
      "“BizGrow mapped our intake chaos in one afternoon. Two weeks later the team had hours back — and nobody had to learn a new platform.”",
    name: "Maya R.",
    role: "Owner, 12-person creative studio",
    trust: "No black-box platforms. Tools you own. Training your team keeps.",
  },
  cta: {
    title: "Find your first 10 hours back.",
    body: "A free 30-minute call where we spot the three biggest automation wins in your business.",
    button: "Book your free audit",
  },
  footer: {
    descriptor: "Practical AI ops for small businesses.",
    services: "Services",
    process: "Process",
    privacy: "Privacy",
    rights: "All rights reserved.",
  },
};
