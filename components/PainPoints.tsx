"use client"

import { C, HEADING } from "./theme"
import { PAIN_POINTS } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading, CARD_HOVER } from "./ui"

const PAIN_ICONS = [
  // bell — follow-ups that fall through
  <path key="bell" d="M10 3.5a4.5 4.5 0 0 0-4.5 4.5c0 3-1 4.5-2 5.5h13c-1-1-2-2.5-2-5.5A4.5 4.5 0 0 0 10 3.5z M8.5 16.5a1.5 1.5 0 0 0 3 0" />,
  // overlapping documents — the same details, typed twice
  <path key="dup" d="M7.5 4.5H16V13h-2.5 M4.5 7.5h8.5V16h-8.5z" />,
  // eye — sessions without context
  <path key="eye" d="M2.5 10s3-5 7.5-5 7.5 5 7.5 5-3 5-7.5 5-7.5-5-7.5-5z M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
  // warning triangle — owners find out late
  <path key="alert" d="M10 4l7 11.5H3L10 4z M10 8.5v3 M10 14h.01" />,
]

export default function PainPoints() {
  const { ref, inView } = useInView(0.2)
  return (
    <section className="py-24 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Sound familiar?"
          title={
            <>
              Evenings spent <em style={{ color: C.magenta }}>reconciling</em> what happened during the day.
            </>
          }
          sub="A growing clinic doesn't run on one system. It runs on a dozen half-systems held together by the people at the front desk."
        />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PAIN_POINTS.map((p, i) => (
            <div
              key={p.title}
              className={`rounded-2xl p-6 sm:p-7 flex flex-col ${CARD_HOVER}`}
              style={{ ...riseStyle(inView, i * 0.08), background: C.peach, border: "1px solid #F3DFC9" }}
            >
              <span className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "#F3DFC9", color: C.brown }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {PAIN_ICONS[i]}
                </svg>
              </span>
              <p className="text-[1.15rem] leading-tight font-bold" style={{ ...HEADING, color: C.brown }}>
                {p.title}
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.6]" style={{ color: C.ink }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[1.5rem] sm:text-[1.9rem] font-bold leading-tight" style={{ ...HEADING, color: C.ink }}>
            You opened a clinic to treat patients,
            <br />
            not to be the integration layer.
          </p>
        </div>
      </div>
    </section>
  )
}
