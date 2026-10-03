"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { C, HEADING } from "./theme"
import { CAPABILITIES, HERO, HERO_SLIDES } from "./content"
import { PrimaryButton, GhostButton } from "./ui"

const SLIDE_MS = 6000

function CheckDot() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="7" fill={C.magenta} fillOpacity="0.25" />
      <path d="M4 7.2l2 2 4-4.4" stroke={C.white} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Auto-scrolling imagery — crossfade + slow zoom, counter + thin progress tabs.
// Pauses on hover/focus, stops once a visitor picks a slide, and never
// auto-advances under prefers-reduced-motion.
function HeroSlideshow() {
  const [slide, setSlide] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const paused = hovering || focused || userPaused

  useEffect(() => {
    if (paused) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), SLIDE_MS)
    return () => clearInterval(id)
  }, [paused])

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Clinax across a clinic day"
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false) }}
    >
      <div
        className="relative aspect-3/2 overflow-hidden rounded-2xl"
        style={{ border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 24px 60px -32px rgba(6,2,20,0.55)" }}
      >
        {HERO_SLIDES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="(min-width: 1280px) 720px, (min-width: 1024px) 56vw, 100vw"
            className="object-cover"
            style={{
              objectPosition: s.position,
              opacity: i === slide ? 1 : 0,
              transform: i === slide ? "scale(1.03)" : "scale(1)",
              filter: "saturate(0.95) contrast(1.02)",
              transition: "opacity 1.1s ease-in-out, transform 8s ease-out",
            }}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-8">
        <p className="text-[12px] font-medium tracking-wide whitespace-nowrap" style={{ color: C.lilac }} aria-hidden="true">
          <span className="font-semibold tabular-nums" style={{ color: C.white }}>
            {String(slide + 1).padStart(2, "0")}
          </span>
          <span className="tabular-nums"> / {String(HERO_SLIDES.length).padStart(2, "0")}</span>
          <span className="mx-2.5 inline-block h-px w-4 align-middle" style={{ background: "rgba(231,217,247,0.35)" }} />
          {HERO_SLIDES[slide].label}
        </p>

        <div role="tablist" aria-label="Hero slides" className="flex gap-1.5">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.src}
              role="tab"
              aria-selected={i === slide}
              aria-label={s.label}
              onClick={() => { setUserPaused(true); setSlide(i) }}
              className="cursor-pointer rounded-full py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <span className="relative block h-0.5 w-7 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
                <span
                  key={i === slide ? `active-${slide}` : `idle-${i}`}
                  className={`absolute inset-y-0 left-0 rounded-full ${i === slide ? "cx2-slide-fill" : ""}`}
                  style={
                    i === slide
                      ? {
                          width: "100%",
                          background: C.white,
                          animationName: paused ? "none" : "cx2SlideFill",
                          animationDuration: `${SLIDE_MS}ms`,
                          animationTimingFunction: "linear",
                          animationFillMode: "forwards",
                        }
                      : {
                          width: i < slide ? "100%" : "0%",
                          background: "rgba(231,217,247,0.4)",
                          transition: "width 0.35s ease",
                        }
                  }
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function CapabilityMarquee() {
  const items = [...CAPABILITIES, ...CAPABILITIES]
  return (
    <div
      className="relative overflow-hidden py-4"
      style={{ background: C.white, borderTop: `1px solid ${C.lavender}`, borderBottom: `1px solid ${C.lavender}` }}
      aria-hidden="true"
    >
      <div className="absolute inset-y-0 left-0 w-24 z-10" style={{ background: `linear-gradient(90deg, ${C.white}, transparent)` }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10" style={{ background: `linear-gradient(270deg, ${C.white}, transparent)` }} />
      <div className="flex gap-3 w-max cx2-marquee">
        {items.map((c, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-[13px] font-semibold whitespace-nowrap" style={{ color: C.muted }}>
            {c}
            <span className="text-[13px] leading-none" style={{ color: C.magenta }} aria-hidden="true">✦</span>
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
          background: `radial-gradient(900px 520px at 72% -12%, rgba(196,24,147,0.22), transparent 60%), radial-gradient(900px 620px at 8% 35%, rgba(91,15,193,0.45), transparent 65%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-16 sm:pt-24 lg:pt-28 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Copy — left on desktop */}
          <div className="lg:col-span-5 lg:order-1 flex flex-col items-start text-left">
            <span
              className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1.5 rounded-full px-4 py-2 text-[11px] font-bold tracking-[0.14em] uppercase"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: C.lavenderTint,
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              <span className="w-1.5 h-1.5 shrink-0 rounded-full" style={{ background: C.magenta }} aria-hidden="true" />
              {HERO.eyebrow}
            </span>
            <h1
              className="mt-8 text-balance text-[2.4rem] sm:text-[3rem] lg:text-[2.9rem] xl:text-[3.5rem] leading-[1.05] font-bold tracking-[-0.015em] text-white"
              style={HEADING}
            >
              {HERO.headline}
            </h1>
            <p className="mt-6 text-[1.05rem] sm:text-[1.15rem] leading-[1.65] max-w-xl" style={{ color: C.lilac }}>
              {HERO.sub}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <PrimaryButton href="#demo" size="lg">
                {HERO.primaryCta}
              </PrimaryButton>
              <GhostButton href="#product" dark size="lg">
                {HERO.secondaryCta}
              </GhostButton>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium" style={{ color: C.lavenderTint }}>
              {HERO.trust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckDot />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Imagery — dominant right column on desktop, below the copy on mobile */}
          <div className="lg:col-span-7 lg:order-2 lg:-mr-4">
            <HeroSlideshow />
          </div>
        </div>
      </div>

      <CapabilityMarquee />

      <style>{`
        @keyframes cx2Marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .cx2-marquee { animation: cx2Marquee 42s linear infinite; }
        .cx2-marquee:hover { animation-play-state: paused; }
        @keyframes cx2SlideFill { from { width: 0; } to { width: 100%; } }
        @media (prefers-reduced-motion: reduce) { .cx2-marquee { animation: none; flex-wrap: wrap; width: 100%; justify-content: center; } .cx2-slide-fill { animation: none !important; } }
      `}</style>
    </section>
  )
}
