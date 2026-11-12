# BizGrow — Website Specification (build-ready)

**Status:** Build spec. Implemented in `site/` (Next.js static export).
**Brand:** BizGrow. The earlier working name has been retired everywhere in text and code.

**Design references (keep as-is):**

| File | Shows |
|---|---|
| `media/hero-mockup.png` | Nav, hero split, overlay card, metric row |
| `media/services-mockup.png` | Services cards + dark CTA band |
| `media/process-mockup.png` | Process steps. The mockup also shows a testimonial panel; that panel is **not** on the site. |
| `media/mobile-mockup.png` | Mobile homepage (390px class) |
| `media/references/flowlight-*.png` | Original Flowlight inspiration (third-party, reference only) |

> **Note on mockups:** the four mockup PNGs were rendered before the rename and still show the old brand name baked into the pixels (logo, body copy, testimonial). They are kept unchanged as **layout/visual references only**. This spec's copy is authoritative: wherever a mockup shows the old name, read "BizGrow".

---

## 1. Brand

| Field | Value |
|---|---|
| Name | **BizGrow** |
| Tagline | Less busywork. More business. |
| Descriptor | Practical AI ops for small businesses. |
| Positioning | Boutique AI / automation consultancy for SMBs: maps friction, ships automations inside existing tools, trains the team. |
| Personality | Steady, clear, credible. Operator energy, not hype-deck energy. |
| Voice | Short sentences. Outcomes over jargon. Concrete hours and handoffs. |
| Logo | Filled circle mark (22px, teal→blue gradient) + serif wordmark "BizGrow" (Fraunces 600). |

**Avoid:** purple "AI" clichés, dark-mode default page, peach/blush/pink/copper washes, generic "AI Solutions" phrasing.

## 2. Audience & goals

- **Primary:** owners/operators of 5–50 person businesses (agencies, local services, ecommerce, professional practices) buried in repetitive admin.
- **Secondary:** ops managers / office leads needing a partner to diagnose, implement and train.
- **Jobs:** reclaim hours (invoicing, scheduling, follow-ups, intake); standardize work; adopt AI safely with clear ROI.
- **Objections handled:** cost/technicality (free audit, tools they own); "we tried ChatGPT" (systems + training); "will it replace people?" (assistants take the busywork).
- **Conversion goals:** 1) book a free 30-minute flow audit; 2) read Services / Process; 3) trust.

## 3. Sitemap (one page per language, anchor nav)

| Language | URL | Static file |
|---|---|---|
| Bulgarian (**default**) | `/` | `out/index.html` |
| English | `/en/` | `out/en/index.html` |
| 404 (bilingual) | any unknown URL | `out/404.html` |

Both language pages have identical sections:

| # | Anchor | Section |
|---|---|---|
| 0 | `#top` | Floating capsule nav |
| 1 | `#hero` | Value prop, dual CTAs, visual card + overlay, 3 metric cards |
| 2 | `#services` | 3 service cards |
| 3 | `#process` | 3 process steps |
| 4 | `#audit` | Dark teal CTA band |
| 5 | `#contact` | Contact: video-call button, email line, mailto form |
| 6 | — | Footer |

## 4. Languages (i18n)

- **Locales:** Bulgarian `bg` (default, at `/`) and English `en` (at `/en/`). The brand name **BizGrow** stays in Latin script in both, marked `lang="en"` inside Bulgarian text.
- **Copy source:** all text lives in typed dictionaries, `site/src/i18n/dictionaries/bg.ts` and `en.ts`. This includes nav, hero, metrics, services, process, contact, CTA, footer, image alt text, aria labels (menu, skip link, language group, "(opens in a new tab)") and page title, description and Open Graph text. The `Dictionary` type in `site/src/i18n/types.ts` makes a missing translation a build error.
- **Bulgarian copy:** written natively in a business tone, not translated literally. Highlights:
  - H1: „По-малко рутина. / Повече бизнес.“
  - Nav CTA: „Запазете час“
  - Hero CTA: „Безплатен одит на процесите“
  - Sections: „Какво поемаме вместо вас“, „От хаос към ред“, „Свържете се с нас“
  - CTA band: „Върнете си първите 10 часа.“ / „Запазете безплатен одит“
  - Metrics: „12 ч“, „18 дни“, „4,9★“ (Bulgarian decimal comma)
  - Quotes use „…“ in Bulgarian and “…” in English.
