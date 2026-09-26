// All copy and structured data for the Clinax page lives here so it can be
// edited without touching component markup.

import { TRUESPUR_URL } from "@/lib/site"

export const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Product", href: "#product" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
]

export const HERO = {
  eyebrow: "The Clinical Operating System",
  headline: "Run your clinic without WhatsApp chaos, spreadsheets and paper files.",
  sub: "Clinax connects reception, therapists and leadership on one platform — so patient records, appointments, clinical notes and branch performance stay connected.",
  primaryCta: "Request a Demo",
  secondaryCta: "See the platform",
  trust: ["Built for physiotherapy & rehab clinics", "Single branch to multi-branch", "Role-based for reception, therapists & leadership", "Now onboarding early clinics"],
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

// Qualitative, illustrative symptoms of a fragmented clinic. Deliberately not
// quantified — see docs/Clinax Product build brief: "Product Accuracy
// Principle" and the plan's credibility guardrails.
export const PAIN_POINTS = [
  { title: "WhatsApp groups", text: "One per branch, per team, per therapist — and the patient update is always in the other one." },
  { title: "Spreadsheets", text: "Appointments, follow-ups, therapist rosters and collections tracked by hand, out of sync by lunchtime." },
  { title: "Paper records", text: "A patient's history split across a paper file, a therapist's memory and someone's notebook." },
  { title: "Manual coordination", text: "Reception, therapists and management stay aligned only because someone spends the day chasing everyone else." },
]

export const BEFORE_ITEMS = [
  "Different tools manage different tasks.",
  "People are responsible for connecting information.",
  "Updates are shared manually, if at all.",
  "Therapists treat without the full patient context.",
  "Leadership finds out about problems after the fact.",
]

export const AFTER_ITEMS = [
  "One patient record from enquiry to every follow-up.",
  "Reception, therapists and leaders share the same context.",
  "Schedules, notes and progress update in real time.",
  "Structured documentation across every therapist and session.",
  "Branch dashboards show what is happening — today.",
]

// The four capability areas shown in the Platform section. Each is backed by
// what the product screenshots actually demonstrate (front desk, schedule,
// therapist/visit workflow, management dashboard).
export const PLATFORM_AREAS = [
  {
    label: "Patient Operations",
    value: "Registration, scheduling and check-in in one flow.",
    bullets: ["Patient registration & search", "Appointment booking across branches", "Front-desk check-in and waiting queue"],
  },
  {
    label: "Clinical Care",
    value: "A structured workflow for every session.",
    bullets: ["Assessment and treatment documentation", "Goals, progress and home exercise plans", "Patient history at the point of care"],
  },
  {
    label: "Clinic Operations",
    value: "Teams and branches working from shared context.",
    bullets: ["Role-based access for reception, therapists & leadership", "Therapist rosters and utilisation", "Branch-aware views as you grow"],
  },
  {
    label: "Management & Insights",
    value: "Visibility without exporting to Excel.",
    bullets: ["Appointments, collections and utilisation dashboards", "Follow-up and drop-off tracking", "Clinical reviews awaiting a decision"],
  },
]

// Kept for the HubDiagram — same four areas, compact labels for the SVG.
export const HUB_SPOKES = [
  { label: "Patient Operations", detail: "Registration & scheduling" },
  { label: "Clinical Care", detail: "Assessment to progress" },
  { label: "Clinic Operations", detail: "Teams & branches" },
  { label: "Management & Insights", detail: "Dashboards & follow-ups" },
]

// Trust/security strip. Confirmed current product capabilities only.
export const TRUST_ITEMS = [
  { title: "Encrypted records", text: "Patient data is encrypted in transit and at rest." },
  { title: "Role-based access", text: "Staff see only what their work requires — nothing more." },
  { title: "Backed up daily", text: "Automatic backups keep your clinic's data recoverable." },
  { title: "Your data stays yours", text: "Full export anytime. No lock-in." },
]

export interface FeatureTab {
  key: string
  label: string
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
    headline: "Start every day with the whole clinic in view.",
    description: "Reception sees arrivals, waiting patients, online sessions and follow-ups from one workspace — no register, no group chat.",
    bullets: ["Today's queue and arrivals at a glance", "Check-in and registration in one flow", "Follow-ups that never fall off the list", "Branch-aware view for multi-location clinics"],
    screen: { src: "/images/front-desk.png", width: 1506, height: 680, alt: "Clinax front desk workspace showing today's appointments and waiting queue" },
  },
  {
    key: "scheduling",
    label: "Scheduling",
    headline: "Know where capacity is — before you book.",
    description: "Therapist availability, appointment density and branch capacity in one connected schedule.",
    bullets: ["Provider-level availability", "Appointment density by hour and day", "Cross-branch view for multi-location clinics", "Reschedule without a phone tree"],
    screen: { src: "/images/schedule.png", width: 1487, height: 665, alt: "Clinax therapist schedule showing provider availability and appointment capacity" },
  },
  {
    key: "therapist",
    label: "Therapist",
    headline: "Give therapists the context they need, when they need it.",
    description: "Previous progress, today's priorities and clinical history in the therapist's working day — at the point of care.",
    bullets: ["Today's patients with history attached", "Progress since the last session", "Priorities and pending documentation", "Works on the treatment floor, not just at a desk"],
    screen: { src: "/images/therapist-dashboard.png", width: 1217, height: 672, alt: "Clinax therapist dashboard showing today's patients and clinical context" },
  },
  {
    key: "clinical",
    label: "Clinical Care",
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

export const ROLES = [
  {
    title: "Reception & Front Desk",
    summary: "The day, organised.",
    tasks: ["See today's arrivals, queue and follow-ups in one view", "Register, check in and reschedule without a phone tree", "Confirm and track follow-ups that used to fall through"],
  },
  {
    title: "Therapists & Clinical Staff",
    summary: "Context at the point of care.",
    tasks: ["Open a session with the patient's full history attached", "Document assessments, treatment and plans as you go", "See today's priorities instead of a paper pile"],
  },
  {
    title: "Clinic Leadership",
    summary: "Visibility across branches.",
    tasks: ["See appointments, collections and utilisation by branch", "Control who can access which branches and records", "Decide on connected information, not fragments"],
  },
]

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
    a: "It depends on branches and scope, but the approach is the same: discover and align, configure, onboard by role, go live with support. Most clinics start on the front desk and scheduling within weeks, not months.",
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
    a: "Request a demo. We walk through Clinax with your workflows in mind, then agree an initial scope and implementation plan with you.",
  },
]

export const FINAL_CTA = {
  headline: "Stop running your clinic from group chats.",
  sub: "See how Clinax brings patients, therapists and branches together — in a demo built around your clinic.",
  bullets: ["Personalised walkthrough with your workflows", "No commitment, no credit card", "We'll get back to you promptly"],
}

export const FOOTER_LINKS = [
  { label: "TrueSpur", href: TRUESPUR_URL },
  { label: "Products", href: `${TRUESPUR_URL}/products` },
  { label: "Contact", href: `${TRUESPUR_URL}/contact` },
]
