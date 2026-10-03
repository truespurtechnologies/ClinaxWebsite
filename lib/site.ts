// Single source of truth for site-wide constants. Server code (API route)
// reads FROM/TO from env; these are the public-facing values rendered in UI.

export const SITE_URL = "https://www.clinax.in"
export const SITE_NAME = "Clinax"

// Parent company site — Clinax is a TrueSpur product, but lives on its own domain.
export const TRUESPUR_URL = "https://truespur.ai"

// Public contact address shown in the footer / CTA. Override at build time
// via NEXT_PUBLIC_CONTACT_EMAIL once the clinax.in mailbox is provisioned.
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "Clinax@truespur.ai"