- **Switcher:** a segmented BG | EN pill in the desktop nav, in the mobile menu sheet (with a "Език"/"Language" label) and in the footer. The links carry `hreflang`, `lang` and `aria-current`, inside a `role="group"` labelled "Език"/"Language". Switching keeps the current `#section`.
- **Persistence:** a click saves the choice to `localStorage["bizgrow-locale"]`. An inline script in the BG page's `<head>` sends a visitor who chose English from `/` to `/en/` before first paint, so there is no flash. Browser language is ignored, so Bulgarian is always the first-visit default.
- **SEO:** each locale has its own root layout with the correct `<html lang>`, title, description, `og:locale` (`bg_BG` / `en_US`) and `og:locale:alternate`. Both pages emit `<link rel="alternate" hreflang>` for `bg`, `en` and `x-default` (→ `/`), plus a canonical URL. Absolute URLs come from `site.url` in `site/src/i18n/config.ts`. The GitHub Pages build (`GITHUB_PAGES=1`) sets it to `https://desislavamit.github.io/biz-grow`, so the live pages are `https://desislavamit.github.io/biz-grow/` (Bulgarian) and `https://desislavamit.github.io/biz-grow/en/` (English). Other builds keep the placeholder `https://bizgrow.example`.
- **Banner image (per locale):** each language has its own hero banner, set in the dictionary as `hero.imageSrc` (1436×1074 WebP). Both use identical artwork, logo, wordmark, icons and dividers.
  - EN: `site/public/bizgrow-banner.webp`.
  - BG: `site/public/bizgrow-banner-bg.webp`, master `media/bizgrow-banner-bg.png` (1448×1086).
  - BG text: tagline „AI И АВТОМАТИЗАЦИЯ / ЗА МАЛКИЯ БИЗНЕС“; labels „ВНЕДРЕТЕ AI“, „АВТОМАТИЗИРАЙТЕ / ПРОЦЕСИТЕ“, „СПЕСТЕТЕ ВРЕМЕ / И РАЗХОДИ“, „РАЗВИЙТЕ / БИЗНЕСА СИ“.
  - How it was made: the English text was erased with OpenCV inpainting, then re-typeset in Montserrat, a Cyrillic-capable match for the original's geometric sans. The tagline is 39px at weight 560 with +6.7px tracking in `#0A3046`; the labels are about 22px at weight 600 in `#06263C`. Positions, centers, line breaks and cap heights match the original, and the labels are scaled to 86% so the longest word clears the dividers.

## 5. Final copy (English reference; Bulgarian in `bg.ts`)

### Booking link (all book-now CTAs)
Every booking CTA opens the Google Calendar appointment page **in a new tab**:

`https://calendar.app.google/kn22dWg1BWVwSPHp6`

- Markup: `target="_blank" rel="noopener noreferrer"`, plus visually hidden text "(opens in a new tab)".
- Applies to: **Book a call** (nav), **Get a free flow audit →** (hero), **Book your free audit** (CTA band), **Book a video call now** (contact), and any future book-now button.
- Same URL for every language. Single source of truth: `site.bookingUrl` in `site/src/i18n/config.ts`, rendered via the `BookingLink` component. The screen-reader suffix is localized: "(opens in a new tab)" / "(отваря се в нов раздел)".
- In-page links (Explore services, nav section links, footer links) stay as same-tab anchors.

