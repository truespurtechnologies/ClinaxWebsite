"use client"

import { C, HEADING } from "./theme"
import { HUB_SPOKES, PLATFORM_AREAS } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading } from "./ui"

// ─── Hub-and-spoke diagram (light background) ───────────────────────────────

function HubDiagram({ active }: { active: boolean }) {
  const CX = 300
  const CY = 150
  const spokes = [
    { x: 70, y: 46 },
    { x: 530, y: 46 },
    { x: 70, y: 254 },
    { x: 530, y: 254 },
  ]
  return (
    <svg viewBox="-34 -8 668 316" className="w-full h-auto max-w-[760px] mx-auto" fill="none" aria-hidden="true">
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
      {HUB_SPOKES.map((sp, i) => {
        const s = spokes[i]
        return (
          <g key={sp.label} style={riseStyle(active, 0.2 + i * 0.1, 6)}>
            <rect x={s.x - 92} y={s.y - 30} width="184" height="60" rx="14" fill={C.white} stroke={C.lavender} />
            <circle cx={s.x - 74} cy={s.y} r="4" fill={C.magenta} />
            <text x={s.x - 62} y={s.y - 4} fontSize="12.5" fontWeight="700" fill={C.ink} style={{ fontFamily: "var(--font-cx2-body)" }}>
              {sp.label}
            </text>
            <text x={s.x - 62} y={s.y + 13} fontSize="9.5" fill={C.muted} style={{ fontFamily: "var(--font-cx2-body)" }}>
              {sp.detail}
            </text>
          </g>
        )
      })}
    </svg>
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

        <div ref={cardsRef} className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PLATFORM_AREAS.map((area, i) => (
            <div
              key={area.label}
              className="rounded-2xl p-6 sm:p-7 flex flex-col"
              style={{ ...riseStyle(cardsInView, i * 0.08), background: C.surface, border: `1px solid ${C.lavender}` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.magenta }} />
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
        @media (prefers-reduced-motion: reduce) { #platform * { animation: none !important; transition-duration: 0.01ms !important; } }
      `}</style>
    </section>
  )
}
