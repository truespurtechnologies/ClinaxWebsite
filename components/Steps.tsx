"use client"

import { C, GRADIENT, HEADING } from "./theme"
import { STEPS, STEPS_REASSURANCE } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading } from "./ui"

export default function Steps() {
  const { ref, inView } = useInView(0.2)
  return (
    <section id="how-it-works" className="py-24 sm:py-28 scroll-mt-20" style={{ background: C.surface }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Live on Clinax in four steps."
          sub="Start with what matters most. Validate it in real operations. Then grow — on the same foundation."
        />

        <div ref={ref} className="relative grid md:grid-cols-4 gap-5">
          {/* connector */}
          <div className="hidden md:block absolute top-[38px] left-[12%] right-[12%] h-px" style={{ background: C.lavender }} aria-hidden="true">
            <div className="h-full" style={{ background: GRADIENT, width: inView ? "100%" : "0%", transition: "width 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s" }} />
          </div>

          {STEPS.map((s, i) => (
            <div key={s.n} className="relative flex flex-col items-start md:items-center md:text-center" style={riseStyle(inView, 0.15 + i * 0.15)}>
              <span
                className="relative z-10 w-[76px] h-[76px] rounded-2xl flex items-center justify-center text-white text-[1.35rem] font-bold shadow-[0_14px_30px_-14px_rgba(91,15,193,0.7)]"
                style={{ ...HEADING, background: GRADIENT }}
              >
                {s.n}
              </span>
              <h3 className="mt-6 text-[1.25rem] font-bold" style={{ ...HEADING, color: C.ink }}>
                {s.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] max-w-[280px]" style={{ color: C.muted }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 text-center text-[15px] font-medium max-w-xl mx-auto" style={{ color: C.muted }}>
          {STEPS_REASSURANCE}
        </p>
      </div>
    </section>
  )
}
