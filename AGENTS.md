# AGENTS.md

## Project

Standalone Clinax marketing site (https://clinax.in — apex is canonical; www redirects to it). Next.js 15 App Router, React 19, Tailwind v4, pnpm, Vercel.
Landing page composed from `components/`, plus `/solutions/[slug]` keyword landing pages
(`components/solutions.ts` + `SolutionPage.tsx`), an MDX blog (`content/blog/*.mdx`, registry in
`lib/blog.ts`, `/feed.xml`), and `/privacy` + `/terms` legal pages rendered by `components/LegalPage.tsx`
with copy in `components/legal.ts` (draft pending legal review — no compliance certification claims).
All landing copy in `components/content.ts` (CTA wording comes from the `CTA` const); tokens in
`components/theme.ts`. See README.md for layout, env vars and the SEO section.
CTA convention: "Book a Demo" is the single conversion action — every primary button scrolls to `#demo`;
secondary buttons (`CTA.secondary` = "See It in Action") point at `#product` (proof), never a second label
for the same form. Keep button labels Title Case, form/heading copy sentence case.

## Commands

- `pnpm dev` - local dev server
- `pnpm lint` / `pnpm typecheck` / `pnpm build` - all three should pass before committing

## Conventions

- Components use inline `style` with `C`/`GRADIENT`/`HEADING` from `theme.ts` for brand colours/fonts and
  Tailwind utilities for layout. Do not introduce shadcn/ui or CSS-variable token systems.
- Site-wide URLs and the public contact email live in `lib/site.ts`; do not hardcode `truespur.ai` or
  email addresses in components.
- SEO: page titles/descriptions, OG image, sitemap dates and JSON-LD builders live in `lib/seo.ts`;
  render structured data with `components/JsonLd.tsx` from server components only. Sitemap
  `lastModified` values are hand-maintained dates (`HOME_LAST_MODIFIED`, `Solution.updated`,
  `Post.updated`) — never `new Date()`. Crawlable copy must be in the server-rendered HTML: FAQ answers
  use Radix `forceMount`, inactive product-tour tab copy is rendered `hidden`, never unmounted.
- Copy guardrails apply to solution pages and blog posts too: capabilities only from `content.ts`,
  no quantified outcomes, no certification claims, no competitor names or comparisons. The hero H1
  stays brand-voice; search keywords live in the hero eyebrow, footer descriptor,
  `<title>`/meta and the solution pages.
- `components/Nav.tsx` is route-aware (`usePathname`): anchors smooth-scroll on `/` and become `/#…`
  links elsewhere; `scrollToId` in `motion.ts` falls back to navigation when the target isn't on the page.
- `/api/demo` requires `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`, `TO_EMAIL` env vars. Without
  them it returns a 500 with "Email service is not configured" - that is expected locally.
- `assets/raw/` holds Physiora-branded source screenshots — an archive only; never move them into
  `public/` or serve them. Exception: `Clinax Physiotherapy Clinic in Action.png` is Clinax-branded
  marketing art (same fictional cast as the mockups); its webp derivative is served at
  `public/images/clinic-in-action.webp` in "The Clinax approach" (`WhyClinax`) and its 1200×630 crop
  is the social share image `public/og/clinax-og.jpg` (`scripts/build-og.mjs`). The scenes in
  `assets/raw/Hero Images/` are likewise Clinax-branded marketing art — webp derivatives at
  `public/images/hero/` feed the hero's auto-scrolling slideshow (`HERO_SLIDES` in `content.ts`).
- All product visuals are coded showcase mockups — `components/showcase-ui.tsx` (shared primitives),
  `components/ModuleShowcases.tsx` (Front Desk, Scheduling, Therapist Desk, Management) and
  `components/ClinicalShowcase.tsx` (the six-step session walkthrough in `ProductExperience`); the hero is
  intentionally text-only so product proof lives once, in `#product`. These are deliberately simplified demo UIs, never
  raw application screens: one consistent fictional clinic cast (Priya Raman, Kavitha Raj, Arun Kumar,
  Lakshmi Subramanian; Dr. Ramya/Vikram/Sanjay), coherent numbers across screens, no sidebar IA, role
  badges, identifiers, field-level schema or internal mechanics.
- `assets/Logo/` holds brand source files; `assets/Logo/svg/` holds the SVG masters (vectorised from the
  approved raster by `scripts/trace_logo.py`, needs `pip install vtracer pillow`). Derivatives
  (`public/logo/*.svg|png|webp`, `app/icon.png`, `app/apple-icon.png`) come from `scripts/build-logo.mjs`
  (needs `sharp`). Usage rules: primary/compact lockups on light backgrounds, `-reversed` on dark,
  `clinax-mark` icon for favicon/small contexts. `ClinaxLogo`/`ClinaxMark` in `components/Nav.tsx`
  implement this — the navy wordmark is never placed on dark backgrounds.

## Origin

Extracted from `truespurtechnologies/TrueSpurWebsite_Redesigned` (`/clinax-v2` route). That repo's
pre-split state is tagged `clinax-pre-split`; its `/clinax*` routes now redirect here.
