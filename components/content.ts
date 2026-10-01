// All copy and structured data for the Clinax page lives here so it can be
// edited without touching component markup.

import { TRUESPUR_URL } from "@/lib/site"

export const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Product", href: "#product" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
]

// CTA wording used across nav, hero, product section, sticky bar and final
// CTA. Clinax is live and onboarding its first clinics — the primary action
// is requesting early access, with booking a demo as the secondary path.
export const CTA = {
  primary: "Request Early Access",
  secondary: "Book a Demo",
  status: "Now onboarding early clinics",
}

export const HERO = {
  eyebrow: "The Clinical Operating System",
  icp: "Built for growing physiotherapy & rehabilitation clinics.",
  headline: "Run your clinic without WhatsApp chaos, spreadsheets and paper files.",
  sub: "Clinax connects reception, therapists, patients and leadership on one operating system — so appointments, treatment plans, clinical documentation and branch performance stay connected as you grow.",
  primaryCta: CTA.primary,
  secondaryCta: "See the platform",
  trust: ["One connected journey — appointment to recovery", "Single branch to multi-branch", "Role-based for reception, therapists & leadership"],
}

export const CAPABILITIES = [
  "Patient Management",
  "Appointments & Scheduling",
  "Reception Operations",
  "Clinical Documentation",
  "Treatment & Sessions",
  "Patient Progress",
  "Teams & Access",
  "Branch Operations",
  "Dashboards & Reporting",
  "Follow-up Tracking",
  "Therapist Utilisation",
  "Multi-Specialty Ready",
]

// Qualitative, illustrative symptoms of a fragmented clinic — framed as
// consequences, not tool names (the concrete tool inventory lives in
// BeforeAfter). Deliberately not quantified — see docs/Clinax Product build
// brief: "Product Accuracy Principle" and the plan's credibility guardrails.
export const PAIN_POINTS = [
  { title: "Follow-ups that fall through", text: "The patient due a call-back is remembered at 9pm — or not at all." },
  { title: "The same details, typed twice", text: "Reception re-enters what the therapist already wrote down — and the two versions quietly drift apart." },
  { title: "Sessions without context", text: "Treatment starts from whatever the therapist remembers, not the patient's full history." },
  { title: "Owners find out late", text: "Branch problems surface in a call or a month-end review — never in time to act on them." },
]

// The concrete tools the work is actually scattered across — named artifacts
// land harder than abstract statements. Icon keys map to the tile glyphs in
// BeforeAfter.tsx.
export const BEFORE_ITEMS = [
  { icon: "sheet", title: "Appointments in a spreadsheet" },
  { icon: "chat", title: "Patient updates in WhatsApp" },
  { icon: "file", title: "Notes in paper files" },
  { icon: "report", title: "Reports pieced together by hand" },
]

export const BEFORE_FOOT = "Disconnected information creates more admin, missed context and harder handoffs."

export const AFTER_PIPELINE = [
  { verb: "Book", text: "Appointment & intake" },
  { verb: "Treat", text: "Visits & care plans" },
  { verb: "Track", text: "Progress & follow-up" },
  { verb: "Grow", text: "Insights across branches" },
]

export const AFTER_FOOT = "Everyone works from a more complete picture of the patient journey."

// The four capability areas shown in the Platform section. Each is backed by
// what the product screenshots actually demonstrate (front desk, schedule,
// therapist/visit workflow, management dashboard). `detail` is the compact
// line inside the HubDiagram spoke box, `value` is the hover tooltip / card
// tagline, and `bullets` only render in the mobile fallback cards.
export const PLATFORM_AREAS = [
  {
    label: "Patient Operations",
    detail: "Registration & scheduling",
    value: "Registration, scheduling and check-in in one flow.",
    bullets: ["Patient registration & search", "Appointment booking across branches", "Front-desk check-in and waiting queue"],
  },
  {
    label: "Clinical Care",
    detail: "Assessment to progress",
    value: "A structured workflow for every session.",
    bullets: ["Assessment and treatment documentation", "Goals, progress and home exercise plans", "Patient history at the point of care"],
  },
  {
    label: "Clinic Operations",
    detail: "Teams & branches",
    value: "Teams and branches working from shared context.",
    bullets: ["Role-based access for reception, therapists & leadership", "Therapist rosters and utilisation", "Branch-aware views as you grow"],
  },
  {
    label: "Management & Insights",
    detail: "Dashboards & follow-ups",
    value: "Visibility without exporting to Excel.",
    bullets: ["Appointments, collections and utilisation dashboards", "Follow-up and drop-off tracking", "Clinical reviews awaiting a decision"],
  },
]

