"use client"

import type { ReactNode } from "react"
import { C, GRADIENT, HEADING } from "./theme"
import { AFTER_FOOT, AFTER_PIPELINE, BEFORE_FOOT, BEFORE_ITEMS } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading, CARD_HOVER } from "./ui"

// Tool-tile glyphs for the "before" card — one line icon per scattered tool.
const TILE_ICONS: Record<string, ReactNode> = {
  sheet: (
    <>
      <path d="M3.5 4.5h13v11h-13z" />
      <path d="M3.5 8.4h13" />
      <path d="M3.5 12.2h13" />
      <path d="M8 4.5v11" />
    </>
  ),
  chat: (
    <path d="M10 3.2c-3.5 0-6.3 2.4-6.3 5.4 0 1.2.5 2.4 1.3 3.3l-1.2 3.4 3.7-1.1c.8.3 1.6.4 2.5.4 3.5 0 6.3-2.4 6.3-5.4S13.5 3.2 10 3.2z" />
  ),
  file: (
    <>
      <path d="M6 3.5h5L14.5 7v9.5H6z" />
      <path d="M11 3.5V7h3.5" />
      <path d="M8 10.5h4M8 13h4" />
    </>
  ),
  report: (
    <>
      <path d="M7.5 3.5h5v2.5h-5z" />
      <path d="M7.5 4.5H5.5v12h9v-12h-2" />
      <path d="M8 13v-2.4M10 13V9.6M12 13v-1.6" />
    </>
  ),
}

function SeamArrow({ mobile = false }: { mobile?: boolean }) {
  return (
    <span
      className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-[0_12px_28px_-10px_rgba(91,15,193,0.75)]"
      style={{ background: GRADIENT, boxShadow: `0 0 0 6px ${C.surface}, 0 12px 28px -10px rgba(91,15,193,0.75)` }}
      aria-hidden="true"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={mobile ? "rotate-90" : ""}>
        <path d="M3 9h11M10.5 5l4 4-4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
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
          eyebrow="A more connected way to work"
          title={
            <>
              Less chasing information. <em style={{ color: C.magenta }}>More moving care forward.</em>
            </>
          }
          sub="From first contact to follow-up, Clinax keeps the details together so nothing important gets lost between people or places."
        />

        <div ref={ref} className="relative grid lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          {/* Before — the scattered toolkit */}
          <div className={`rounded-3xl p-7 sm:p-9 bg-white ${CARD_HOVER}`} style={{ ...riseStyle(inView, 0), border: `1px solid ${C.lavender}` }}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: C.brown }}>
                Before Clinax
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: C.peach, color: C.brown }}>
                WhatsApp · Excel · Paper
              </span>
            </div>
            <h3 className="mt-5 text-[1.6rem] sm:text-[1.9rem] leading-tight font-bold" style={{ ...HEADING, color: C.ink }}>
              Too many tools. Not enough clarity.
            </h3>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              {BEFORE_ITEMS.map((item, i) => (
                <li
                  key={item.title}
                  className="rounded-2xl px-4 py-4 flex flex-col gap-3"
                  style={{
                    ...riseStyle(inView, 0.15 + i * 0.08),
                    background: C.surface,
                    border: `1px dashed ${C.lavender}`,
                    transform: `${inView ? "translate(0,0)" : "translate(0,14px)"} rotate(${i % 2 === 0 ? -1.1 : 1.1}deg)`,
                  }}
                >
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: C.peach, color: C.brown }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {TILE_ICONS[item.icon]}
                    </svg>
                  </span>
                  <span className="text-[13.5px] leading-snug font-semibold" style={{ color: C.muted }}>
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-7 text-[13.5px] leading-[1.6]" style={{ color: C.muted }}>
              {BEFORE_FOOT}
            </p>
          </div>

          {/* Seam arrow — down on mobile, bridging the gap on desktop */}
          <div className="lg:hidden flex justify-center -my-5 relative z-10">
            <SeamArrow mobile />
          </div>
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <SeamArrow />
          </div>

          {/* After — one connected pipeline */}
          <div
            className={`relative rounded-3xl p-7 sm:p-9 overflow-hidden text-white ${CARD_HOVER}`}
            style={{ ...riseStyle(inView, 0.12), background: C.violetDeep, border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(600px 300px at 100% 0%, rgba(196,24,147,0.45), transparent 65%)` }}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: C.lavenderTint }}>
                  With Clinax
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.12)", color: C.white }}>
                  One platform
                </span>
              </div>
              <h3 className="mt-5 text-[1.6rem] sm:text-[1.9rem] leading-tight font-bold" style={HEADING}>
                One connected clinical workflow.
              </h3>

              {/* Horizontal pipeline (sm and up) */}
              <div className="mt-9 hidden sm:block relative">
                <div className="absolute top-[21px] left-[11%] right-[11%] h-px" style={{ background: "rgba(255,255,255,0.16)" }} aria-hidden="true">
                  <div
                    className="h-full"
                    style={{ background: `linear-gradient(90deg, ${C.magenta}, #F29ED6)`, width: inView ? "100%" : "0%", transition: "width 1.3s cubic-bezier(0.22,1,0.36,1) 0.45s" }}
                  />
                </div>
                <div className="relative grid grid-cols-4">
                  {AFTER_PIPELINE.map((step, i) => (
                    <div key={step.verb} className="flex flex-col items-center text-center gap-3 px-1" style={riseStyle(inView, 0.3 + i * 0.12, 10)}>
                      <span
                        className="h-[42px] inline-flex items-center rounded-full px-4 text-[13.5px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(196,24,147,0.9)]"
                        style={{ background: GRADIENT, border: "1px solid rgba(255,255,255,0.22)" }}
                      >
                        {step.verb}
                      </span>
                      <span className="text-[11px] leading-snug" style={{ color: C.lilac }}>
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical rail on xs */}
              <div className="mt-8 flex sm:hidden flex-col">
                {AFTER_PIPELINE.map((step, i) => (
                  <div key={step.verb} className="flex gap-4" style={riseStyle(inView, 0.2 + i * 0.08, 8)}>
                    <div className="flex flex-col items-center">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{ background: GRADIENT, border: "1px solid rgba(255,255,255,0.22)" }}>
                        {i + 1}
                      </span>
                      {i < AFTER_PIPELINE.length - 1 && <span className="w-px flex-1 my-1" style={{ background: "rgba(255,255,255,0.18)" }} />}
                    </div>
                    <div className="pb-6">
                      <p className="text-[14.5px] font-bold">{step.verb}</p>
                      <p className="text-[12.5px] mt-0.5" style={{ color: C.lilac }}>{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-[13.5px] leading-[1.6]" style={{ color: C.lilac }}>
                {AFTER_FOOT}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
