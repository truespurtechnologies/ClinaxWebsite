"use client"

import { C, HEADING } from "./theme"
import { INTELLIGENCE } from "./content"
import { useInView, riseStyle } from "./motion"
import { Eyebrow } from "./ui"

// Product-direction aside, not a feature block: one contained dark panel on a
// white section. Every capability is explicitly labelled "Upcoming" — none are
// presented as live.
export default function Intelligence() {
  const { ref, inView } = useInView(0.2)
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div
          ref={ref}
          className="relative rounded-3xl px-7 py-10 sm:px-12 sm:py-14 overflow-hidden"
          style={{ ...riseStyle(inView, 0), background: C.violetDeep, border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(700px 400px at 100% 0%, rgba(196,24,147,0.35), transparent 65%)` }}
            aria-hidden="true"
          />
          <div className="relative">
            <div className="max-w-2xl">
              <Eyebrow dark>{INTELLIGENCE.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-[1.9rem] sm:text-[2.4rem] leading-[1.1] font-bold tracking-[-0.01em] text-white" style={HEADING}>
                {INTELLIGENCE.title}
              </h2>
              <p className="mt-5 text-[1rem] sm:text-[1.05rem] leading-[1.7]" style={{ color: C.lilac }}>
                {INTELLIGENCE.sub}
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {INTELLIGENCE.items.map((item, i) => (
                <div
                  key={item.title}
                  className="rounded-2xl p-5 sm:p-6"
                  style={{ ...riseStyle(inView, 0.15 + i * 0.08), background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <span
                    className="inline-block text-[10px] font-bold tracking-[0.14em] uppercase rounded-full px-2.5 py-1"
                    style={{ background: "rgba(196,24,147,0.28)", color: C.lavenderTint, border: "1px solid rgba(196,24,147,0.45)" }}
                  >
                    Upcoming
                  </span>
                  <h3 className="mt-3.5 text-[1.05rem] leading-tight font-bold text-white" style={HEADING}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.6]" style={{ color: C.lilac }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[13px] font-medium max-w-xl" style={{ color: C.lilac }}>
              {INTELLIGENCE.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
