"use client"

import { useState } from "react"
import { C, GRADIENT, HEADING } from "./theme"
import { PLATFORM_AREAS } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading, CARD_HOVER } from "./ui"

// Card icons — one per platform area, matching the Audience card icon style.
const AREA_ICONS = [
  // Patient Operations — calendar + check-in
  <path key="cal" d="M4.5 4.5h11A1.5 1.5 0 0 1 17 6v9.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 15.5V6a1.5 1.5 0 0 1 1.5-1.5zM3 8.25h14M6.75 3v3M13.25 3v3M6.75 12.5l2 2 3.75-4.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  // Clinical Care — clipboard + pulse
  <path key="clip" d="M7.5 4.5H5.75A1.5 1.5 0 0 0 4.25 6v9.5A1.5 1.5 0 0 0 5.75 17h8.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H12.5M7.75 3.75a2.25 2.25 0 0 1 4.5 0v.75h-4.5zM6.5 12.5h1.75l1.5-3.25 1.75 5 1.25-2.25h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  // Clinic Operations — branch tree
  <path key="tree" d="M12 3.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM6.75 15a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 1 1 3.5 0zM16.75 15a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 1 1 3.5 0zM10 5.5V10M5 10h10M5 10v3.25M15 10v3.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  // Management & Insights — bar chart
  <path key="bars" d="M3.5 16.5h13M6.25 16.5v-5.5M10 16.5V8.75M13.75 16.5V4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
]

// ─── Hub-and-spoke diagram (light background) ───────────────────────────────

