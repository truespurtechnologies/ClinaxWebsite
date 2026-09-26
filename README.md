# Clinax Website

Standalone marketing site for **Clinax — The Clinical Operating System for Growing Clinics**, served at
[www.clinax.in](https://www.clinax.in). Clinax is a TrueSpur product; the parent site lives at
[truespur.ai](https://truespur.ai) in a separate repository.

## Origin

This codebase was extracted from the TrueSpur website repository
(`truespurtechnologies/TrueSpurWebsite_Redesigned`), where it shipped as the `/clinax-v2` preview
route. The pre-split state of that repo is preserved under the git tag `clinax-pre-split`.
`truespur.ai/clinax` and `truespur.ai/clinax-v2` now 301-redirect here.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 (utilities only; design tokens live in `components/theme.ts`)
- `@radix-ui/react-accordion` (FAQ), `nodemailer` (demo-request email)
- Deployed on Vercel

## Layout

```
app/
  layout.tsx        root layout: fonts (Caladea + Plus Jakarta Sans), metadata, analytics
  page.tsx          the single landing page, composed from components/
  api/demo/route.ts POST handler for the demo-request form (SMTP, rate-limited)
  robots.ts, sitemap.ts, not-found.tsx
components/         one file per section + content.ts (all copy), theme.ts, motion.ts, ui.tsx
lib/site.ts         SITE_URL, TRUESPUR_URL, CONTACT_EMAIL
lib/rate-limit.ts   in-memory rate limiter used by the API route
public/images/      blurred product screenshots referenced from content.ts
assets/raw/         original screenshots (Physiora-branded) - inputs for scripts/blur-screenshots.mjs, never served
```

## Development

```bash
pnpm install
cp .env.example .env.local   # fill in SMTP values
pnpm dev                     # http://localhost:3000
pnpm lint && pnpm typecheck && pnpm build
```

## Environment variables

See `.env.example`. All of `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `FROM_EMAIL`, `TO_EMAIL` are required
for `/api/demo` to send mail; the route returns 500 with a clear log line if any are missing.
`NEXT_PUBLIC_CONTACT_EMAIL` controls the address shown in the footer and final CTA.

## Editing copy

All text, nav links, FAQ items, feature tabs and screenshot references live in `components/content.ts`.
Colours and heading font are in `components/theme.ts`.
