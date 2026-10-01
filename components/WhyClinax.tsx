"use client"

import { C, HEADING } from "./theme"
import { WHY_CLINAX } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading } from "./ui"

// Numbered editorial rows — deliberately not another icon-card grid, to vary
// the rhythm in a stretch of card-heavy sections.
export default function WhyClinax() {
  const { ref, inView } = useInView(0.15)
  return (
    <section className="py-24 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Clinax approach"
          title={<>Your clinic has outgrown the workaround. <em style={{ color: C.magenta }}>Now what?</em></>}
          sub="Not a chat app with a spreadsheet behind it. Not a generic billing system with a notes field. A clinical operating system."
        />
        <div ref={ref} className="max-w-5xl mx-auto">
          {WHY_CLINAX.map((item, i) => (
            <div
              key={item.title}
              className="group grid md:grid-cols-12 gap-x-8 gap-y-2 py-7 sm:py-9 items-baseline transition-colors duration-200 hover:bg-[#FBF9FE]"
              style={{ ...riseStyle(inView, i * 0.08), borderTop: `1px solid ${C.lavender}` }}
            >
              <span
                className="md:col-span-2 text-[2.4rem] sm:text-[3rem] leading-none font-bold select-none"
                style={{ ...HEADING, color: C.lavender }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="md:col-span-4 text-[1.3rem] sm:text-[1.45rem] leading-tight font-bold" style={{ ...HEADING, color: C.ink }}>
                {item.title}
              </h3>
              <p className="md:col-span-6 text-[14.5px] leading-[1.7]" style={{ color: C.muted }}>
                {item.text}
              </p>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.lavender}` }} />
        </div>
      </div>
    </section>
  )
}
