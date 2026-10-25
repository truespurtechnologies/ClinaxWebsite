# Clinax Website

Standalone marketing site for **Clinax — The Clinical Operating System for Growing Clinics**, served at
[clinax.in](https://clinax.in) (`www.clinax.in` redirects to the apex). Clinax is a TrueSpur product; the parent site lives at
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
  layout.tsx        root layout: fonts (Caladea + Plus Jakarta Sans), metadata, analytics,
                    Organization + WebSite JSON-LD
  page.tsx          the landing page, composed from components/ (+ SoftwareApplication/FAQPage JSON-LD)
  solutions/        /solutions index + /solutions/[slug] keyword landing pages
                    (content: components/solutions.ts, template: components/SolutionPage.tsx)
  blog/             /blog index + /blog/[slug] MDX articles (bodies: content/blog/*.mdx,
                    registry: lib/blog.ts, typography: mdx-components.tsx)
  feed.xml/         RSS feed for the blog
  privacy/, terms/  legal pages rendered via components/LegalPage.tsx
  api/demo/route.ts POST handler for the demo-request form (SMTP, rate-limited)
  robots.ts, sitemap.ts, not-found.tsx
components/         one file per section + content.ts (all copy), legal.ts (legal copy),
                    theme.ts, motion.ts, ui.tsx, JsonLd.tsx; product visuals are coded showcase
                    mockups: showcase-ui.tsx (shared primitives), ModuleShowcases.tsx,
                    ClinicalShowcase.tsx — deliberately simplified demo UIs, never raw
                    application screenshots
lib/site.ts         SITE_URL, TRUESPUR_URL, CONTACT_EMAIL
lib/seo.ts          default title/description/keywords, OG image, sitemap dates, JSON-LD builders
lib/blog.ts         blog post registry (metadata; bodies live in content/blog/)
lib/rate-limit.ts   in-memory rate limiter used by the API route
content/blog/       MDX article bodies, one per post slug
scripts/build-og.mjs  regenerates public/og/clinax-og.jpg (1200x630 share image)
assets/raw/         original product screenshots (Physiora-branded) — source archive
                    only, never served or copied into public/
```

## SEO

- Every route builds its metadata with `pageMetadata()` from `lib/seo.ts`: one self-referencing
  canonical, a complete Open Graph/Twitter set, and an RSS autodiscovery link only on `/` and `/blog`.
  Titles use the `%s | Clinax` template. The root layout holds site-wide defaults only — never a
  canonical or `og:url` — so a route without `pageMetadata()` gets no canonical rather than the
  homepage's. Posts may set `seoTitle` to shorten the document `<title>` only; the H1, social titles,
  RSS and Article headline keep `title`. `app/not-found.tsx` is `noindex, follow` with no canonical.
- `app/sitemap.ts` reads stable `lastModified` dates from `lib/seo.ts`, `components/solutions.ts`
  (`updated`) and `lib/blog.ts` (`updated`). Bump those dates when copy materially changes —
  never use `new Date()`.
- Structured data is emitted via `components/JsonLd.tsx` using builders in `lib/seo.ts`.
  Add public brand profiles (LinkedIn, Crunchbase, software directories) to `SAME_AS` as they are created.
- Search Console / Bing verification tokens come from `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
  and `NEXT_PUBLIC_BING_SITE_VERIFICATION` (see `.env.example`).
- Adding a blog post: create `content/blog/<slug>.mdx`, then add its entry to `POSTS` in `lib/blog.ts`
  (newest first). Adding a solution page: add an entry to `SOLUTIONS` in `components/solutions.ts`
  and a link in `FOOTER_SOLUTIONS` (`components/content.ts`).

## Deployment

Canonical domain is the **apex `clinax.in`** (see `lib/site.ts`); `www.clinax.in` redirects to it.
Attach **both** domains in the Vercel project, set `www` to redirect to the apex, and do that
*before* deploying a build whose `SITE_URL` is the apex — otherwise `https://clinax.in` has no
certificate and canonicals temporarily point at a broken host. (`clinax.in`'s DNS already points at
Vercel, so no DNS change is needed.) If a deploy must go out before the apex is attached, set
`NEXT_PUBLIC_SITE_URL=https://www.clinax.in` for that build as a temporary rollback.

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
Legal page copy (Privacy Policy, Terms of Service — draft pending legal review) lives in `components/legal.ts`.
Colours and heading font are in `components/theme.ts`.
