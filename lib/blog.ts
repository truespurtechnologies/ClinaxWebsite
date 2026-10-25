// Blog post registry. Article bodies are content/blog/<slug>.mdx; metadata
// lives here (typed, greppable, and importable by the sitemap/feed without
// compiling MDX). Newest first. Keep `description` under ~155 characters and
// bump `updated` when the body materially changes.

export interface Post {
  slug: string
  title: string
  /** Shorter document <title> only; H1, social titles, RSS and Article headline keep `title`. */
  seoTitle?: string
  description: string
  published: string
  updated: string
  /** Solution page this article supports — rendered as the "Read next" link. */
  solution?: string
  readingMinutes: number
}

export const POSTS: Post[] = [
  {
    slug: "physiotherapy-clinic-management-software-what-to-look-for",
    title: "Physiotherapy clinic management software: what to look for in India (2026)",
    seoTitle: "Choosing physiotherapy clinic management software in India",
    description:
      "A practical checklist for choosing physiotherapy clinic management software in India — session-based records, roles, multi-branch visibility, data ownership and onboarding.",
    published: "2026-10-11",
    updated: "2026-10-11",
    solution: "physiotherapy-clinic-management-software",
    readingMinutes: 8,
  },
  {
    slug: "what-is-a-clinical-operating-system",
    title: "What is a clinical operating system — and how is it different from clinic software?",
    seoTitle: "What is a clinical operating system?",
    description:
      "Clinic software does one job. A clinical operating system connects the whole clinic around one patient record. Here is the difference and why it matters for physiotherapy.",
    published: "2026-10-11",
    updated: "2026-10-11",
    solution: "clinic-operating-system",
    readingMinutes: 6,
  },
  {
    slug: "running-a-clinic-on-whatsapp-and-spreadsheets",
    title: "Running a clinic on WhatsApp and spreadsheets: the hidden costs",
    description:
      "WhatsApp groups and spreadsheets feel free. For a growing physiotherapy clinic they cost follow-ups, double entry, lost context and late surprises for owners.",
    published: "2026-10-11",
    updated: "2026-10-11",
    solution: "clinic-management-software",
    readingMinutes: 6,
  },
  {
    slug: "opening-a-second-physiotherapy-branch-operations-checklist",
    title: "Opening a second physiotherapy branch: an operations checklist",
    seoTitle: "Opening a second physiotherapy branch: operations checklist",
    description:
      "What changes operationally when a physiotherapy clinic opens its second branch — scheduling, records, roles, follow-ups, reporting — and how to prepare before day one.",
    published: "2026-10-11",
    updated: "2026-10-11",
    solution: "multi-branch-clinic-software",
    readingMinutes: 7,
  },
  {
    slug: "structured-soap-documentation-for-physiotherapy-sessions",
    title: "Structured SOAP documentation for physiotherapy sessions",
    description:
      "How to keep physiotherapy session notes consistent across therapists with a structured SOAP workflow — review, assess, treat, document, plan, complete.",
    published: "2026-10-11",
    updated: "2026-10-11",
    solution: "rehabilitation-centre-software",
    readingMinutes: 7,
  },
  {
    slug: "dpdp-and-patient-data-what-physiotherapy-clinics-should-understand",
    title: "DPDP and patient data: what physiotherapy clinics should understand",
    seoTitle: "DPDP and patient data for physiotherapy clinics",
    description:
      "A plain-language orientation to India's Digital Personal Data Protection Act for physiotherapy clinic owners — the questions to ask about consent, access, storage and exports.",
    published: "2026-10-11",
    updated: "2026-10-11",
    solution: "clinic-management-software",
    readingMinutes: 7,
  },
]

export const getAllPosts = () => [...POSTS].sort((a, b) => (a.published < b.published ? 1 : -1))
export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug)
