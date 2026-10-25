// Single source of truth for site-wide constants. Server code (API route)
// reads FROM/TO from env; these are the public-facing values rendered in UI.

// Canonical domain is the apex clinax.in (product decision); www redirects to
// it. Everything SEO-facing (canonical, sitemap, OG, JSON-LD) derives from
// this constant. NEXT_PUBLIC_SITE_URL exists only as a rollback lever if the
// site must deploy before the apex domain is attached in Vercel.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://clinax.in"
export const SITE_NAME = "Clinax"

// Parent company site — Clinax is a TrueSpur product, but lives on its own domain.
// A build-time constant (no env lookup, so it is never undefined); it is the
// single source for the author metadata URL and the Organization JSON-LD.
export const TRUESPUR_URL = "https://truespur.ai"

// Public contact address shown in the footer / CTA. Override at build time
// via NEXT_PUBLIC_CONTACT_EMAIL once the clinax.in mailbox is provisioned.
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "Clinax@truespur.ai"