export const TRUST_INTRO =
  "Clinical information is sensitive. Clinax is designed with the access, visibility and data protection considerations that modern clinics need."

// Trust/security strip. Confirmed current product capabilities only. The
// HIPAA/DPDP phrasing stays non-certifying (no "compliant"/"certified" claims)
// — flag in the legal-review pass alongside legal.ts.
export const TRUST_ITEMS = [
  { title: "Privacy-minded by design", text: "Built with HIPAA and India's DPDP data protection expectations in mind — discuss your clinic's requirements with our team." },
  { title: "Encrypted patient records", text: "Patient information is protected with encryption in transit and at rest." },
  { title: "Role-based, multi-branch access", text: "Give each team member relevant access while keeping oversight across locations." },
  { title: "Backed up daily", text: "Automatic backups keep your clinic's data recoverable." },
  { title: "Your data stays yours", text: "Full export anytime. No lock-in." },
]

export interface FeatureTab {
  key: string
  label: string
  role: string
  headline: string
  description: string
  bullets: string[]
  screen: { src: string; width: number; height: number; alt: string }
  subSteps?: { key: string; label: string; src?: string; width?: number; height?: number; alt?: string }[]
}

export const FEATURE_TABS: FeatureTab[] = [
  {
    key: "front-desk",
    label: "Front Desk",
    role: "Reception",
    headline: "Start every day with the whole clinic in view.",
    description: "Reception sees arrivals, waiting patients, online sessions and follow-ups from one workspace — no register, no group chat.",
    bullets: ["Today's queue and arrivals at a glance", "Check-in and registration in one flow", "Follow-ups that never fall off the list", "Branch-aware view for multi-location clinics"],
    screen: { src: "/images/front-desk.png", width: 1506, height: 680, alt: "Clinax front desk workspace showing today's appointments and waiting queue" },
  },
  {
    key: "scheduling",
    label: "Scheduling",
    role: "All roles",
    headline: "Know where capacity is — before you book.",
    description: "Therapist availability, appointment density and branch capacity in one connected schedule.",
    bullets: ["Provider-level availability", "Appointment density by hour and day", "Cross-branch view for multi-location clinics", "Reschedule without a phone tree"],
    screen: { src: "/images/schedule.png", width: 1487, height: 665, alt: "Clinax therapist schedule showing provider availability and appointment capacity" },
  },
  {
    key: "therapist",
    label: "Therapist",
    role: "Therapists",
    headline: "Give therapists the context they need, when they need it.",
    description: "Previous progress, today's priorities and clinical history in the therapist's working day — at the point of care.",
    bullets: ["Today's patients with history attached", "Progress since the last session", "Priorities and pending documentation", "Works on the treatment floor, not just at a desk"],
    screen: { src: "/images/therapist-dashboard.png", width: 1217, height: 672, alt: "Clinax therapist dashboard showing today's patients and clinical context" },
  },
  {
    key: "clinical",
    label: "Clinical Care",
    role: "Therapists",
    headline: "Move through the session without losing the thread.",
    description: "A structured six-step clinical workflow — review, assess, treat, document, plan and complete — that keeps documentation consistent across every therapist and every session.",
    bullets: ["Subjective and objective assessment notes", "Today's treatment log", "Goals, progress and home exercise plan", "Visit summary and next appointment"],
    screen: { src: "/images/visit-assess.png", width: 1235, height: 650, alt: "Clinax therapy session workflow showing the assessment step" },
    subSteps: [
      { key: "review", label: "Review" },
      { key: "assess", label: "Assess", src: "/images/visit-assess.png", width: 1235, height: 650, alt: "Clinax therapy session — assessment step with subjective and objective notes" },
      { key: "treat", label: "Treat", src: "/images/visit-treat.png", width: 1227, height: 672, alt: "Clinax therapy session — treatment step with today's treatment log" },
      { key: "document", label: "Document" },
      { key: "plan", label: "Plan", src: "/images/visit-plan.png", width: 1227, height: 672, alt: "Clinax therapy session — care-plan step with goals and home exercise plan" },
      { key: "complete", label: "Complete", src: "/images/visit-complete.png", width: 1232, height: 652, alt: "Clinax therapy session — completion step with summary and next appointment" },
    ],
  },
  {
    key: "management",
    label: "Management",
    role: "Leadership",
    headline: "See what is happening across your clinic.",
    description: "Appointments, collections, therapist utilisation, follow-ups, clinical activity and branch visibility for owners and managers — per branch and overall.",
    bullets: ["Appointments, completions and collections at a glance", "Therapist utilisation and capacity", "Follow-up and clinical-review visibility", "Branch-level reporting without exporting to Excel"],
    screen: { src: "/images/management-dashboard.png", width: 1492, height: 682, alt: "Clinax management dashboard showing clinic operations and performance" },
  },
]

