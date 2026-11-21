# Product

<!-- impeccable:product-schema 1 -->

> Provenance: written from the owner's detailed migration brief, the live Framer site (goldsgymiloilo.framer.website, read 2026-11-21) and two confirmed answers (FAQ approach, day-pass handoff). The full init interview was replaced by that brief; items marked (unconfirmed) were not verified with the gym.

## Platform

web

## Stack

Pinned by the brief: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, deployed on Vercel, custom-domain ready. No backend or database.

## Users

People in Iloilo City (especially Mandurriao and Iloilo Business Park) who are deciding whether to visit Gold's Gym Iloilo. Most arrive on a phone, often from social media or a Google listing. Their jobs: check that it is open and where it is, see the actual floor and equipment, meet the coaches, trust that others like it, and claim a free day pass without friction.

## Product Purpose

The public website for Gold's Gym Iloilo, a migration and upgrade of the Framer site. Success is a visitor who can answer "is it open, where is it, is it good, how do I start" within seconds and reaches the Free Day Pass handoff (call, text, or email the gym).

## Positioning

A real Gold's Gym floor in Iloilo with Gym80 strength equipment, three named coaches, and verified Google reviews. A neighbouring gym cannot truthfully copy the Gold's Gym brand, the Gym80 floor, or these specific coaches and reviews.

## Operating Context

- Address: Saint Honore, G/F – Unit A-1A-5, Iloilo Business Park, Mandurriao, Iloilo.
- Hours (Manila time, Asia/Manila): Mon–Fri 6:00 AM – 10:00 PM, Sat–Sun 8:00 AM – 8:00 PM.
- Contact: 0917 327 5902, goldsgymiloilo.management@gmail.com.
- Training zones: Free Weights, Gym80 Strength, Cardio Bay, Functional Training.

## Capabilities and Constraints

- Static marketing site; all four routes: `/`, `/why-gold-s-gym`, `/coaches`, `/reviews-faq`.
- Free Day Pass is a drawer with prefilled SMS / email / call handoff plus copy-number. The site sends and stores nothing (confirmed with owner).
- Zero runtime dependency on Framer; all images are local in `public/images/`.
- No pricing, membership plans, class schedule, or coordinates are published anywhere; none may be invented.

## Brand Commitments

Obsidian canvas `#070708`, Gold's Gym yellow `#F5C400`, Anton + Bebas Neue display, Plus Jakarta Sans body, JetBrains Mono for hours, address and coach tags. The round Gold's Gym seal (`gold-logo.png`) is the logo. Signature device: the gold V-chevron divider.

## Evidence on Hand

- 3 verified 5-star Google reviews: Adrian Zakrzewski, Penny Soliguen, Earl Sicad.
- 3 coaches: Andrew Miano, Vincent Loui Dorde, Jerry Perje (portrait photos on hand; photo-to-name order follows the Framer page, (unconfirmed) by face).
- 9 original photos (athlete, training floor, 3 zone photos, 3 coach portraits, logo).
- Absent: FAQ answers (the Framer FAQ had questions only), a Functional Training photo, a parking photo, coordinates, pricing. Do not fabricate; FAQ answers are drafted conservatively and flagged for owner review.

## Product Principles

1. Answer the first-visit questions (open? where? how do I start?) before any brand storytelling.
2. Real floor, real coaches, real reviews; never stock imagery or invented claims.
3. One hero moment, then quiet, high-contrast, fast pages that work on a mid-range phone.
4. Hand off to a human (call/SMS/email) instantly rather than collecting data the gym has no system to receive.

## Accessibility & Inclusion

WCAG 2.2 AA contrast, full keyboard operation (drawer, accordion, menu), visible focus, and `prefers-reduced-motion` respected with no scroll-jacking.