### Nav
- Logo: **BizGrow**
- Links: Services (`#services`) · Process (`#process`) · Contact us (`#contact`)
- CTA: **Book a call** → booking link (new tab)
- Mobile: logo + "Book a call" pill + menu button opening a sheet with the 3 links.
- Bulgarian nav label for contact: **Свържете се с нас** (same destination, `#contact`).

### Hero
There is no status chip. The headline is the first thing in the column.
- H1 line 1: **Less busywork.**
- H1 line 2 (teal, italic): **More business.**
- Body: BizGrow designs AI and automation systems that quietly handle the repetitive work — so small teams can focus on customers and growth.
- Primary CTA: **Get a free flow audit →** → booking link (new tab)
- Secondary CTA: **Explore services** (`#services`)
- Overlay: label **Invoices processed today**, value **248** + **automated**
- Metrics:
  1. **12h** — saved weekly on manual work
  2. **18d** — from audit to first live workflow
  3. **4.9★** — client satisfaction

### Services `#services`
Title: **What we take off your plate**

| Icon | Title | Body |
|---|---|---|
| Plus / spark | Workflow audit | We map how work really moves through your business and find the hours lost to repetitive tasks. |
| Loop arrow | Automation builds | Invoicing, onboarding, scheduling, follow-ups — connected across the tools you already use. |
| Brain / node | AI assistants | Custom assistants that answer customers, draft emails and summarize documents in your voice. |

### Process `#process`
Title: **From friction to flow** · Lead: A calm sequence — diagnose first, build second, keep it trustworthy.

| No. | Label | Subtitle | Body |
|---|---|---|---|
| 01 | Diagnose | Map the busywork | We sit with your team, walk the real workflows, and rank what is worth automating this quarter. |
| 02 | Build | Ship inside your stack | We implement automations and assistants in the tools you already own — with training, not a black box. |
| 03 | Steady | Keep it reliable | We tune, monitor, and improve so systems stay accurate as your business changes. |

### CTA band `#audit`
- Title: **Find your first 10 hours back.**
- Body: A free 30-minute call where we spot the three biggest automation wins in your business.
- Button: **Book your free audit** → booking link (new tab).

### Contact `#contact`
Same section on both language pages (English at `/en/#contact`). No separate route and no backend.