// Connected patient journey — kept intentionally compact and text-led. See
// SECTION 6 of the brief: this proves the "connected clinic" idea, it is not
// a second product showcase.
export const JOURNEY_STEPS = [
  { label: "Appointment", carries: "Booking details" },
  { label: "Check-in", carries: "Patient identity & visit reason" },
  { label: "Clinical Context", carries: "History & last visit" },
  { label: "Therapy", carries: "Assessment & treatment" },
  { label: "Documentation", carries: "Session notes" },
  { label: "Care Plan", carries: "Goals & home exercises" },
  { label: "Follow-up", carries: "Next steps" },
  { label: "Management", carries: "Visibility across it all" },
]

export const JOURNEY_QUOTE = "Capture information once. Carry it through the patient's journey."

// "Who Clinax is for" — makes the ICP explicit early in the page. The beachhead
// stays physiotherapy & rehabilitation; "growing" practices with increasing
// operational complexity are the deepest fit, without excluding single-branch
// clinics.
export const AUDIENCE = [
  { title: "Growing Physiotherapy Practices", text: "Clinics moving beyond spreadsheets, WhatsApp and paper as they grow." },
  { title: "Multi-Therapist Clinics", text: "Practices where scheduling, therapist capacity, patient handoffs and daily coordination are becoming difficult." },
  { title: "Multi-Branch Practices", text: "Owners and managers who need visibility across branches, teams, patients and operations." },
  { title: "Rehabilitation Centres", text: "Organisations managing structured treatment journeys across therapists and rehabilitation services." },
]

export const AUDIENCE_SUPPORT = "Starting with physiotherapy and rehabilitation. Designed to expand across allied health."

// Product direction — AI-assisted capabilities. Every item is upcoming; none
// are presented as live. The narrative is workflow → structured data →
// intelligence → AI, not "AI-powered clinic software".
export const INTELLIGENCE = {
  eyebrow: "Designed to evolve with AI",
  title: "Intelligence built into the workflow.",
  sub: "Clinax first understands how a rehabilitation clinic actually runs — one connected workflow, one structured record. AI-assisted capabilities are introduced on that foundation, to reduce the administrative work around clinical care.",
  items: [
    { title: "AI-assisted clinical documentation", text: "Session notes drafted from the structured visit, reviewed by the therapist." },
    { title: "Voice-to-note", text: "Speak assessments and treatment notes; Clinax structures them into the record." },
    { title: "Follow-up assistance", text: "Follow-ups and nudges suggested from visit outcomes and care plans." },
    { title: "Operational insights", text: "Signals across utilisation, follow-ups and branch performance." },
  ],
  note: "The connected patient record these build on is live today. Each capability is introduced clinic by clinic, as it is ready.",
}

export const STEPS = [
  { n: "01", title: "Discover & Align", text: "We confirm your priority workflows, branches and roles — starting with what matters most." },
  { n: "02", title: "Configure & Prepare", text: "Your environment, branches, users and workflows are set up. Existing patient lists are imported." },
  { n: "03", title: "Onboard & Go Live", text: "Reception, therapists and leadership are onboarded by role, with go-live support through the first weeks." },
  { n: "04", title: "Grow", text: "Add specialties, therapists and branches on the same foundation — without starting over." },
]

export const STEPS_REASSURANCE = "You don't have to transform everything on day one. Clinax starts with your priority workflows and grows with you."

