import type { ReactNode } from "react"
import { C, GRADIENT } from "./theme"

// Marketing showcase of the Clinax clinical-session workflow — an
// intentionally simplified demonstration UI, not the application itself.
// The six-step visit flow and session context stay legible while
// field-level schema, identifiers and internal mechanics are left out.
// One fictional patient story runs through all six steps; the header,
// context strip and stepper stay fixed while only the body changes, so
// the walkthrough reads as one continuous session.

const DONE = { bg: "#E9F6EE", text: "#1E7A46", border: "#C7E5D2" }
const ACTIVE = { bg: "#F3EDFC", border: "rgba(91,15,193,0.45)" }

function Tick({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="5" cy="5" r="4.5" fill={DONE.text} />
      <path d="M3 5.2l1.4 1.4L7 3.8" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Card({ title, sub, aside, children }: { title: string; sub: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-xl border bg-white p-4 sm:p-5" style={{ borderColor: C.lavender }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-bold" style={{ color: C.ink }}>{title}</p>
          <p className="text-[11px]" style={{ color: C.muted }}>{sub}</p>
        </div>
        {aside}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b py-2.5 last:border-0 last:pb-0 first:pt-0" style={{ borderColor: C.lavender }}>
      <span className="text-[11.5px]" style={{ color: C.muted }}>{k}</span>
      <span className="text-[12px] font-semibold text-right" style={{ color: C.ink }}>{v}</span>
    </div>
  )
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="text-[12px] leading-[1.6] border-b py-2.5 last:border-0 last:pb-0 first:pt-0" style={{ color: C.ink, borderColor: C.lavender }}>
      {children}
    </p>
  )
}

function ContextChip({ children, warm }: { children: ReactNode; warm?: boolean }) {
  return (
    <span
      className="rounded-md px-2 py-1 text-[10.5px] font-semibold whitespace-nowrap"
      style={warm ? { background: C.peach, color: C.brown } : { background: C.surface, color: C.muted, border: `1px solid ${C.lavender}` }}
    >
      {children}
    </span>
  )
}

function PainBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="pt-1">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] font-bold tracking-[0.1em] uppercase" style={{ color: C.muted }}>{label}</span>
        <span className="rounded-md px-1.5 py-0.5 text-[10.5px] font-bold" style={{ background: C.peach, color: C.brown }}>{value}/10</span>
      </div>
      <div className="relative mt-2 h-[5px] rounded-full" style={{ background: C.lavender }}>
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${value * 10}%`, background: GRADIENT }} />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white" style={{ left: `${value * 10}%`, border: `2px solid ${C.violet}` }} />
      </div>
    </div>
  )
}

function Progress({ label, done, total }: { label: string; done: number; total: number }) {
  return (
    <div className="border-b py-2.5" style={{ borderColor: C.lavender }}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[11.5px]" style={{ color: C.muted }}>{label}</span>
        <span className="text-[12px] font-semibold" style={{ color: C.ink }}>{done} of {total} sessions</span>
      </div>
      <div className="mt-2 h-[5px] rounded-full" style={{ background: C.lavender }}>
        <div className="h-full rounded-full" style={{ width: `${(done / total) * 100}%`, background: GRADIENT }} />
      </div>
    </div>
  )
}

const BODY: Record<string, ReactNode> = {
  review: (
    <Card title="Continuity check" sub="Where the patient left off">
      <Line k="Previous pain" v="6/10 · last visit" />
      <Line k="Last session" v="Progressing well — plan continues" />
      <Line k="Plan progress" v="8 of 18 sessions" />
      <Line k="Precaution" v="Pain-free range only" />
    </Card>
  ),
  assess: (
    <div className="grid sm:grid-cols-2 gap-3">
      <Card title="Subjective" sub="What the patient reports">
        <Note>Less knee pain than last visit. Stairs still difficult coming down; sleeping through the night.</Note>
        <PainBar label="Pain today" value={4} />
      </Card>
      <Card title="Objective" sub="Findings today">
        <Line k="Range of motion" v="Improving" />
        <Line k="Strength" v="Improving" />
        <Line k="Gait" v="Independent · guarded on stairs" />
        <Line k="Impression" v="On track with plan" />
      </Card>
    </div>
  ),
  treat: (
    <Card title="Today's treatments" sub="Logged during the session">
      {[
        { name: "Therapeutic exercise", dur: "15 min", tag: "Tolerated well", ok: true },
        { name: "Functional strength", dur: "15 min", tag: "Tolerated well", ok: true },
        { name: "Mobility", dur: "10 min", tag: "Modified", ok: false },
      ].map((t) => (
        <div key={t.name} className="flex items-center justify-between gap-3 border-b py-2.5 last:border-0 last:pb-0 first:pt-0" style={{ borderColor: C.lavender }}>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold" style={{ color: C.ink }}>{t.name}</p>
            <p className="text-[11px]" style={{ color: C.muted }}>{t.dur}</p>
          </div>
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold whitespace-nowrap"
            style={t.ok ? { background: DONE.bg, color: DONE.text } : { background: C.peach, color: C.brown }}
          >
            {t.tag}
          </span>
        </div>
      ))}
    </Card>
  ),
  document: (
    <Card
      title="Session note"
      sub="Drafted from today's visit"
      aside={
        <span className="rounded-full px-2.5 py-1 text-[10px] font-bold whitespace-nowrap" style={{ background: C.lavenderTint, color: C.violet }}>
          ✦ AI-assisted draft
        </span>
      }
    >
      {[
        { k: "S", text: "Less knee pain than last visit; stairs remain the main limitation." },
        { k: "O", text: "Range of motion and strength improving; gait independent." },
        { k: "A", text: "Progressing as expected on the current plan." },
        { k: "P", text: "Continue plan; reassess at next visit." },
      ].map((s) => (
        <div key={s.k} className="flex items-start gap-2.5 border-b py-2.5 last:border-0 last:pb-0 first:pt-0" style={{ borderColor: C.lavender }}>
          <span className="mt-px w-4 h-4 rounded flex items-center justify-center text-[9.5px] font-bold shrink-0" style={{ background: C.lavenderTint, color: C.violet }}>
            {s.k}
          </span>
          <p className="text-[12px] leading-[1.6]" style={{ color: C.ink }}>{s.text}</p>
        </div>
      ))}
    </Card>
  ),
  plan: (
    <div className="grid sm:grid-cols-2 gap-3">
      <Card title="Care plan" sub="Reviewed with the patient">
        <Line k="Goal" v="Independent stair descent" />
        <Progress label="Sessions" done={8} total={18} />
        <Line k="Next review" v="In ~2 weeks" />
      </Card>
      <Card title="Home exercise plan" sub="2 exercises assigned">
        {[
          { name: "Quad sets", dose: "3×10 · twice daily", note: "Hold each rep for 5 seconds." },
          { name: "Heel slides", dose: "3×10 · twice daily", note: "Move within a comfortable range." },
        ].map((e) => (
          <div key={e.name} className="border-b py-2.5 last:border-0 last:pb-0 first:pt-0" style={{ borderColor: C.lavender }}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[12.5px] font-semibold" style={{ color: C.ink }}>{e.name}</p>
              <span className="rounded-md px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap" style={{ background: C.lavenderTint, color: C.violet }}>{e.dose}</span>
            </div>
            <p className="mt-0.5 text-[11.5px]" style={{ color: C.muted }}>{e.note}</p>
          </div>
        ))}
      </Card>
    </div>
  ),
  complete: (
    <Card title="Visit summary" sub="Session wrapped up">
      <div className="grid sm:grid-cols-2 gap-x-4">
        {["Assessment completed", "Treatment logged", "Session note completed", "Exercise plan updated"].map((item) => (
          <div key={item} className="flex items-center gap-2 py-1.5">
            <Tick />
            <span className="text-[12px] font-medium" style={{ color: C.ink }}>{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 pt-1 border-t" style={{ borderColor: C.lavender }}>
        <Line k="Next appointment" v="Next week · 10:00" />
        <Line k="Follow-up" v="Scheduled" />
      </div>
    </Card>
  ),
}

export default function ClinicalShowcase({ steps, active }: { steps: { key: string; label: string }[]; active: number }) {
  const step = steps[active]
  return (
    <div
      role="img"
      aria-label={`Clinax therapy session — ${step?.label ?? ""} step of a guided six-step visit workflow`}
      className="px-3.5 py-4 sm:px-6 sm:py-6"
      style={{ background: "#FBFAFE" }}
    >
      <div aria-hidden="true">
        {/* Session header — one fictional patient story across all steps */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="text-[15px] sm:text-[17px] font-bold" style={{ color: C.ink }}>Priya Raman</span>
          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide" style={{ background: C.lavenderTint, color: C.violet }}>
            Therapy Session
          </span>
          <span className="ml-auto text-[11px] font-medium" style={{ color: C.muted }}>Visit 8 of 18</span>
        </div>
        <p className="mt-0.5 text-[11.5px] sm:text-[12px]" style={{ color: C.muted }}>Post-operative knee rehabilitation</p>

        {/* Carried context — the "without losing the thread" hook */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <ContextChip warm>Pain 4/10</ContextChip>
          <ContextChip>Last visit — improving</ContextChip>
          <ContextChip>Goal — independent stair descent</ContextChip>
        </div>

        {/* Six-step workflow — the positioning element */}
        <div className="mt-4 grid grid-cols-6 gap-1 sm:gap-2">
          {steps.map((s, i) => {
            const state = i < active ? "done" : i === active ? "active" : "todo"
            return (
              <div
                key={s.key}
                className="rounded-lg px-1.5 py-1.5 sm:px-2.5 sm:py-2 min-w-0 border"
                style={
                  state === "done"
                    ? { background: DONE.bg, borderColor: DONE.border }
                    : state === "active"
                      ? { background: ACTIVE.bg, borderColor: ACTIVE.border, boxShadow: "0 4px 14px -6px rgba(91,15,193,0.35)" }
                      : { background: C.white, borderColor: C.lavender }
                }
              >
                <div className="flex items-center gap-1">
                  {state === "done" && <Tick size={9} />}
                  <span
                    className="text-[8px] sm:text-[9px] font-bold tracking-[0.08em] uppercase"
                    style={{ color: state === "done" ? DONE.text : state === "active" ? C.violet : C.muted }}
                  >
                    Step {i + 1}
                  </span>
                </div>
                <span
                  className="mt-0.5 block truncate text-[10px] sm:text-[12px] font-semibold leading-tight"
                  style={{ color: state === "todo" ? C.muted : C.ink }}
                >
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Step body — swaps per chapter while the shell stays put */}
        <div key={step?.key} className="cs-step mt-3 sm:mt-4 min-h-[220px] sm:min-h-[240px]">
          {BODY[step?.key ?? "review"]}
        </div>
      </div>

      <style>{`
        @keyframes csStepIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .cs-step { animation: csStepIn 0.35s ease-out; }
      `}</style>
    </div>
  )
}
