"use client"

import { C, GRADIENT, HEADING } from "./theme"
import { WHY_CLINAX } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading } from "./ui"

const ICONS = [
  // rehab workflow: pulse
  <path key="workflow" d="M3 11h4l2-5 3 10 2-5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  // connected journey: linked path
  <path key="journey" d="M4 15c3-6 9-6 12 0 M6 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z M16 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  // every role: people
  <path key="roles" d="M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M13 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M2.5 16v-1c0-2 2-3.5 4.5-3.5s4.5 1.5 4.5 3.5v1 M10.5 12.2c.5-.3 1.2-.4 2-.4 2.5 0 4.5 1.5 4.5 3.5v.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  // grow with branches: expanding nodes
  <path key="grow" d="M10 3v4M10 13v4M3 10h4M13 10h4M6 6l2 2M14 6l-2 2M6 14l2-2M14 14l-2-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
]

export default function WhyClinax() {
  const { ref, inView } = useInView(0.2)
  return (
    <section className="py-24 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why clinics choose Clinax"
          title="Purpose-built for how a rehab clinic actually runs."
          sub="Not a chat app with a spreadsheet behind it. Not a generic billing system with a notes field. A clinical operating system."
        />
        <div ref={ref} className="grid sm:grid-cols-2 gap-5">
          {WHY_CLINAX.map((item, i) => (
            <div
              key={item.title}
              className="rounded-3xl p-7 sm:p-8 flex flex-col"
              style={{ ...riseStyle(inView, i * 0.1), background: C.surface, border: `1px solid ${C.lavender}` }}
            >
              <span className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ background: GRADIENT }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  {ICONS[i]}
                </svg>
              </span>
              <h3 className="mt-6 text-[1.25rem] leading-tight font-bold" style={{ ...HEADING, color: C.ink }}>
                {item.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.65]" style={{ color: C.muted }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