// Product philosophy / differentiation — replaces the old competitor
// comparison matrix. No claims about named or unnamed competitors.
export const WHY_CLINAX = [
  {
    title: "Built around rehabilitation workflows",
    text: "Assessment, treatment, goals and progress are modelled the way a physiotherapy or rehab session actually runs — not a notes field bolted onto generic clinic software.",
  },
  {
    title: "One connected patient journey",
    text: "Appointment, check-in, clinical context, therapy, documentation, care plan and follow-up share the same record — not separate tools someone has to reconcile.",
  },
  {
    title: "Designed for every role",
    text: "Reception, therapists and leadership each get the view suited to their work, built from how a clinic actually operates day to day — not a set of generic modules.",
  },
  {
    title: "Built to grow with branches and specialties",
    text: "The same foundation that runs one branch is designed to support multiple branches and specialties as your clinic grows — without starting over.",
  },
]

export const FAQS = [
  {
    q: "Can therapists see the patient's history at the point of care?",
    a: "Yes. Every therapist sees previous assessments, treatment logs, goals and progress for the patient in front of them — on the treatment floor, not just at the desk.",
  },
  {
    q: "Does Clinax support multiple branches?",
    a: "Yes. Clinax is designed to grow from a single branch to a multi-branch, multi-specialty organisation. Patients, teams and dashboards can be viewed per branch or across the whole clinic.",
  },
  {
    q: "Who can see what? How is access controlled?",
    a: "Access is role-based. Reception, therapists and leadership each get the views and actions relevant to their work, and you decide who can access which branches and records.",
  },
  {
    q: "Do we have to replace all our existing tools on day one?",
    a: "No. Implementation starts with your priority workflows — typically front desk and scheduling, then clinical documentation, then dashboards — so teams adopt Clinax step by step.",
  },
  {
    q: "How long does onboarding take?",
    a: "It depends on branches and scope, but the approach is the same: discover and align, configure, onboard by role, go live with support. The goal is to have your front desk and scheduling live within weeks, not months.",
  },
  {
    q: "Can Clinax adapt to our clinic's workflows?",
    a: "Clinax is configured around your priority workflows, branches and roles during onboarding, rather than forcing your clinic into a fixed structure.",
  },
  {
    q: "Is Clinax only for physiotherapy?",
    a: "Clinax is built for physiotherapy and rehabilitation clinics first, with structured clinical workflows for that setting — and designed so clinics can extend into additional specialties over time.",
  },
  {
    q: "Can we import our existing patient list?",
    a: "Yes. Existing patient details from spreadsheets or exports are imported during configuration so reception is not re-typing records on day one.",
  },
  {
    q: "What about WhatsApp reminders and payments?",
    a: "Patient communication and payment integrations are scoped with you during discovery, alongside the core clinic workflows — we don't assume a specific provider in advance.",
  },
  {
    q: "Is our patient data secure?",
    a: "Yes. Patient records are encrypted in transit and at rest, access is role-based so staff only see what their work requires, and your data is backed up automatically. You retain full ownership and can export your data at any time.",
  },
  {
    q: "How is Clinax priced?",
    a: "Pricing is scoped to your clinic — branches, roles and the workflows you switch on first — rather than a one-size-fits-all plan. We walk through it during the demo so you can weigh it against the tools and hours it replaces.",
  },
  {
    q: "How do we get started?",
    a: "Request early access. We walk through Clinax with your workflows in mind, then agree an initial scope and implementation plan with you.",
  },
]

export const FINAL_CTA = {
  eyebrow: "Now onboarding early clinics",
  headline: "Stop running your clinic from group chats.",
  sub: "Clinax is live and onboarding its first clinics. Tell us about yours — we'll walk you through the platform with your workflows in mind.",
  bullets: ["Personalised walkthrough with your workflows", "No commitment, no credit card", "We'll get back to you promptly"],
  // Unattributed positioning line, not a testimonial.
  quote: "From the front desk to the treatment room — everything in one place.",
}

export const FOOTER_LINKS = [
  { label: "TrueSpur", href: TRUESPUR_URL },
  { label: "Products", href: `${TRUESPUR_URL}/products` },
  { label: "Contact", href: `${TRUESPUR_URL}/contact` },
]

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
]
