"use client"

import Image from "next/image"
import { C, HEADING } from "./theme"
import { CAPABILITIES, HERO } from "./content"
import { PrimaryButton, GhostButton, Eyebrow } from "./ui"

function CheckDot() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="7" fill={C.magenta} fillOpacity="0.25" />
      <path d="M4 7.2l2 2 4-4.4" stroke={C.white} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ProductFrame({
  src,
  alt,
  width,
  height,
  label,
  priority = false,
  className = "",
}: {
  src: string
  alt: string
  width: number
  height: number
  label: string
  priority?: boolean
  className?: string
}) {
  return (
    <div className={`rounded-2xl overflow-hidden bg-white ${className}`} style={{ border: `1px solid ${C.lavender}` }}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: C.surface, borderColor: C.lavender }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.lavender }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.lavender }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.lavender }} />
        <span className="ml-2 text-[10.5px] font-bold tracking-[0.14em] uppercase" style={{ color: C.muted }}>
          Clinax · {label}
        </span>
      </div>
      <div className="overflow-x-auto">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(min-width: 1280px) 1100px, (min-width: 640px) 92vw, 640px"
          className="w-full min-w-[640px] h-auto block"
        />
      </div>
    </div>
  )
}

function CapabilityMarquee() {
  const items = [...CAPABILITIES, ...CAPABILITIES]
  return (
    <div className="relative mt-14 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-y-0 left-0 w-24 z-10" style={{ background: `linear-gradient(90deg, ${C.violetDeep}, transparent)` }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10" style={{ background: `linear-gradient(270deg, ${C.violetDeep}, transparent)` }} />
      <div className="flex gap-3 w-max cx2-marquee">
        {items.map((c, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold whitespace-nowrap"
            style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.92)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.magenta }} />
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[68px]" style={{ background: C.violetDeep }}>
      {/* Glow + grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(900px 520px at 20% 0%, rgba(196,24,147,0.28), transparent 60%), radial-gradient(800px 600px at 85% 20%, rgba(91,15,193,0.55), transparent 65%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <Eyebrow dark>{HERO.eyebrow}</Eyebrow>
          <h1
            className="mt-7 text-[2.5rem] sm:text-[3.4rem] lg:text-[4.1rem] leading-[1.03] font-bold tracking-[-0.015em] text-white"
            style={HEADING}
          >
            {HERO.headline}
          </h1>
          <p className="mt-7 text-[1.05rem] sm:text-[1.2rem] leading-[1.65] max-w-2xl" style={{ color: C.lilac }}>
            {HERO.sub}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3.5">
            <PrimaryButton href="#demo" size="lg">
              {HERO.primaryCta}
            </PrimaryButton>
            <GhostButton href="#platform" dark size="lg">
              {HERO.secondaryCta}
            </GhostButton>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-[13px] font-medium" style={{ color: C.lavenderTint }}>
            {HERO.trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckDot />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Product screenshot */}
        <div className="relative mt-16 max-w-5xl mx-auto">
          <div
            className="absolute -inset-x-10 -top-10 h-40 pointer-events-none blur-3xl opacity-70"
            style={{ background: `linear-gradient(90deg, ${C.magenta}, ${C.violet})` }}
          />
          <ProductFrame
            src="/images/management-dashboard.png"
            alt="Clinax management dashboard showing appointments, revenue, therapist utilisation and follow-ups across branches"
            width={1492}
            height={682}
            label="Management Dashboard"
            priority
            className="relative shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)]"
          />
          <p className="mt-3 text-center text-[11px] font-medium tracking-wide" style={{ color: C.lilac }}>
            Demonstration data · fictional clinic
          </p>
        </div>

        <CapabilityMarquee />
      </div>

      <style>{`
        @keyframes cx2Marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .cx2-marquee { animation: cx2Marquee 42s linear infinite; }
        .cx2-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .cx2-marquee { animation: none; flex-wrap: wrap; width: 100%; justify-content: center; } }
      `}</style>
    </section>
  )
}
