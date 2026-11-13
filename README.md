# BizGrow

Marketing website for **BizGrow**, a practical AI and automation consultancy for small businesses.

| Path | What it is |
|---|---|
| `site/` | The website (Next.js + React + TypeScript + Tailwind CSS, static export) |
| `docs/ai-consultancy-spec.md` | Build specification: brand, copy, tokens, components, motion, accessibility, stack |
| `media/*-mockup.png` | Design mockups (layout references; they still show the old pre-rename brand name in the pixels) |
| `media/bizgrow-banner-bg.png` | Master of the Bulgarian hero banner (the English master is in the Project store's `media/references/bizgrow-banner.png`) |
| `media/references/` | Original Flowlight inspiration screenshots |
| `media/screenshots/` | Screenshots of the built site: `bizgrow-bg-*.png` (Bulgarian, default) and `bizgrow-*.png` (English) |

## Stack

| Package | Version |
|---|---|
| Next.js | 16.4.6 (App Router, `output: "export"`) |
| React / React DOM | 19.3.1 |
| TypeScript | 5.9 |
| Tailwind CSS | 4.3.5 |
| ESLint | 9 + `eslint-config-next` 16.4.6 |
| serve | 14.2.7 (local preview of the static build) |

Fonts are downloaded at build time and self-hosted, so the live site makes no Google Fonts requests:

- Body text uses Manrope in both languages, with Latin and Cyrillic subsets.
- English headings use Fraunces.
- Bulgarian headings use Literata, because Fraunces has no Cyrillic glyphs.

## Languages

| Locale | URL | Built file | Notes |
|---|---|---|---|
| Bulgarian (`bg`) | `/` | `out/index.html` | **Default** |
| English (`en`) | `/en/` | `out/en/index.html` | Second language |

- **Switcher:** BG/EN pills in the desktop nav, the mobile menu and the footer.
- **Remembering the choice:** clicking a language saves it in `localStorage` (`bizgrow-locale`). A visitor who picked English is sent from `/` to `/en/` by a tiny script that runs before the page paints, so there is no flash. Browser language is deliberately ignored, so first-time visitors always land on Bulgarian.
- **Per-locale metadata:** each page has its own `<html lang>`, title, description and Open Graph locale. Both pages carry `hreflang` alternates (`bg`, `en`, `x-default` → `/`) and a canonical URL built from `site.url`.
- **Before launch:** set `site.url` in `site/src/i18n/config.ts` to the real domain, so canonical and `hreflang` links are correct.
- **Hosting:** no server rewrites are needed. With `trailingSlash: true`, `/en/` is a real folder containing `index.html`.

Where things live:

| File | Purpose |
|---|---|
| `site/src/i18n/config.ts` | Locale list, default locale, URLs, `site` constants (booking URL, email, domain) |
| `site/src/i18n/types.ts` | `Dictionary` type: every text on the page |
| `site/src/i18n/dictionaries/bg.ts`, `en.ts` | All copy per language, including alt text, aria labels and page metadata |
| `site/src/app/(bg)/layout.tsx`, `(bg)/page.tsx` | Bulgarian root layout (`lang="bg"`, Cyrillic fonts) and page at `/` |
| `site/src/app/(en)/layout.tsx`, `(en)/en/page.tsx` | English root layout and page at `/en/` |
| `site/src/app/global-not-found.tsx` | Bilingual 404 page (`out/404.html`) |

### Editing text

Edit the string in `bg.ts` and/or `en.ts`, then rebuild. TypeScript fails the build if a language is missing a key, so the languages can't drift apart.

The hero banner has text baked into the image, so each language points to its own file via `hero.imageSrc`: `site/public/bizgrow-banner-bg.webp` (BG) and `site/public/bizgrow-banner.webp` (EN). To replace one, export a 1436×1074 WebP to `site/public/` and update `imageSrc` and `imageAlt` in that language's dictionary. A new language needs its own banner or can point at the English one.

### Adding a language (example: German, `de` at `/de/`)

1. In `site/src/i18n/config.ts`, add `"de"` to `locales`, plus entries in `localeHref` (`"/de/"`) and `localeLabel` (`{ short: "DE", name: "Deutsch" }`).
2. Copy `dictionaries/en.ts` to `dictionaries/de.ts`, rename the export to `de`, translate every string and set `meta.ogLocale` to `"de_DE"`.
3. Register it in `site/src/i18n/index.ts`: `const dictionaries = { bg, en, de }`.
4. Create `site/src/app/(de)/layout.tsx` (copy `(en)/layout.tsx`): set `lang="de"`, call `buildMetadata("de")`, and add font subsets the language needs (e.g. `latin-ext`).
5. Create `site/src/app/(de)/de/page.tsx` containing `<HomePage locale="de" />`.
6. To honor a remembered `de` choice too, extend the small script in `(bg)/layout.tsx` to check for `"de"`.
7. Run `npm run check` and upload the new `out/de/` folder along with the rest.

## Booking link

Every booking button opens the Google Calendar appointment page in a new tab, in both languages:

- Bulgarian: "Запазете час", "Безплатен одит на процесите", "Запазете безплатен одит"
- English: "Book a call", "Get a free flow audit", "Book your free audit"

```
https://calendar.app.google/kn22dWg1BWVwSPHp6
```

To change it, edit `bookingUrl` in `site/src/i18n/config.ts` and rebuild.

## Prerequisites

- **Node.js 20.9 or newer** (tested with Node 26.5 and npm 11.17). Check with `node -v`.
- npm (comes with Node).

## Install

```bash
cd site
npm install
```

## Run locally

Development server with hot reload:

```bash
npm run dev
```

Open http://localhost:3000.

Production preview (builds the static site into `site/out/` and serves it exactly as a web host would):

```bash
npm run build
npm run preview
```

Open http://localhost:3000 for Bulgarian and http://localhost:3000/en/ for English. If you previously picked English, `/` sends you to `/en/`; click **BG** to switch back.

Quality checks (lint, type check and build in one go):

```bash
npm run check
```

## Build

```bash
npm run build
```

Output: `site/out/`, a folder of plain HTML, CSS, JS and images. Everything inside it gets uploaded to the host. No server-side code is needed.

This default build uses paths relative to each page (`_next/…`, `bizgrow-mark.png`, `en/`), so the folder works as the document root and also when a host serves it from a subdirectory. `site/public/.nojekyll` is copied into the export so GitHub Pages does not hide `_next`. Do not set `GITHUB_PAGES=1` for this build. That flag is only for https://desislavamit.github.io/biz-grow/ and prefixes every asset with `/biz-grow`.

## Publish the built files

From the project root:

```bash
./scripts/push-out.sh
```

Or, from `site/`: `npm run push:out`.

The command builds `site/` without `GITHUB_PAGES`, then pushes **only the contents** of `site/out/` to the `main` branch of https://github.com/desislavamit/bizgrow-pub (`index.html` at the repo root). It does not commit `site/out/` into this source repository, and it does not change `biz-grow`. The GitHub token is read from `githubtoken.rtf` in the project root (override the path with `BIZGROW_TOKEN_FILE`). It stays in an environment variable for that run and is never written into the script or a remote URL.

## Deploy to SuperHosting.bg

### Option A (recommended): static upload to `public_html`

Works on every SuperHosting.bg shared hosting plan.

1. Build locally: `cd site && npm run build`.
2. Zip the **contents** of `site/out/` (not the `out` folder itself). On macOS: open `site/out`, select all files, then right-click and choose **Compress**.
3. Log in to the SuperHosting.bg client area and open **cPanel** for your domain.
4. Open **File Manager** and go to `public_html` (for an addon domain or subdomain, use its document root instead).
5. Remove or move any old placeholder files (for example the default `index.html`).
6. Click **Upload**, upload the zip, then right-click it, choose **Extract**, and delete the zip afterwards.
7. Check that `public_html/index.html` (Bulgarian), `public_html/en/index.html` (English) and `public_html/_next/` all exist directly in `public_html`, not inside a subfolder.
8. Optional: in File Manager, enable **Settings → Show Hidden Files**, then create `public_html/.htaccess`. No rewrite rules are needed for the languages, because `/en/` is a real folder that Apache serves through its `index.html`. The file only adds a 404 page and HTTPS:

   ```apache
   DirectoryIndex index.html
   ErrorDocument 404 /404.html

   # Force HTTPS (only after an SSL certificate is active, e.g. via cPanel "SSL/TLS Status" / AutoSSL)
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

9. Visit your domain (Bulgarian) and `yourdomain/en/` (English).

**FTP alternative** (instead of steps 4–7):

1. In cPanel go to **FTP Accounts**. Use your main cPanel login or create an FTP account, then note the server name, username and password (cPanel shows these under **Configure FTP Client**).
2. In an FTP client such as FileZilla, connect with host `ftp.yourdomain.bg` (or the server hostname shown in cPanel), port `21`, with **explicit FTP over TLS** if offered.
3. On the remote side open `public_html`. On the local side open `site/out`.
4. Upload everything from `site/out/` into `public_html`, overwriting existing files.

To update the site later, rebuild and re-upload. Delete the old `_next/` folder first so stale files don't pile up.

### Option B: run as a Node.js app (cPanel "Setup Node.js App")

Only needed if you later add server features. It requires a plan where cPanel shows **Setup Node.js App** (check with SuperHosting.bg support if you don't see it), and Node 20.9 or newer must be selectable there.

1. Build the standalone server locally:

   ```bash
   cd site
   npm run build:node
   ```

   This creates `site/.next/standalone/` containing `server.js`, a trimmed `node_modules`, `public/` and `.next/static/`. You can test it with `PORT=3000 npm run start:node`.
2. Zip the **contents** of `site/.next/standalone/`. Make sure the hidden `.next` folder is included, e.g. `cd .next/standalone && zip -r ../../bizgrow-node.zip .`
3. In cPanel **File Manager**, create a folder **outside** `public_html`, e.g. `/home/<user>/bizgrow`, then upload and extract the zip there.
4. In cPanel open **Setup Node.js App → Create Application** and set:
   - **Node.js version:** the newest available, at least 20.9
   - **Application mode:** Production
   - **Application root:** `bizgrow`
   - **Application URL:** your domain (or a subdomain)
   - **Application startup file:** `server.js`
   - Environment variable (optional): `HOSTNAME=0.0.0.0`
5. Click **Create**, then **Restart**. The dependencies already ship inside the standalone build, so you don't need **Run NPM Install**.
6. Visit the Application URL. To update, rebuild, re-upload the folder contents and click **Restart**.

If the host's server isn't Linux x64-compatible with your Mac's build (rare for this site, since it uses no native image libraries), upload the `site/` source instead (without `node_modules`, `.next` and `out`). Then run `npm ci && npm run build:node` from the cPanel **Terminal** inside the app's virtual environment, and point the startup file at `.next/standalone/server.js`.

## Other hosts

- **Netlify:** New site from Git (or drag-and-drop `site/out/` into the Netlify dashboard). Base directory `site`, build command `npm run build`, publish directory `site/out`.
- **Vercel:** Import the repository and set **Root Directory** to `site`. Vercel detects Next.js automatically. The static export works as-is, or remove `output: "export"` from `next.config.ts` to use Vercel's native Next.js hosting.
- **Any static host** (GitHub Pages, Cloudflare Pages, S3, nginx): upload or publish `site/out/`.
