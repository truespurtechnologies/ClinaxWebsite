"use client"

import { C, HEADING } from "./theme"
import { PAIN_POINTS } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading } from "./ui"

const PAIN_ICONS = [
  // chat bubble — WhatsApp groups
  <path key="chat" d="M10 3a7 7 0 0 1 7 7 7 7 0 0 1-7 7c-1.3 0-2.5-.3-3.5-.9L3 17l1-3.3A7 7 0 0 1 3 10a7 7 0 0 1 7-7z" />,
  // spreadsheet grid
  <path key="grid" d="M4 4h12v12H4V4z M4 8.5h12 M9.5 4v12" />,
  // layers — paper records
  <path key="layers" d="M10 3l7 3.5-7 3.5-7-3.5L10 3z M3.5 10.5l6.5 3.25 6.5-3.25 M3.5 14l6.5 3.25L16.5 14" />,
  // people — manual coordination
  <path key="people" d="M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M13 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M2.5 16v-1c0-2 2-3.5 4.5-3.5s4.5 1.5 4.5 3.5v1 M10.5 12.2c.5-.3 1.2-.4 2-.4 2.5 0 4.5 1.5 4.5 3.5v.7" />,
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
              Evenings spent <em className="not-italic" style={{ color: C.magenta }}>reconciling</em> what happened during the day.
            </>
          }
          sub="A growing clinic doesn't run on one system. It runs on a dozen half-systems held together by the people at the front desk."
        />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PAIN_POINTS.map((p, i) => (
            <div
              key={p.title}
              className="rounded-2xl p-6 sm:p-7 flex flex-col"
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