function HubDiagram({ active }: { active: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const CX = 300
  const CY = 150
  const spokes = [
    { x: 70, y: 46 },
    { x: 530, y: 46 },
    { x: 70, y: 254 },
    { x: 530, y: 254 },
  ]
  return (
    <div className="relative max-w-[760px] mx-auto">
    <svg viewBox="-34 -8 668 316" className="w-full h-auto" fill="none" role="group" aria-label="Clinax platform areas">
      <defs>
        <linearGradient id="cx2-core-light" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.violet} />
          <stop offset="100%" stopColor={C.magenta} />
        </linearGradient>
        <filter id="cx2-glow-light" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* lines */}
      {spokes.map((s, i) => {
        const dir = s.x < CX ? 1 : -1
        const d = `M${s.x + dir * 92} ${s.y} C ${CX - dir * 90} ${s.y}, ${CX - dir * 110} ${CY}, ${CX - dir * 64} ${CY}`
        return (
          <g key={i}>
            <path d={d} stroke={C.lavender} strokeWidth="1.5" />
            <path
              d={d}
              pathLength={1}
              stroke="url(#cx2-core-light)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ strokeDasharray: 1, strokeDashoffset: active ? 0 : 1, transition: `stroke-dashoffset 1s ease-out ${0.3 + i * 0.12}s` }}
            />
            <circle r="3.5" fill={C.magenta} style={{ opacity: 0, offsetPath: `path("${d}")`, animation: active ? `cx2FlowLight 3.6s ease-in-out ${1.4 + i * 0.6}s infinite` : "none" }} />
          </g>
        )
      })}

      {/* core */}
      <circle cx={CX} cy={CY} r="70" fill={C.magenta} opacity="0.22" filter="url(#cx2-glow-light)" />
      <circle cx={CX} cy={CY} r="60" fill="url(#cx2-core-light)" />
      <circle cx={CX} cy={CY} r="60" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <text x={CX} y={CY - 6} textAnchor="middle" fontSize="17" fontWeight="800" fill="white" letterSpacing="0.02em" style={{ fontFamily: "var(--font-cx2-body)" }}>
        Clinax
      </text>
      <text x={CX} y={CY + 13} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="white" opacity="0.85" letterSpacing="0.16em" style={{ fontFamily: "var(--font-cx2-body)" }}>
        CLINICAL OS
      </text>

      {/* spokes */}
      {PLATFORM_AREAS.map((sp, i) => {
        const s = spokes[i]
        return (
          <g
            key={sp.label}
            className="spoke"
            tabIndex={0}
            aria-label={`${sp.label}: ${sp.value}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            style={{ ...riseStyle(active, 0.2 + i * 0.1, 6), cursor: "pointer" }}
          >
            <rect className="spoke-box" x={s.x - 92} y={s.y - 30} width="184" height="60" rx="14" fill={C.white} stroke={C.lavender} />
            <text x={s.x - 74} y={s.y - 4} fontSize="12.5" fontWeight="700" fill={C.ink} style={{ fontFamily: "var(--font-cx2-body)" }}>
              {sp.label}
            </text>
            <text x={s.x - 74} y={s.y + 13} fontSize="9.5" fill={C.muted} style={{ fontFamily: "var(--font-cx2-body)" }}>
              {sp.detail}
            </text>
          </g>
        )
      })}
    </svg>

    {/* hover/focus tooltips — positioned from the viewBox (-34 -8 668 316),
        hanging toward the centre so they never collide with the heading */}
    {PLATFORM_AREAS.map((sp, i) => {
      const s = spokes[i]
      const topSpoke = s.y < CY
      const edgeY = topSpoke ? s.y + 30 : s.y - 30
      return (
        <div
          key={sp.label}
          aria-hidden="true"
          className="pointer-events-none absolute z-10 w-52 rounded-xl bg-white px-4 py-3 text-[13px] leading-snug font-medium shadow-lg transition-all duration-200"
          style={{
            left: `${((s.x + 34) / 668) * 100}%`,
            top: `${((edgeY + 8) / 316) * 100}%`,
            transform: topSpoke
              ? `translate(-50%, ${hovered === i ? 10 : 18}px)`
              : `translate(-50%, calc(-100% - ${hovered === i ? 10 : 18}px))`,
            opacity: hovered === i ? 1 : 0,
            border: `1px solid ${C.lavender}`,
            color: C.violet,
          }}
        >
          {sp.value}
        </div>
      )
    })}
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function Platform() {
  const { ref, inView } = useInView(0.25)
  const { ref: cardsRef, inView: cardsInView } = useInView(0.15)

  return (
    <section id="platform" className="py-24 sm:py-28 scroll-mt-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="The platform"
          title={<>One platform. Every moving part of your clinic.</>}
          sub="Patient operations, clinical care, clinic operations and leadership visibility — connected, from a single branch to a multi-specialty organisation."
        />

        <div ref={ref} className="hidden md:block">
          <HubDiagram active={inView} />
        </div>

        {/* Detail cards render on every breakpoint — the hub diagram's hover
            tooltips are a nice-to-have on desktop, not the only way to read
            the detail, so desktop/tablet readers aren't shown less than
            mobile readers. */}
        <div ref={cardsRef} className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PLATFORM_AREAS.map((area, i) => (
            <div
              key={area.label}
              className={`rounded-2xl px-6 py-6 flex flex-col ${CARD_HOVER}`}
              style={{ ...riseStyle(cardsInView, i * 0.08), background: C.surface, border: `1px solid ${C.lavender}` }}
            >
              <span className="w-9 h-9 rounded-lg flex items-center justify-center text-white" style={{ background: GRADIENT }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  {AREA_ICONS[i]}
                </svg>
              </span>
              <p className="mt-4 text-[15px] font-bold" style={{ ...HEADING, color: C.ink }}>
                {area.label}
              </p>
              <p className="mt-2 text-[14px] leading-[1.55] font-medium" style={{ color: C.violet }}>
                {area.value}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {area.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[13.5px] leading-normal" style={{ color: C.muted }}>
                    <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ background: C.lilac }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cx2FlowLight { 0% { offset-distance: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
        #platform .spoke .spoke-box { transition: stroke 0.2s ease; }
        #platform .spoke:hover .spoke-box, #platform .spoke:focus .spoke-box, #platform .spoke:focus-visible .spoke-box { stroke: ${C.violet}; }
        #platform .spoke:focus, #platform .spoke:focus-visible { outline: none; }
        @media (prefers-reduced-motion: reduce) { #platform * { animation: none !important; transition-duration: 0.01ms !important; } }
      `}</style>
    </section>
  )
}
