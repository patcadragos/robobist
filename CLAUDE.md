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
- Base price range (€60k–€70k per unit)
- Add-on prices (7 add-ons)
- Volume discount tiers (3%, 6%, 8%, 10+ units)

`calculatePrice(config)` returns `PriceResult` with min/max ranges. `ConfiguratorState` defines the full shape of configurator form data. The configurator page (`src/app/configurator/page.tsx`) is a 5-step multi-page form using `react-hook-form` + `zod`.

## Key Patterns

**Navbar active indicator**: Uses `useRef` + `offsetLeft`/`offsetWidth` (not `getBoundingClientRect`) to position the sliding orange underline. This avoids scroll-position bugs that occur with framer-motion `layoutId` layout animations.

**Images**: Hero uses `/ROBOBIST/RPT-HOMEVIEW-cropped.png` (auto-trimmed version of the original). Product page images are loaded from Seer's CDN (`cdn1.seer-group.com`). All images go through `next/image`.

**Favicons**: Adaptive — `favicon-negru.png` for light mode, `favicon-alb.png` for dark mode, both in `public/ROBOBIST/`.

**Product**: The RPT-1000 is a rebrand of the SEER SPT-1000 — specs are identical. The product page (`src/app/product/page.tsx`) is fully static with hardcoded spec tables.
