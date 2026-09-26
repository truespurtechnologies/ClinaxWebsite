# AGENTS.md

## Project

Standalone Clinax marketing site (www.clinax.in). Next.js 15 App Router, React 19, Tailwind v4, pnpm, Vercel.
Single landing page composed from `components/`; all copy in `components/content.ts`, tokens in `components/theme.ts`.
See README.md for layout and env vars.

## Commands

- `pnpm dev` - local dev server
- `pnpm lint` / `pnpm typecheck` / `pnpm build` - all three should pass before committing

## Conventions

- Components use inline `style` with `C`/`GRADIENT`/`HEADING` from `theme.ts` for brand colours/fonts and
  Tailwind utilities for layout. Do not introduce shadcn/ui or CSS-variable token systems.
- Site-wide URLs and the public contact email live in `lib/site.ts`; do not hardcode `truespur.ai` or
  email addresses in components.
- `/api/demo` requires `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`, `TO_EMAIL` env vars. Without
  them it returns a 500 with "Email service is not configured" - that is expected locally.
- `assets/raw/` holds Physiora-branded source screenshots. Never move them into `public/`. Regenerate the
  blurred `public/images/*.png` with `scripts/blur-screenshots.mjs` (needs `sharp` installed ad hoc).

## Origin

Extracted from `truespurtechnologies/TrueSpurWebsite_Redesigned` (`/clinax-v2` route). That repo's
pre-split state is tagged `clinax-pre-split`; its `/clinax*` routes now redirect here.
