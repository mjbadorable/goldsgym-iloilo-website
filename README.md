# Gold's Gym Iloilo website

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, migrated from the Framer site. Deployed on Vercel.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Unit tests: opening-hours logic and content checks (`node:test`) |
| `npm run build` | Production build |
| `npm run images` | Rebuild `public/images/` from `assets/framer-originals/` and `assets/supplied/` |

## Structure

- `src/app/`: routes `/`, `/why-gold-s-gym`, `/coaches`, `/reviews-faq`, plus 404, sitemap, robots.
- `src/content/`: all copy and data (zones, coaches, reviews, FAQ, tour photos and Reels). Edit here, not in components.
- `src/lib/hours.ts`: opening hours and the live Open/Closed status (Asia/Manila). Tested.
- `src/components/ui/sheet.tsx`: shared slide-over (native dialog) used by the Free Day Pass drawer (`day-pass/`, every day-pass button opens it) and the Watch the Gym dialog (`gym-tour/`).
- `DESIGN.md`: tokens, type, motion rules. `PRODUCT.md`: audience, facts, constraints.

## Before launch (owner review)

1. **FAQ answers** in `src/content/faq.tsx` are drafted conservatively; the Framer site had questions only. Replace with real policy.
2. **Coach photo order** follows the Framer page; confirm each portrait matches its name (`src/content/coaches.ts`).
3. **Functional Training** uses a yellow-plate floor photo as a stand-in; swap in a conditioning/sled shot in `src/content/zones.ts` when available.
4. Set `NEXT_PUBLIC_SITE_URL` in Vercel to the production domain (used for metadata, sitemap, structured data).

## Notes

- Next 16 with Cache Components: anything reading the clock stays in a client component (`OpenBadge`).
- `next/image` qualities are restricted to `[75, 85]` in `next.config.ts`; use one of those.
- Originals are untouched in `assets/framer-originals/` and `assets/supplied/`; `npm run images` writes the web versions. The site never requests Framer.
- Facebook Reels open on facebook.com in a new tab; nothing from Facebook is embedded.
