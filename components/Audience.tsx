"use client"

import { C, GRADIENT, HEADING } from "./theme"
import { AUDIENCE, AUDIENCE_SUPPORT } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading } from "./ui"

const ICONS = [
  // growing practice: upward trend
  <path key="grow" d="M4 16l4-5 3 3 5-7M16 7h-3M16 7v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  // multi-therapist: people
  <path key="team" d="M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M13 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M2.5 16v-1c0-2 2-3.5 4.5-3.5s4.5 1.5 4.5 3.5v1 M10.5 12.2c.5-.3 1.2-.4 2-.4 2.5 0 4.5 1.5 4.5 3.5v.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  // multi-branch: connected nodes
  <path key="branch" d="M10 3v4M10 13v4M3 10h4M13 10h4M6 6l2 2M14 6l-2 2M6 14l2-2M14 14l-2-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  // rehabilitation: pulse
  <path key="rehab" d="M3 11h4l2-5 3 10 2-5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
]

// Sits directly after the hero so a visitor recognises "this is for clinics
// like mine" before the problem narrative. A single bordered band — a quick
// qualifier, not another card grid.
export default function Audience() {
  const { ref, inView } = useInView(0.2)
  return (
    <section className="py-16 sm:py-20" style={{ background: C.surface, borderBottom: `1px solid ${C.lavender}` }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Who Clinax is for"
          title="Built for growing clinics."
        />

        <div
          ref={ref}
          className="rounded-3xl overflow-hidden"
          style={{ border: `1px solid ${C.lavender}`, ...riseStyle(inView, 0) }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: C.lavender }}>
            {AUDIENCE.map((a, i) => (
              <div
                key={a.title}
                className="flex gap-4 p-6 sm:p-7 bg-white transition-colors duration-200 hover:bg-[#FBF9FE]"
                style={riseStyle(inView, i * 0.08)}
              >
                <span className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-white" style={{ background: GRADIENT }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    {ICONS[i]}
                  </svg>
                </span>
                <div>
                  <h3 className="text-[1.05rem] leading-tight font-bold" style={{ ...HEADING, color: C.ink }}>
                    {a.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.6]" style={{ color: C.muted }}>
                    {a.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-[14px] font-medium" style={{ color: C.muted }}>
          {AUDIENCE_SUPPORT}
        </p>
      </div>
    </section>
  )
}