- Title: **Contact us** / **Свържете се с нас**
- Button: **Book a video call now** / **Запазете видеоразговор сега** → the booking link, new tab, same `BookingLink` as the other book-now buttons.
- Line: **Send us an email at** hello@bizgrow.example / **Изпратете ни имейл на** hello@bizgrow.example. The address is a `mailto:` link. The address is `site.email` (`hello@bizgrow.example`).
- Form fields (labels): **Names** / **Име** (the person's name), **Email** / **Имейл**, **Description** / **Описание**. Submit: **Submit** / **Изпратете**.
- **How submit works:** GitHub Pages is static and has no mail server. Submit does not post to a backend or a third-party form service. It opens the visitor's mail app with **To** set to `hello@bizgrow.example`. The subject is the localized phrase plus the name ("BizGrow message from …" / "Съобщение до BizGrow от …"). The body lists Names, Email and Description with the values the visitor typed.

### Footer
- BizGrow wordmark · "Practical AI ops for small businesses."
- Links: hello@bizgrow.example · Services · Process · Contact us (`#contact`) · Privacy (`#` placeholder)
- © {current year} BizGrow. All rights reserved.

### Metadata
- `<title>`: BizGrow — Practical AI ops for small businesses
- Description: BizGrow designs AI and automation systems that quietly handle repetitive work so small teams can focus on customers and growth.
- `lang="en"` on `/en/`, `lang="bg"` on `/`; theme-color `#D0EBFC`.
- Bulgarian title: BizGrow — Практичен AI и автоматизация за малкия бизнес. See section 4 for hreflang and Open Graph.

## 6. Component inventory

| Component | Notes |
|---|---|
| `Nav` | Fixed floating white-glass capsule, max-w 1120px, h 60px, top 20px; logo, links with underline hover (Services, Process, Contact us), CTA pill; mobile menu sheet. Gains stronger shadow after scroll. |
| `Hero` | 2-col split (`1fr 1.05fr`) ≥1024px; stacked below. No status chip. |
| `BookingLink` | Anchor to `site.bookingUrl` with `target="_blank" rel="noopener noreferrer"` + sr-only "(opens in a new tab)"; used by every book-now CTA. |
| `Button` | `primary` (blue→teal gradient), `secondary` (white, hairline border), `glow` (teal→mint on dark band). Pill, min-h 48px. |
| `HeroVisual` | Rounded 32px frame (aspect 1436/1074 ≈ 4/3) showing Desislava's BizGrow banner, chosen per locale via `hero.imageSrc`: `bizgrow-banner.webp` (EN, source `media/references/bizgrow-banner.png` in the Project store) or `bizgrow-banner-bg.webp` (BG). It shows the logo, tagline, glass ribbons and four labels. Slow float + gentle pointer parallax (±5px). |
| `OverlayStat` | White-glass card overlapping visual bottom-left (−24px), counts up to 248. |
| `MetricCard` | White/75 glass card, serif teal numeral, caption. |
| `SectionHeading` | Serif H2 + optional lead. |
| `ServiceCard` | White card, 44px mint icon circle, serif title, gray body; hover lift. Mobile: icon left of text. |
| `ProcessStep` | Card with big teal serif number, label, subtitle, body. |
| `Contact` | White card after the CTA band: booking button, mailto line, and the Names / Email / Description form. Submit builds a `mailto:` URL. |
| `CtaBand` | Dark gradient panel radius 36px, drifting glow blob, glow button. |
| `Footer` | Minimal row. |
| `Reveal` | IntersectionObserver wrapper adding `.is-visible` once, with stagger delay prop. |

## 7. Design tokens (measured from mockups)

### Colors
| Token | Hex | Use |
|---|---|---|
| `sky` | `#D0EBFC` | Wash, blue side |
| `mint` | `#D5F6EB` | Wash, mint side |
| `wash-mid` | `#DDF1F4` | Wash midpoint |
| `paper` | `#FFFFFF` | Cards, nav |
| `ink` | `#172933` | Headlines / primary text |
| `ink-soft` | `#4F5D63` | Body, nav links |
| `ink-muted` | `#6B7A80` | Captions |
| `teal` | `#2A8178` | Accents, numerals |
| `teal-deep` | `#1F6A66` | Hover / emphasis |
| `blue` | `#256F9E` | Primary button start, nav CTA |
| `blue-dot` | `#2D7AB0` | "automated" on the overlay |
| `headline-a` → `headline-b` | `#3C8476` → `#2F5F8A` | "More business." text gradient |
| `icon-mint` | `#C9EEE4` | Service icon circle |
| `band-1/2/3` | `#111619` / `#122222` / `#0C413B` | CTA band |
| `glow-a` → `glow-b` | `#3A96AB` → `#44C293` | CTA band button |
| `art-bg` | `#F1EDEC` | Hero banner backdrop (matches image) |

### Gradients
| Name | CSS |
|---|---|
| Page wash | `linear-gradient(115deg, #D0EBFC 0%, #DDF1F4 45%, #D5F6EB 100%)` + two blurred radial blobs (sky, mint) that drift |
| Primary button | `linear-gradient(90deg, #256F9E 0%, #2A8178 100%)` |
| Headline phrase | `linear-gradient(90deg, #3C8476, #2F5F8A)` clipped to text |
| CTA band | `linear-gradient(110deg, #111619 0%, #122222 45%, #0C413B 100%)` |
| CTA button | `linear-gradient(90deg, #3A96AB 0%, #44C293 100%)` |

### Typography
| Role | Family | Weight | Size |
|---|---|---|---|
| H1 | Fraunces (variable, opsz) | 500 (line 2 italic) | `clamp(2.75rem, 6vw, 4.5rem)`, lh 1.02, tracking −0.02em |
| H2 | Fraunces | 500 | `clamp(2rem, 3.6vw, 2.9rem)`, lh 1.1 |
| Card title | Fraunces | 500 | 1.35rem |
| Numerals | Fraunces | 400 | `clamp(2rem, 3.4vw, 2.9rem)` |
| Body | Manrope | 400 | 1.0625–1.125rem, lh 1.6 |
| UI / buttons | Manrope | 600 | 0.95–1rem |
| Captions | Manrope | 500 | 0.85–0.95rem |

Fonts are self-hosted at build time via `next/font/google` (no runtime Google request). Manrope matches the mockups' rounded geometric sans.

**Bulgarian / Cyrillic:**
- Fraunces has no Cyrillic subset, so the BG layout sets the serif role to **Literata**, which has the closest feel: variable optical sizes, a true italic, and `latin` + `cyrillic` subsets. Manrope loads with its `cyrillic` subset.
- The tokens `--font-display` and `--font-body` are set per locale layout and mapped to Tailwind's `font-serif` and `font-sans`.
- Because the pages declare `lang="bg"`, the fonts render the standard Bulgarian Cyrillic letterforms (e.g. д, л, в), which is intended.
- Long Bulgarian words: all headings use `text-wrap: balance; overflow-wrap: break-word; hyphens: auto`.
- The BG H1 is sized `clamp(2.15rem, 9.6vw, 3.4rem)` so that „По-малко рутина.“ stays on one line from 360px phones up to desktop, keeping the two-line hero from the mockups.

### Spacing, radii, shadows
- Spacing scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 px. Section padding 96px desktop / 64px mobile. Container max-w 1160px, side padding 24px (mobile 20px).
- Radii: pill 999px · card 24px · visual 32px · overlay 20px · band 36px.
- Shadows:
  - `nav`: `0 10px 30px -10px rgba(23,41,51,.18)`
  - `card`: `0 18px 40px -18px rgba(23,41,51,.22), 0 1px 0 rgba(255,255,255,.8) inset`
  - `card-hover`: `0 28px 60px -20px rgba(23,41,51,.30)`
  - `visual`: `0 30px 70px -30px rgba(23,41,51,.35)`
- Glass: `background: rgba(255,255,255,.72); backdrop-filter: blur(14px) saturate(140%); border: 1px solid rgba(255,255,255,.7)`.

## 8. Responsive behavior

| Breakpoint | Behavior |
|---|---|
| ≥1024px | Split hero, 3-col metrics/services/process, nav links visible |
| 768–1023px | Hero stacks (copy then visual), 3-col metrics and cards remain, nav links visible |
| <768px | Matches mobile mockup: nav = logo + "Book a call" + menu button; CTAs full-width stacked; visual full width with overlay; metrics 3 compact cards showing numerals only (caption visually hidden but kept for screen readers); services become horizontal cards (icon left); process and CTA band stack; button full width |

Images: hero banner served as WebP with fixed aspect ratio (no layout shift). The "Invoices processed today" overlay hangs off the banner's bottom-left edge, overlapping only the empty strip below the banner's four labels (16px on mobile, 24px from `sm` up), so it never covers banner text.

## 9. Accessibility

- WCAG 2.2 AA contrast: ink on wash ≥ 12:1; white on band ≥ 15:1; teal numerals ≥ 4.5:1 on white.
- Skip link "Skip to content" → `#main`.
- Booking links open in a new tab and say so to screen readers ("(opens in a new tab)").
- Landmarks: `header > nav[aria-label="Primary"]`, `main#main`, labelled `section`s (`aria-labelledby`), `footer`.
- Visible focus: 2px `#256F9E` outline, 3px offset, on every interactive element.
- Hit targets ≥ 44×44px. Mobile menu button exposes `aria-expanded`/`aria-controls`; Escape closes it; links close it.
- Hero banner contains text, so it has descriptive alt: "BizGrow — AI and automation for small businesses: integrate AI, automate workflows, save time and costs, grow your business." The overlay stat is real text. The animated counter renders the final value in HTML and is `aria-hidden` during animation with an sr-only static value.
- Teal headline line is also italic so meaning doesn't rely on color.
- `prefers-reduced-motion: reduce`: disables drift, float, parallax, counters and reveals (content shows immediately); hover transitions reduced to color only.

## 10. Motion

| Motion | Spec |
|---|---|
| Gradient drift | Two large blurred radial blobs (sky + mint) behind content translate/scale on 28s and 36s alternate loops; page wash background-position shifts on 40s loop. |
| Scroll reveal | `opacity 0→1`, `translateY(24px)→0`, `filter blur(4px)→0`, 700ms `cubic-bezier(.22,1,.36,1)`, stagger 80ms; once per element (IntersectionObserver, threshold .15). |
| Hero entrance | H1 lines, body, CTAs fade-rise in sequence on load (80ms stagger). |
| Hover depth | Cards: `translateY(-4px)` + `card-hover` shadow, 250ms; buttons: `translateY(-2px)`, gradient sheen sweep; nav links: underline scaleX 0→1 from left. |
| Hero visual | Gentle float (±6px, 9s) and pointer parallax (±8px) on the image; overlay counts 0→248 over 1.6s when visible. |
| Nav | Shadow/opacity deepen after 16px scroll. |
| CTA band | Slow drifting mint glow blob (20s). |

Never: bounce, autoplay carousels, confetti, aggressive glow.

## 11. Tech stack

| Layer | Choice (versions verified with `npm view`, Nov 2026) |
|---|---|
| Framework | Next.js 16.4.x, App Router, `output: "export"` (static `out/`) |
| UI | React 19.3.x + TypeScript 5.9 (strict) |
| Styling | Tailwind CSS 4.3.x (CSS-first `@theme` tokens in `globals.css`) |
| Fonts | `next/font/google`, self-hosted at build: Fraunces (EN headings), Literata (BG headings), Manrope (body, Latin + Cyrillic) |
| i18n | No library. Route groups `(bg)` and `(en)` each have their own root layout; typed dictionaries; `trailingSlash: true`; `experimental.globalNotFound` for the shared 404 |
| Motion | CSS keyframes/transitions + small client hooks (IntersectionObserver); no animation library |
| Lint | ESLint 9 + `eslint-config-next` 16.4.x |
| Runtime | Node.js ≥ 20.9 (tested on Node 26) |
| Hosting | GitHub Pages at `https://desislavamit.github.io/biz-grow/`. The workflow in `.github/workflows/pages.yml` builds with `GITHUB_PAGES=1` (basePath and assetPrefix `/biz-grow`) and deploys `site/out`. `npm run dev` stays at `/`. Also fine on any other static host; optional Node app via `BUILD_MODE=node`. |

TypeScript 7 and ESLint 10 exist on npm, but the Next.js 16.4 template and `typescript-eslint` still target TypeScript 5.x / ESLint 9, so those are used for a clean, supported toolchain.

## 12. Acceptance checklist

- [ ] Matches mockups where they still apply: wash, capsule nav, serif H1 with teal line 2, dual CTAs, glass-ribbon card + overlay, 3 metrics, 3 services, process, dark CTA band, footer, mobile layout. No spring-projects chip and no testimonial panel. Contact section on both languages, with the mailto form.
- [ ] No old brand name anywhere in code or copy.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build` all clean; `out/` works from a plain static server.
- [ ] Reduced motion honored; keyboard navigation and focus visible; Lighthouse a11y ≥ 95.
