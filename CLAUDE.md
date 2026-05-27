# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
vercel --prod    # Deploy directly to production (Vercel CLI is installed)
```

No test suite exists. Verify changes visually via the dev server.

## Deployment

This project uses **Vercel CLI** for deployment — not GitHub push. Always deploy with:
```bash
vercel --prod
```

Git push to the `Versions` branch triggers Vercel auto-deploy as well, but `vercel --prod` is the primary workflow used in this project.

## Architecture

**Next.js 14 App Router** — all pages are in `src/app/`, all shared UI in `src/components/`.

Pages that use client-side state (`useState`, `useForm`, framer-motion interactive) must be `'use client'`. Since `metadata` exports cannot coexist with `'use client'`, each such route has a separate `layout.tsx` that exports the page's metadata. The root `src/app/layout.tsx` holds global metadata, JSON-LD Organization schema, Navbar, and Footer.

**SEO is currently set to `noindex`** — do not change `robots` in `src/app/layout.tsx` until the site is ready to go public. Also keep `public/robots.txt` as `Disallow: /`.

## Design System

Colors are strict — use only these, no others:
- `#F36D21` — orange (CTAs, accents, active states)
- `#545554` — gray (body text)
- `#000000` / `#ffffff` — headings / backgrounds
- `#F5F5F5`, `#FAFAFA`, `#E8E8E8` — light surfaces and borders

CSS utility classes defined in `src/app/globals.css`:
- `.glass` — frosted glass surface (used on hero badges, navbar)
- `.grain` — subtle noise texture overlay via `::after` pseudo-element
- `.hero-bg`, `.gradient-light`, `.gradient-dark`, `.gradient-cta`, `.gradient-configurator` — section backgrounds
- `.float-badge`, `.float-badge-2`, `.float-badge-3` — staggered float animations (used on hero stat badges)
- `.specs-table` — tabular-nums styling for spec tables

Typography is set globally in `globals.css` — `h1`–`h4` have predefined sizes and weights. Do not override with arbitrary Tailwind font sizes on headings.

## Pricing Logic

All pricing is calculated client-side in `src/lib/pricing.ts`. The `PRICING` object is the single source of truth for:
- Base robot price starts from **€40,000/unit** (the public hook price — displayed on ServicesSection, FAQ, product meta)
- Fully configured unit (with all add-ons): **under €50,000** — this is what the configurator calculates
- Additional services (WMS integration, automated doors, network infrastructure, installation) are **priced per project** — clients discuss these directly, no public price shown
- Add-on prices (7 add-ons)
- Volume discount tiers (3%, 6%, 8%, 10+ units)

`calculatePrice(config)` returns `PriceResult` with min/max ranges. `ConfiguratorState` defines the full shape of configurator form data. The configurator page (`src/app/configurator/page.tsx`) is a 5-step multi-page form using `react-hook-form` + `zod`.

## Branding & Positioning

**Robobist is presented as an independent, standalone company.** Do not add text implying it is a reseller, distributor, or collaborator of any other brand.

**Flacăra Electric** (same ownership group) handles physical installation. This is intentionally kept subtle — mention it only as "certified installation" or "our installation team", never as a named partner on prominent sections. It can appear in fine print or contact details if needed.

**SEER / seer-group.com**: The Robobist P1000 is technically a rebrand of the SEER SPT-1000. This must **never appear on the site**. Product images are now served locally from `public/ROBOBIST/` (RPT-FRONTVIEW.png, RPT-SIDEVIEW.png, RPT-HOMEVIEW-cropped.png). Do not add any visible text referencing SEER, SPT-1000, or seer-group anywhere.

## Home Page Structure

Current section order in `src/app/page.tsx`:
`Hero → StatsBar → Features → ProductShowcase → HowItWorks → ServicesSection → FaqSection → CTABanner`

- **ServicesSection** (`src/components/ServicesSection.tsx`) — ecosystem upsell: robot as anchor (from €40k), plus WMS integration, automated doors, network infrastructure, installation, support. Ends with a black CTA card explaining final price depends on warehouse specifics.
- **FaqSection** (`src/components/FaqSection.tsx`) — 8 FAQ accordion items with embedded FAQPage JSON-LD schema. Also exports `faqSchema` used as a `<script>` tag in `page.tsx`.
- **PartnerSection** (`src/components/PartnerSection.tsx`) — exists in codebase but is **not rendered** anywhere. Do not re-add it without explicit instruction.

## SEO

JSON-LD schemas in place:
- `Organization` — `src/app/layout.tsx` (global, with areaServed EU, knowsAbout, contactPoints)
- `Product` + `BreadcrumbList` + `FAQPage` (product-specific) — `src/app/product/layout.tsx`
- `FAQPage` (home page) — inline `<script>` in `src/app/page.tsx` via `faqSchema` export
- `BreadcrumbList` — `src/app/about/layout.tsx`

Site is still **noindex** — do not change `robots` in `src/app/layout.tsx` or `public/robots.txt` until explicitly instructed.

## Key Patterns

**Navbar active indicator**: Uses `useRef` + `offsetLeft`/`offsetWidth` (not `getBoundingClientRect`) to position the sliding orange underline. This avoids scroll-position bugs that occur with framer-motion `layoutId` layout animations.

**Images**: All images are local in `public/ROBOBIST/`. Hero uses `RPT-HOMEVIEW-cropped.png`. Product gallery: `RPT-HOMEVIEW-cropped.png`, `RPT-FRONTVIEW.png`, `RPT-SIDEVIEW.png`. All served via `next/image`.

**Favicons**: Adaptive — `favicon-negru.png` for light mode, `favicon-alb.png` for dark mode, both in `public/ROBOBIST/`.

**Product**: The Robobist P1000 is internally a rebrand of the SEER SPT-1000 — specs are identical. This fact must not appear anywhere on the public site. The product page (`src/app/[locale]/product/page.tsx`) is fully static with hardcoded spec tables. Product naming follows the **P-Series** convention: P = Pallet truck, number = payload in kg (e.g. P1000 = pallet truck, 1000 kg). Future forklifts will use a different letter prefix.

## Translations

All UI text is in `src/lib/translations/` — one file per language (en, ro, de, fr, it, es, pl, nl, pt, cs, hu, sv, da, fi, no). Always update all 14 non-English files when changing visible text, unless explicitly told to do only one language. The `useT()` hook from `src/contexts/LanguageContext.tsx` provides translations in client components.
