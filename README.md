# Gold's Gym Iloilo website

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, migrated from the Framer site. Deployed on Vercel.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Unit tests for the opening-hours logic (`node:test`) |
| `npm run build` | Production build |
| `npm run images` | Rebuild `public/images/` from `assets/framer-originals/` |

## Structure

- `src/app/`: routes `/`, `/why-gold-s-gym`, `/coaches`, `/reviews-faq`, plus 404, sitemap, robots.
- `src/content/`: all copy and data (zones, coaches, reviews, FAQ). Edit here, not in components.
- `src/lib/hours.ts`: opening hours and the live Open/Closed status (Asia/Manila). Tested.
- `src/components/day-pass/`: the Free Day Pass drawer. Every day-pass button opens it.
- `DESIGN.md`: tokens, type, motion rules. `PRODUCT.md`: audience, facts, constraints.

## Before launch (owner review)

1. **FAQ answers** in `src/content/faq.tsx` are drafted conservatively; the Framer site had questions only. Replace with real policy.
2. **Coach photo order** follows the Framer page; confirm each portrait matches its name (`src/content/coaches.ts`).
3. **Functional Training** has no photo. Add one to `public/images/` and set `image` in `src/content/zones.ts`.
4. Set `NEXT_PUBLIC_SITE_URL` in Vercel to the production domain (used for metadata, sitemap, structured data).

## Notes

- Next 16 with Cache Components: anything reading the clock stays in a client component (`OpenBadge`).
- `next/image` qualities are restricted to `[75, 85]` in `next.config.ts`; use one of those.
- Original Framer images are untouched in `assets/framer-originals/`; the site never requests Framer.
