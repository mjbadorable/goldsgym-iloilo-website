# Design system: Gold's Gym Iloilo

Surface mode: **Persuade** (visitor decides to visit and claims a free day pass).
World: the iron floor after dark. Obsidian canvas, one gold, hard type, a single signature device (the gold V-chevron).
Colour strategy: **Restrained**. About 90% obsidian and graphite surfaces; gold only where the eye should go (primary action, active nav, hairlines on hover, the V divider, one hero line).

Source of truth for values is `src/app/globals.css`. Components use semantic utilities (`bg-canvas`, `text-fg`, `text-gold`, `border-line`), never raw hex.

## Colour tokens

| Token | Value | Role |
|---|---|---|
| `--bg-canvas` | `#070708` | Page background (Obsidian) |
| `--bg-surface` | `#101115` | Panels, footer |
| `--bg-elevated` | `#16181E` | Raised panels, drawer |
| `--accent` | `#F5C400` | Gold's Gym yellow: primary buttons, active states, V divider |
| `--accent-hover` | `#FFD014` | Hover for gold |
| `--accent-ink` | `#070708` | Text on gold |
| `--border-hairline` | `rgba(245,196,0,0.25)` | Resting card hairline |
| `--border-subtle` | `rgba(248,250,252,0.12)` | Neutral dividers |
| `--text-primary` | `#F8FAFC` | Body and headings |
| `--text-muted` | `#A1A1AA` | Secondary copy (about 7.9:1 on canvas) |

Contrast checked: gold on canvas about 12:1, `#070708` on gold about 12:1, muted on surface about 7.3:1. All pass AA for body text.

## Fluid layout and type

Defined once in `:root` in `globals.css`; components use the utilities and `text-[length:var(--text-*)]`, never ad-hoc clamps for display text.

| Token | Value | Use |
|---|---|---|
| `--gutter` | `clamp(1.25rem, 4vw, 4.5rem)` | Side padding of every shell |
| `--shell-max` | `1680px` | Max content width |
| `--section-y` | `clamp(3.5rem, 6vw, 6.5rem)` | Vertical rhythm between sections |
| `--text-hero` | `clamp(3.25rem, 7.2vw, 7.25rem)` | Home and About hero headlines (`leading-[0.9]`) |
| `--text-display` | `clamp(2.35rem, 4.8vw, 4.75rem)` | Page headers, section headings, footer headline |
| `--text-subdisplay` | `clamp(1.75rem, 3vw, 2.75rem)` | Secondary headings |
| `--text-body` | `clamp(1rem, 1.05vw, 1.125rem)` | Lead paragraphs |

Utilities: `.shell` (`width: 100%; max-width: var(--shell-max); margin-inline: auto; padding-inline: var(--gutter)`) and `.shell-full` (full width, same gutters, navbar only). They are Tailwind `@utility` rules so breakpoint variants still apply. Full-bleed backdrops (hero photo, banners, ticker, footer surfaces) stay `w-full`; only their content sits in the shell. Body paragraphs keep a readable measure (`max-w-[65ch]` or tighter).

**First screen on Home:** the hero height is `calc(100svh - var(--nav-h) - 116px)` (capped at 860px on lg+) because the highlight strip reserves 116px. Measured strip height is 103px at 1280/1440 and 85px at 1920+, so hero + strip fill exactly one screen at 1280x720, 1440x900 and 1920x1080. If strip copy gets longer, re-check that it stays under 116px.

## Ticker band

