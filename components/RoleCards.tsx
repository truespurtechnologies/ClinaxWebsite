"use client"

import { C, GRADIENT, HEADING } from "./theme"
import { ROLES } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading } from "./ui"

const ICONS = [
  // reception: desk/bell
  <path key="r" d="M4 15h14M6 15v-3a5 5 0 0 1 10 0v3M11 6V4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  // therapist: pulse
  <path key="t" d="M3 11h4l2-5 3 10 2-5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  // leadership: chart
  <path key="l" d="M4 17V9M9 17V5M14 17v-6M19 17V8M3 17h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
]

export default function RoleCards() {
  const { ref, inView } = useInView(0.2)
  return (
    <section className="py-24 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Built around your team"
          title="Every role sees exactly what matters to them."
          sub="Clinax isn't organised around software modules. It's organised around how your clinic actually works."
        />
        <div ref={ref} className="grid md:grid-cols-3 gap-5">
          {ROLES.map((r, i) => (
            <div
              key={r.title}
              className="rounded-3xl p-7 sm:p-8 flex flex-col"
              style={{ ...riseStyle(inView, i * 0.1), background: C.surface, border: `1px solid ${C.lavender}` }}
            >
              <span className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ background: GRADIENT }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  {ICONS[i]}
                </svg>
              </span>
              <p className="mt-6 text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: C.violet }}>
                {r.title}
              </p>
              <h3 className="mt-2 text-[1.5rem] leading-tight font-bold" style={{ ...HEADING, color: C.ink }}>
                {r.summary}
              </h3>
              <ul className="mt-6 flex flex-col gap-3">
                {r.tasks.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[14.5px] leading-[1.55]" style={{ color: C.muted }}>
                    <span className="mt-[9px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: C.magenta }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
