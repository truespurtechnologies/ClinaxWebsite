// SEO single source of truth: page titles/descriptions, stable lastModified
// dates for the sitemap, and schema.org JSON-LD builders. Keep ranking copy
// (titles, descriptions) here rather than scattered across route files.
//
// lastModified dates are bumped by hand when a page's copy materially
// changes — never `new Date()` at build time, which tells crawlers every
// deploy is fresh content and dilutes the signal.

import { CONTACT_EMAIL, SITE_NAME, SITE_URL, TRUESPUR_URL } from "./site"

export const DEFAULT_TITLE = "Clinax — Clinical Operating System for Physiotherapy & Rehab Clinics"
export const TITLE_TEMPLATE = "%s | Clinax"
export const DEFAULT_DESCRIPTION =
  "Clinax is physiotherapy clinic management software built as one clinical operating system — reception, therapists and leadership on one patient record. India-first."

export const OG_IMAGE = {
  url: "/og/clinax-og.jpg",
  width: 1200,
  height: 630,
  alt: "A physiotherapy clinic running Clinax — appointments at the front desk and a therapist documenting a session on a tablet",
}

export const KEYWORDS = [
  "physiotherapy clinic management software",
  "physiotherapy software India",
  "physio clinic software",
  "clinic management software",
  "clinic operating system",
  "clinical operating system",
  "rehabilitation centre management software",
  "multi-branch clinic software",
  "physiotherapy practice management software",
]

// Canonical page registry consumed by app/sitemap.ts. Solution pages and blog
// posts register themselves via components/solutions.ts and lib/blog.ts.
export const HOME_LAST_MODIFIED = "2026-10-11"
export const LEGAL_LAST_MODIFIED = "2026-09-30"

export const abs = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`)

// ─── JSON-LD ───────────────────────────────────────────────────────────────

const ORG_ID = `${TRUESPUR_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`
const APP_ID = `${SITE_URL}/#software`

// Public brand profiles. Fill in as they are created (LinkedIn, Crunchbase,
// software directories) — consistent sameAs links are what win the brand SERP
// against the unrelated "Clinax" pharma product. Do not list the org's own
// website here; sameAs is for third-party profiles.
export const SAME_AS: string[] = []

export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "TrueSpur",
    url: TRUESPUR_URL,
    // No TrueSpur master logo is shipped in this repo; the Clinax lockup is
    // the public brand mark for the Clinax product entity.
    logo: abs("/logo/clinax-lockup.png"),
    email: CONTACT_EMAIL,
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    brand: { "@type": "Brand", name: SITE_NAME, url: SITE_URL, logo: abs("/logo/clinax-mark.png") },
    ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
  }
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE_NAME,
    alternateName: "Clinax Clinical Operating System",
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  }
}

export function softwareLd() {
  return {
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: SITE_NAME,
    url: SITE_URL,
    image: abs(OG_IMAGE.url),
    description: DEFAULT_DESCRIPTION,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Clinic management software",
    operatingSystem: "Web",
    audience: { "@type": "BusinessAudience", audienceType: "Physiotherapy and rehabilitation clinics" },
    areaServed: "IN",
    provider: { "@id": ORG_ID },
    featureList: [
      "Patient registration and scheduling",
      "Front-desk check-in and follow-up tracking",
      "Structured physiotherapy session documentation",
      "Goals, progress and home exercise plans",
      "Role-based access for reception, therapists and leadership",
      "Multi-branch dashboards and reporting",
    ],
  }
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  }
}

export function webPageLd(opts: { path: string; title: string; description: string; dateModified: string }) {
  return {
    "@type": "WebPage",
    "@id": `${abs(opts.path)}#webpage`,
    url: abs(opts.path),
    name: opts.title,
    description: opts.description,
    inLanguage: "en-IN",
    dateModified: opts.dateModified,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": APP_ID },
    publisher: { "@id": ORG_ID },
  }
}

export function articleLd(opts: {
  path: string
  title: string
  description: string
  datePublished: string
  dateModified: string
  image?: string
}) {
  return {
    "@type": "Article",
    "@id": `${abs(opts.path)}#article`,
    mainEntityOfPage: abs(opts.path),
    headline: opts.title,
    description: opts.description,
    image: abs(opts.image ?? OG_IMAGE.url),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: "en-IN",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  }
}

// Wraps one or more nodes in a single @graph document.
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes }
}
