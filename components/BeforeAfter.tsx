"use client"

import { C, GRADIENT, HEADING } from "./theme"
import { AFTER_ITEMS, BEFORE_ITEMS } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading } from "./ui"

function Cross() {
  return (
    <span className="mt-0.5 w-5 h-5 rounded-full shrink-0 flex items-center justify-center" style={{ background: "#F3DFC9" }}>
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
        <path d="M1.5 1.5l6 6M7.5 1.5l-6 6" stroke={C.brown} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function Check() {
  return (
    <span className="mt-0.5 w-5 h-5 rounded-full shrink-0 flex items-center justify-center" style={{ background: GRADIENT }}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <path d="M2 5.2l2.2 2.2L8 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export default function BeforeAfter() {
  const { ref, inView } = useInView(0.2)
  return (
    <section className="py-24 sm:py-28" style={{ background: C.surface }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="The shift"
          title="From disconnected tools to a connected clinic."
          sub="Your clinic may already use digital tools. The question is whether they talk to each other — or whether your team does it for them."
        />

        <div ref={ref} className="grid lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          {/* Before */}
          <div className="rounded-3xl p-7 sm:p-9 bg-white" style={{ ...riseStyle(inView, 0), border: `1px solid ${C.lavender}` }}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: C.brown }}>
                Before · Fragmented
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: C.peach, color: C.brown }}>
                WhatsApp · Excel · Paper
              </span>
            </div>
            <h3 className="mt-5 text-[1.6rem] sm:text-[1.9rem] leading-tight font-bold" style={{ ...HEADING, color: C.ink }}>
              People connect the information.
            </h3>
            <ul className="mt-7 flex flex-col gap-4">
              {BEFORE_ITEMS.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] leading-[1.55]" style={{ color: C.muted }}>
                  <Cross />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div
            className="relative rounded-3xl p-7 sm:p-9 overflow-hidden text-white"
            style={{ ...riseStyle(inView, 0.12), background: C.violetDeep, border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(600px 300px at 100% 0%, rgba(196,24,147,0.45), transparent 65%)` }}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: C.lavenderTint }}>
                  After · Connected
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.12)", color: C.white }}>
                  One platform
                </span>
              </div>
              <h3 className="mt-5 text-[1.6rem] sm:text-[1.9rem] leading-tight font-bold" style={HEADING}>
                Clinax connects the information.
              </h3>
              <ul className="mt-7 flex flex-col gap-4">
                {AFTER_ITEMS.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] leading-[1.55]" style={{ color: C.lavenderTint }}>
                    <Check />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
