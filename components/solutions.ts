// Search-intent landing pages under /solutions/<slug>. Each page targets one
// keyword cluster (see lib/seo.ts KEYWORDS) and is rendered by
// components/SolutionPage.tsx. Copy rules match the homepage: capabilities
// only from what the product does today (components/content.ts), no
// quantified outcomes, no certification claims, no competitor names.
// `updated` feeds the sitemap — bump it when the copy materially changes.

export interface SolutionSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export interface Solution {
  slug: string
  /** <title> — keep under ~60 characters; the "| Clinax" suffix is added by the layout template. */
  title: string
  /** Meta description, under ~155 characters. */
  description: string
  eyebrow: string
  h1: string
  intro: string
  updated: string
  sections: SolutionSection[]
  faqs: { q: string; a: string }[]
  related: string[]
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "physiotherapy-clinic-management-software",
    title: "Physiotherapy Clinic Management Software in India",
    description:
      "Physiotherapy clinic management software for India: scheduling, check-in, structured session notes, care plans, follow-ups and branch dashboards on one patient record.",
    eyebrow: "Physiotherapy clinic management software",
    h1: "Physiotherapy clinic management software built around how a physio session actually runs.",
    intro:
      "Clinax is physiotherapy clinic management software for clinics in India that have outgrown WhatsApp groups, spreadsheets and paper files. Reception, therapists and owners work from one patient record — from the first appointment through assessment, treatment, documentation, care plan and follow-up.",
    updated: "2026-10-11",
    sections: [
      {
        heading: "Why generic clinic software falls short for physiotherapy",
        paragraphs: [
          "A physiotherapy visit is not a ten-minute consultation with a prescription at the end. It is a session: a review of what happened last time, an assessment, a treatment, notes that need to stay consistent across therapists, goals that carry forward and a home exercise plan the patient has to follow between visits. Most clinic management software models a visit as a billing event with a free-text notes field. Physiotherapy clinics end up keeping the clinical story somewhere else — a diary, a WhatsApp thread, a therapist's memory.",
          "Clinax starts from the session. Assessment, treatment log, goals, progress and home exercises are first-class parts of the record, so the therapist on the floor sees the same history the front desk sees at check-in and the owner sees in the dashboard.",
        ],
      },
      {
        heading: "What Clinax covers for a physiotherapy clinic",
        paragraphs: ["Clinax is organised around the roles in a clinic rather than a list of modules."],
        bullets: [
          "Front desk: patient registration and search, appointment booking, check-in, today's queue and a follow-up list that does not fall off the whiteboard.",
          "Scheduling: therapist availability, appointment density by hour and day, and a cross-branch view for multi-location clinics.",
          "Therapist desk: today's patients with history attached, progress since the last session, and pending documentation.",
          "Clinical care: a six-step session workflow — review, assess, treat, document, plan, complete — with subjective and objective notes, treatment log, goals and home exercise plan.",
          "Management: appointments, completions, collections, therapist utilisation and clinical-review visibility per branch and overall.",
        ],
      },
      {
        heading: "Built for Indian physiotherapy clinics as they grow",
        paragraphs: [
          "The typical path is one branch, two or three therapists and a receptionist, then a second branch, more therapists and a manager who needs to know what is happening without visiting. Clinax is designed for that path: role-based access for reception, therapists and leadership, branch-aware views, and dashboards that do not require exporting to Excel.",
          "Patient information is encrypted in transit and at rest, access is role-based and the clinic's data is backed up automatically. Clinax is designed with India's Digital Personal Data Protection expectations in mind; discuss your clinic's specific requirements with our team during the demo.",
        ],
      },
      {
        heading: "How implementation works",
        paragraphs: [
          "Clinics do not have to move everything on day one. Onboarding starts with priority workflows — usually front desk and scheduling — then clinical documentation, then dashboards. Existing patient lists are imported from spreadsheets or exports so reception is not re-typing records. Each role is onboarded separately, with go-live support through the first weeks.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Clinax only for physiotherapy clinics?",
        a: "Clinax is built for physiotherapy and rehabilitation clinics first, with structured clinical workflows for that setting. It is designed so clinics can extend into additional allied-health specialties over time.",
      },
      {
        q: "Does it work for a single-branch clinic?",
        a: "Yes. The same foundation runs a single branch and is designed to support multiple branches and specialties later without starting over.",
      },
      {
        q: "Can therapists use it during the session, not just at a desk?",
        a: "Yes. The therapist view is designed for the treatment floor — history, today's priorities and documentation are available at the point of care.",
      },
      {
        q: "How is pricing structured?",
        a: "Pricing is scoped to your clinic — branches, roles and the workflows you switch on first — and walked through during the demo.",
      },
      {
        q: "Can we import our existing patients?",
        a: "Yes. Existing patient details from spreadsheets or exports are imported during configuration.",
      },
    ],
    related: ["clinic-operating-system", "rehabilitation-centre-software", "multi-branch-clinic-software"],
  },
  {
    slug: "clinic-management-software",
    title: "Clinic Management Software for Growing Clinics in India",
    description:
      "Clinic management software that connects reception, clinicians and owners on one patient record — scheduling, check-in, documentation, follow-ups and branch dashboards.",
    eyebrow: "Clinic management software",
    h1: "Clinic management software that connects the whole clinic, not just the billing desk.",
    intro:
      "Clinax is clinic management software for growing clinics in India, built first for physiotherapy and rehabilitation. Instead of a reception tool here and a notes app there, every team works from one connected record — appointments, check-in, clinical documentation, care plans, follow-ups and management dashboards.",
    updated: "2026-10-11",
    sections: [
      {
        heading: "The problem with running a clinic across five tools",
        paragraphs: [
          "Most clinics did not choose fragmentation; it accumulated. Appointments went into a spreadsheet because it was quick. Patient updates moved to WhatsApp because everyone was already there. Notes stayed on paper because the software's notes field was not built for clinical work. Reports got pieced together by hand at month end. Each tool works on its own, and the gaps between them are where follow-ups are missed, details are typed twice and owners find out late.",
          "Clinic management software should close those gaps. Clinax does that by making one patient record the thing every role works from, so information captured once at the front desk is the information the clinician sees in the room and the owner sees in the dashboard.",
        ],
      },
      {
        heading: "What is inside Clinax",
        paragraphs: ["Four connected areas, each with the view suited to the people who use it."],
        bullets: [
          "Patient operations: registration and search, appointment booking across branches, front-desk check-in and the waiting queue.",
          "Clinical care: structured assessment and treatment documentation, goals, progress and home exercise plans, with history at the point of care.",
          "Clinic operations: role-based access for reception, clinicians and leadership, therapist rosters and utilisation, branch-aware views as you grow.",
          "Management and insights: appointments, collections and utilisation dashboards, follow-up and drop-off tracking, and clinical reviews awaiting a decision.",
        ],
      },
      {
        heading: "Designed for every role",
        paragraphs: [
          "Reception needs today's arrivals, the queue and the follow-up list. Clinicians need the patient's history and today's priorities. Owners and managers need to see appointments, collections and capacity across branches without asking. Clinax gives each role its own working view of the same record, rather than one generic screen everyone has to adapt to.",
        ],
      },
      {
        heading: "Security and data ownership",
        paragraphs: [
          "Clinical information is sensitive. Patient records are encrypted in transit and at rest, access is role-based so staff only see what their work requires, and data is backed up automatically. Your data stays yours: full export anytime, no lock-in.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which kinds of clinics is Clinax for?",
        a: "Physiotherapy and rehabilitation clinics first — single-branch, multi-therapist and multi-branch practices. It is designed to expand across allied health over time.",
      },
      {
        q: "Do we have to replace all our existing tools at once?",
        a: "No. Implementation starts with your priority workflows — typically front desk and scheduling — so teams adopt Clinax step by step.",
      },
      {
        q: "Is it cloud-based?",
        a: "Yes. Clinax is a web application; reception, clinicians and leadership access it from their own devices with role-based permissions.",
      },
      {
        q: "What about patient messaging and payments?",
        a: "Patient communication and payment integrations are scoped with you during discovery alongside the core clinic workflows — we do not assume a specific provider in advance.",
      },
      {
        q: "Who owns the data?",
        a: "Your clinic does. You can export your data at any time.",
      },
    ],
    related: ["physiotherapy-clinic-management-software", "clinic-operating-system", "multi-branch-clinic-software"],
  },
  {
    slug: "clinic-operating-system",
    title: "Clinic Operating System — One Record for the Whole Clinic",
    description:
      "What a clinic operating system is and how Clinax implements one: a single patient record that reception, therapists and leadership all work from, instead of disconnected apps.",
    eyebrow: "Clinic operating system",
    h1: "A clinic operating system: one record every team works from.",
    intro:
      "A clinic operating system is the layer a clinic actually runs on — not another app alongside the diary, the chat group and the spreadsheet, but the connected record underneath all of them. Clinax is a clinical operating system built first for physiotherapy and rehabilitation clinics in India.",
    updated: "2026-10-11",
    sections: [
      {
        heading: "What makes it an operating system rather than clinic software",
        paragraphs: [
          "Clinic software usually means a product that does one job well: appointments, or billing, or notes. An operating system is defined by what connects: the same patient record is created at booking, confirmed at check-in, opened in the treatment room, extended with session notes and a care plan, carried into the follow-up list and summarised in the owner's dashboard. Nothing is re-entered; nothing lives in a side channel.",
          "That is the standard Clinax is designed to. The patient journey — appointment, check-in, clinical context, therapy, documentation, care plan, follow-up, management — is one connected flow, and each step carries forward what the previous step captured.",
        ],
      },
      {
        heading: "Why 'clinical' matters in a clinical operating system",
        paragraphs: [
          "A clinic is not an office with patients. The core of the work is clinical: assessment, treatment, goals and progress. Clinax models those the way a physiotherapy or rehabilitation session actually runs, so the clinical record is structured — not a notes field bolted onto a scheduling tool. That structure is also what lets management see clinical activity and clinical reviews awaiting a decision, not just appointments and collections.",
        ],
      },
      {
        heading: "Designed for every role in the clinic",
        paragraphs: ["Reception, therapists and leadership each get a working view built from how a clinic operates day to day."],
        bullets: [
          "Reception sees arrivals, the waiting queue, online sessions and follow-ups from one workspace.",
          "Therapists see today's patients with history attached and move through a structured session without losing the thread.",
          "Owners and managers see appointments, collections, utilisation and follow-ups per branch and overall.",
        ],
      },
      {
        heading: "Designed to evolve with AI",
        paragraphs: [
          "Because the record is structured, AI-assisted capabilities can be introduced on top of it rather than alongside it — drafting session notes from the structured visit for the therapist to review, turning spoken assessments into structured notes, and suggesting follow-ups from visit outcomes. These capabilities are upcoming and are introduced clinic by clinic as each is ready; the connected record they build on is live today.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a clinic operating system the same as an EMR or HMS?",
        a: "It overlaps. An EMR focuses on the clinical record; hospital management systems focus on hospital-scale administration. A clinic operating system connects the clinical record with front-desk operations and management visibility at clinic scale, for every role.",
      },
      {
        q: "Does the whole clinic have to switch at once?",
        a: "No. Clinics start with priority workflows and add clinical documentation and dashboards as teams adopt them.",
      },
      {
        q: "Which specialties does Clinax support today?",
        a: "Physiotherapy and rehabilitation first. The foundation is designed to extend into additional allied-health specialties.",
      },
      {
        q: "Are the AI features live?",
        a: "Not yet. They are introduced clinic by clinic as each is ready. The connected patient record they build on is live today.",
      },
    ],
    related: ["physiotherapy-clinic-management-software", "clinic-management-software", "multi-branch-clinic-software"],
  },
  {
    slug: "rehabilitation-centre-software",
    title: "Rehabilitation Centre Management Software",
    description:
      "Software for rehabilitation centres: structured treatment journeys across therapists, goals and progress tracking, home exercise plans, follow-ups and management visibility.",
    eyebrow: "Rehabilitation centre software",
    h1: "Rehabilitation centre software for structured treatment journeys across therapists.",
    intro:
      "Rehabilitation is long-form care: many sessions, several therapists, goals that change as the patient progresses. Clinax is built for that — one patient record carrying assessment, treatment, goals, progress and home exercises across every session and every therapist who touches the case.",
    updated: "2026-10-11",
    sections: [
      {
        heading: "Why rehabilitation needs more than appointment software",
        paragraphs: [
          "In a rehabilitation centre the unit of care is the journey, not the visit. A patient might see three therapists across a programme; each needs to know what the others did, what the goals are and how progress is tracking. When that context lives in paper files or in one therapist's memory, sessions start from scratch and handoffs lose detail.",
          "Clinax keeps the journey in one place: previous assessments, the treatment log, goals and progress, and the home exercise plan are attached to the patient and visible to every therapist on the floor.",
        ],
      },
      {
        heading: "What Clinax covers for a rehabilitation centre",
        paragraphs: ["Everything needed to coordinate structured treatment across a team."],
        bullets: [
          "A six-step session workflow — review, assess, treat, document, plan, complete — that keeps documentation consistent across therapists.",
          "Goals, progress and home exercise plans that carry forward between sessions.",
          "Therapist rosters, availability and utilisation so capacity is visible before you book.",
          "Follow-up and drop-off tracking so patients who stop coming are noticed.",
          "Clinical reviews awaiting a decision, surfaced to leadership.",
          "Role-based, branch-aware access for reception, therapists and management.",
        ],
      },
      {
        heading: "Visibility for owners and clinical leads",
        paragraphs: [
          "Rehabilitation leadership needs to see more than appointments and collections: therapist utilisation, pending documentation, follow-ups and clinical activity across the centre. Clinax surfaces these per branch and overall, without exporting to a spreadsheet.",
        ],
      },
      {
        heading: "Getting started",
        paragraphs: [
          "Onboarding begins with your priority workflows and the roles that run them, imports existing patient lists, and brings reception, therapists and leadership live step by step with support through the first weeks. Add therapists, specialties and branches later on the same foundation.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can several therapists work on the same patient?",
        a: "Yes. The patient record — assessments, treatment log, goals, progress and home exercises — is shared, so every therapist sees the full history.",
      },
      {
        q: "Does Clinax track progress against goals?",
        a: "Yes. Goals and progress are part of the structured session record and carry forward between sessions.",
      },
      {
        q: "Is it suitable for a multi-specialty rehabilitation centre?",
        a: "Clinax is built for physiotherapy and rehabilitation first and designed so centres can extend into additional specialties over time.",
      },
      {
        q: "How is patient data protected?",
        a: "Records are encrypted in transit and at rest, access is role-based and data is backed up automatically. You retain full ownership and can export at any time.",
      },
    ],
    related: ["physiotherapy-clinic-management-software", "clinic-operating-system", "multi-branch-clinic-software"],
  },
  {
    slug: "multi-branch-clinic-software",
    title: "Multi-Branch Clinic Management Software",
    description:
      "Multi-branch clinic software: one patient record across locations, branch-aware scheduling, role-based access and per-branch dashboards for owners and managers.",
    eyebrow: "Multi-branch clinic software",
    h1: "Multi-branch clinic software: see every location without visiting every location.",
    intro:
      "The second branch is where spreadsheets and group chats stop working. Clinax gives multi-branch physiotherapy and rehabilitation clinics one patient record across locations, branch-aware scheduling and role-based access, with dashboards owners can read per branch or across the whole clinic.",
    updated: "2026-10-11",
    sections: [
      {
        heading: "What changes when you open a second branch",
        paragraphs: [
          "With one branch the owner is usually in the building. Problems are visible because they are in the room. With two or more branches, problems surface in a phone call or a month-end review — a therapist under-booked for weeks, follow-ups nobody owned, a patient whose history is at the other location. The tools that worked for one site cannot answer a simple question across two.",
          "Clinax is designed for that moment. Patients, teams and dashboards can be viewed per branch or across the whole clinic, and the record follows the patient wherever they are treated.",
        ],
      },
      {
        heading: "What Clinax covers for multi-location clinics",
        paragraphs: ["Branch awareness is built into every role's view rather than added as a report."],
        bullets: [
          "Appointment booking across branches with a cross-branch schedule view.",
          "Branch-aware front-desk workspace for reception at each location.",
          "Therapist rosters, availability and utilisation per branch.",
          "Role-based access: decide who can see which branches and records.",
          "Appointments, completions, collections and follow-ups per branch and overall.",
          "Clinical reviews and pending documentation visible to leadership across locations.",
        ],
      },
      {
        heading: "Grow without starting over",
        paragraphs: [
          "The same foundation that runs one branch supports the next one. Adding a branch, a specialty or a group of therapists happens on the existing record and roles, not in a new system. Clinics typically begin with front desk and scheduling across branches, then bring clinical documentation and dashboards live.",
        ],
      },
      {
        heading: "Security across locations",
        paragraphs: [
          "Role-based, multi-branch access gives each team member relevant access while keeping oversight across locations. Records are encrypted in transit and at rest and backed up automatically, and the clinic retains full ownership of its data.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can a patient be treated at more than one branch?",
        a: "Yes. The patient record is shared across the clinic, so history is available wherever the patient is seen, subject to the access you configure.",
      },
      {
        q: "Can branch managers see only their branch?",
        a: "Yes. Access is role-based and you decide who can access which branches and records; owners can see every branch and the overall picture.",
      },
      {
        q: "We have one branch today but plan to expand. Is Clinax too much?",
        a: "No. Clinax runs a single branch and is designed to add branches later on the same foundation.",
      },
      {
        q: "How long does rolling out to a new branch take?",
        a: "It depends on scope, but a new branch is configured on the existing environment and roles rather than set up from scratch, so it is typically faster than the first.",
      },
    ],
    related: ["physiotherapy-clinic-management-software", "clinic-management-software", "rehabilitation-centre-software"],
  },
]

export const getSolution = (slug: string) => SOLUTIONS.find((s) => s.slug === slug)
