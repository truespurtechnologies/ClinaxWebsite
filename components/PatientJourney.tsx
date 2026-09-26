"use client"

import { C, GRADIENT, HEADING } from "./theme"
import { JOURNEY_QUOTE, JOURNEY_STEPS } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading } from "./ui"

// Intentionally compact: this section proves the "connected clinic" idea in
// one glance. It is not a second product showcase — no screenshots, no
// feature bullets. See plan guardrail #2.
export default function PatientJourney() {
  const { ref, inView } = useInView(0.25)
  const n = JOURNEY_STEPS.length

  return (
    <section className="py-24 sm:py-28" style={{ background: C.surface }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="The connected journey"
          title="One patient journey. Connected from appointment to follow-up."
          sub="Every step below shares the same record — nobody re-types what already happened."
        />

        {/* Desktop / tablet: single connected track */}
        <div ref={ref} className="hidden sm:block relative">
          <svg viewBox={`0 0 ${(n - 1) * 100} 4`} preserveAspectRatio="none" className="absolute top-[15px] left-0 w-full h-1" aria-hidden="true">
            <line x1="0" y1="2" x2={(n - 1) * 100} y2="2" stroke={C.lavender} strokeWidth="1.5" />
            <line
              x1="0"
              y1="2"
              x2={(n - 1) * 100}
              y2="2"
              pathLength={1}
              stroke="url(#cx2-journey-grad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ strokeDasharray: 1, strokeDashoffset: inView ? 0 : 1, transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1) 0.2s" }}
            />
            <defs>
              <linearGradient id="cx2-journey-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={C.violet} />
                <stop offset="100%" stopColor={C.magenta} />
              </linearGradient>
            </defs>
          </svg>
          <div className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0,1fr))` }}>
            {JOURNEY_STEPS.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center text-center gap-3 px-1" style={riseStyle(inView, 0.1 + i * 0.07, 6)}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{ background: GRADIENT }}>
                  {i + 1}
                </span>
                <span className="text-[12.5px] font-bold leading-tight" style={{ color: C.ink }}>
                  {step.label}
                </span>
                <span className="text-[11px] leading-snug" style={{ color: C.muted }}>
                  {step.carries}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="flex sm:hidden flex-col gap-0">
          {JOURNEY_STEPS.map((step, i) => (
            <div key={step.label} className="flex gap-4" style={riseStyle(inView, 0.06 * i, 6)}>
              <div className="flex flex-col items-center">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{ background: GRADIENT }}>
                  {i + 1}
                </span>
                {i < n - 1 && <span className="w-px flex-1 my-1" style={{ background: C.lavender }} />}
              </div>
              <div className="pb-6">
                <p className="text-[13.5px] font-bold" style={{ color: C.ink }}>{step.label}</p>
                <p className="text-[12px] mt-0.5" style={{ color: C.muted }}>{step.carries}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-14 rounded-3xl px-7 py-8 sm:px-10 sm:py-10 text-center"
          style={{ background: C.violetDeep }}
        >
          <p className="text-[1.35rem] sm:text-[1.6rem] leading-tight font-bold text-white max-w-2xl mx-auto" style={HEADING}>
            &ldquo;{JOURNEY_QUOTE}&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