`components/home/ticker.tsx` sits between the floor band and the footer: a slim full-bleed gold band (`bg-gold text-gold-ink`, Bebas, `tracking-[0.12em]`) sliding six real facts (Gold's Gym Iloilo, Free Weights, Gym80 Strength, Cardio Bay, Functional Training, Iloilo Business Park) separated by CSS diamonds. Pure CSS `@keyframes` over two identical copies (the second is `aria-hidden`), 48s linear. It pauses on hover and with a visible pause button (WCAG 2.2.2). Under `prefers-reduced-motion` it does not move at all: one static, centred, wrapping copy and no button.

## Typography (`next/font/google`)

| Role | Face | Use |
|---|---|---|
| Display | Anton | Hero and section headlines, uppercase, `leading-[0.95]`, max 6rem |
| Label | Bebas Neue | Nav, buttons, card titles, tracking `0.06em` |
| Body | Plus Jakarta Sans | Paragraphs, 16 to 18px, 1.65 line height, 60 to 72ch measure |
| Data | JetBrains Mono | Opening hours, address, phone and email, coach specialty tags |

Brief-pinned fonts; Plus Jakarta Sans is on the skill's default list but the brief wins.

## Layout and spacing

- 8pt grid. Fluid page shell (see "Fluid layout and type" below): content is capped at `--shell-max` (1680px) with a gutter that grows with the viewport, so 1280, 1440, 1920 and 2560 screens all read as full-width pages rather than a boxed 1280px column.
- Navbar 72px, sticky, solid canvas with a subtle bottom border (no blur). It is edge to edge (`shell-full`): a 3-column grid on md+ puts the logo at the left gutter, the links exactly centred and the CTA at the right gutter.
- Asymmetric 12-column compositions. No centred walls of text.
- Home hero and the About banner are full-bleed: the photo is anchored right (62-64% wide) and blended into the canvas with `.scrim-x` (left-to-right) and `.scrim-y` (bottom), so all copy sits on near-solid dark. On mobile a flat `canvas/65` layer replaces the side blend.
- Home below the hero: a 4-up highlight strip, then the floor band (`components/home/floor-band.tsx`): 3 columns at 1.25fr / 1.1fr / 0.95fr inside `max-w-[1600px]` (photo, pitch + trust row, hours + location card). See "Floor band" under Brief-pinned exceptions.
- About: 4-up zone cards (16:10 photo, gold icon badge, title, copy), then a heading plus 3-up facility strip.
- Coaches and Reviews share `SplitHeader`: headline 7 columns, intro 4 columns marked by a 2px gold rule (a separate element, not a border).
- Coach cards are buttons that open a centered profile modal (`components/coaches/coach-modal.tsx`, `.coach-modal`: portrait 45% / details 55%, max 960px, `--bg-elevated` panel, 1px gold hairline, Previous / Next with wrap-around, `Train with <first name>` hands off to the day-pass drawer). Cards use `.hairline-gold` (60% gold at rest); reviews are three equal-height cards over a faded B/W photo; FAQ is 5 / 7 columns.
- Cards: 0 radius, one elevation method (hairline border, no shadows).

## Headline lockup

Hero and footer share one lockup: "Your strongest" in gold (`text-gold`, `#F5C400`) over "Starts here." in white (`text-fg`).

## Signature device: the gold V-chevron

`.v-divider`: a thin gold rule that drops into a V at centre (the V-taper of a lifter's torso). Used after the About hero, before The Gym Experience, and on top of the footer. Decorative (`aria-hidden`).

## Motion (Emil Kowalski principles; BrewedOps patterns)

- Easing `cubic-bezier(0.22, 1, 0.36, 1)`; UI transitions 160 to 240ms; buttons press to `scale(0.97)`.
- One authored load moment: hero headline lines rise out of masks (640ms, 90ms stagger); hero image settles `1.03 to 1.00` (1100ms). CSS only, so content is never hidden if JS fails.
- Cards: resting 25% gold hairline, hover/focus draws a full 1px gold border (clip-path, 240ms).
- FAQ: real content height animates with `grid-template-rows 0fr to 1fr`.
- Coach profile modal: 240ms opacity + `scale(0.97 to 1)`; details cross-fade on Previous / Next. Dialog behaviour is shared via `lib/use-modal-dialog.ts`.
- Free Day Pass and Watch the Gym: slide-over sheets (`components/ui/sheet.tsx`, native `<dialog>`), 240ms, interruptible; initial focus goes to the Close button.
- Primary nav: a 2px gold bar marks the current page and grows in from the left on hover (`.nav-link`).
- `prefers-reduced-motion` collapses every animation and transition. No scroll-jacking, no looping or pulsing motion.

## Brief-pinned exceptions

The owner explicitly asked for two small label lines that the craft floor would normally refuse: the "Gold's Gym Iloilo" lead line above the hero headline, and "The training floor" above "Built for serious work." They are kept as asked and are the only eyebrow-style labels on the site. The Watch the gym play mark is an authored SVG, not a unicode glyph.

### Floor band (owner-directed athletic split)

The Home floor band deliberately breaks the site's square-edged system, at the owner's direction:

- **Diagonal slash:** on lg+ the floor photo's right edge is clipped to `polygon(0 0, 100% 0, 82% 100%, 0 100%)` (`.floor-photo`) and a solid gold stripe (`.floor-slash`, 12px horizontal width, about 11.8px perpendicular) is drawn on exactly the same slant, plus a short gold rule at the bottom-left. Both polygons share the 82% point; change them together. Below lg the photo is a plain `aspect-[4/3]` rectangle with a 3px gold bottom border (no clipping on small screens).
- **Watermark:** `gold-logo.png` at `opacity-[0.06]`, decorative (`aria-hidden`), behind the right half. Worst-case text contrast over it is still 7.3:1 (muted) / 17.9:1 (white).
- **Italic two-tone headline:** "The training floor" label and "Built for" (white) / "Serious work." (gold) in italic. Anton has no italic, so the browser slants it synthetically.
- **Rounded controls (only here):** the Explore the gym CTA is a gold pill (`rounded-full`), Get directions is `rounded-lg` with a gold outline that fills on hover (`outline-fill` button variant), and the hours card is `rounded-xl` with a `border-gold/45` border and a 1px inset rim highlight from `--border-subtle`.
- **OpenBadge split pill:** solid-gold "Open now" segment with an angled right edge (muted surface segment when closed) joined to a dark segment with the closing / opening time. All pairs are 6.9:1 or better. The wording wraps to two lines in narrow cards rather than overflowing.

## Banned in this build (from the skills)

Eyebrow labels above headings, numbered section markers, gradient text, glass cards, icon-in-a-box feature grids, glow shadows, emoji or unicode glyphs as icons (all icons are authored SVG), purple/indigo gradients, stock or placeholder imagery.

## Imagery

All photos are the gym's own. Originals (untouched) live in `assets/framer-originals/` (downloaded from the Framer site) and `assets/supplied/` (provided by the owner); web-sized files are generated into `public/images/` by `npm run images`. No Framer URL is referenced at runtime.
