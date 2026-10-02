"use client"

import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent } from "react"
import { C, GRADIENT, HEADING } from "./theme"
import { CTA, FEATURE_TABS, type FeatureTab } from "./content"
import { SectionHeading, PrimaryButton, GhostButton } from "./ui"
import ClinicalShowcase from "./ClinicalShowcase"
import { FrontDeskShowcase, ManagementShowcase, ScheduleShowcase, TherapistShowcase } from "./ModuleShowcases"
import type { ShowcaseProps } from "./showcase-ui"

// ─── Tabbed feature explorer — the primary product proof ────────────────────

// Every tab renders a coded showcase mockup (a marketing-safe, simplified
// product visualisation — never a raw application screenshot).
const SHOWCASES: Record<FeatureTab["showcase"], ComponentType<ShowcaseProps>> = {
  "front-desk": FrontDeskShowcase,
  schedule: ScheduleShowcase,
  therapist: TherapistShowcase,
  "clinical-session": ClinicalShowcase,
  management: ManagementShowcase,
}

// Guided-tour pacing: Clinical Care sub-step screens cycle like chapters.
// The tour never switches tabs on its own.
const SUB_STEP_MS = 4200

export default function ProductExperience() {
  const [tab, setTab] = useState(0)
  const [sub, setSub] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const current = FEATURE_TABS[tab]
  const activeSubStep = current.subSteps?.[sub]
  const Showcase = SHOWCASES[current.showcase]

  const goTo = (i: number) => {
    const next = (i + FEATURE_TABS.length) % FEATURE_TABS.length
    setTab(next)
    setSub(0)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    setUserPaused(true)
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(tab + 1) }
    else if (e.key === "ArrowLeft") { e.preventDefault(); goTo(tab - 1) }
    else if (e.key === "Home") { e.preventDefault(); goTo(0) }
    else if (e.key === "End") { e.preventDefault(); goTo(FEATURE_TABS.length - 1) }
  }

  // Every sub-step is a rendered showcase state, so all are interactive.
  const selectSub = (i: number) => {
    if (!current.subSteps?.[i]) return
    setUserPaused(true)
    setSub(i)
  }

  const onSubKeyDown = (e: KeyboardEvent) => {
    const steps = current.subSteps
    if (!steps?.length) return
    const n = steps.length
    if (e.key === "ArrowRight") { e.preventDefault(); selectSub((sub + 1) % n) }
    else if (e.key === "ArrowLeft") { e.preventDefault(); selectSub((sub - 1 + n) % n) }
    else if (e.key === "Home") { e.preventDefault(); selectSub(0) }
    else if (e.key === "End") { e.preventDefault(); selectSub(n - 1) }
  }

  // Gentle auto-advance through the Clinical Care sub-steps only — the
  // reader picked a tab on purpose, so the tour never switches tabs out from
  // under them. Pauses on hover/focus and stops permanently once the
  // visitor takes control (click or arrow keys); disabled entirely under
  // prefers-reduced-motion or on touch devices (no hover to pause it there).
  const autoAdvance = !hovering && !focused && !userPaused
  useEffect(() => {
    if (!autoAdvance) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return
    const nextSub = current.subSteps && sub + 1 < current.subSteps.length ? sub + 1 : -1
    if (nextSub < 0) return
    const id = setTimeout(() => setSub(nextSub), SUB_STEP_MS)
    return () => clearTimeout(id)
  }, [tab, sub, autoAdvance, current])

  return (
    <section
      id="product"
      className="relative py-24 sm:py-28 overflow-hidden scroll-mt-20"
      style={{ background: C.violetDeep }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false) }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(800px 500px at 50% 0%, rgba(91,15,193,0.6), transparent 65%), radial-gradient(700px 400px at 100% 100%, rgba(196,24,147,0.25), transparent 65%)` }}
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          dark
          eyebrow="See it in action"
          title={<>See how a day runs on Clinax.</>}
          sub="Real screens from the roles that run your clinic every day."
        />

        {/* Tab strip */}
        <div role="tablist" aria-label="Clinax modules" onKeyDown={onKeyDown} className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FEATURE_TABS.map((t, i) => {
            const selected = i === tab
            return (
              <button
                key={t.key}
                ref={(el) => { tabRefs.current[i] = el }}
                role="tab"
                id={`cx2-tab-${t.key}`}
                aria-selected={selected}
                aria-controls={`cx2-panel-${t.key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => { setUserPaused(true); setTab(i); setSub(0) }}
                className="whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                style={
                  selected
                    ? { background: GRADIENT, color: C.white, boxShadow: "0 10px 26px -12px rgba(196,24,147,0.7)" }
                    : { background: "rgba(255,255,255,0.07)", color: C.lavenderTint, border: "1px solid rgba(255,255,255,0.12)" }
                }
              >
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Clinical workflow scrubber — visible only on the Clinical Care
            tab. Six chapter segments read at a glance; the active chapter
            fills while the guided tour plays. */}
        {current.subSteps && (
          <div role="tablist" aria-label="Clinical care steps" onKeyDown={onSubKeyDown} className="mt-12">
            <div className="mb-4 flex items-baseline justify-end">
              <span className="text-[11px] font-bold tracking-[0.22em] tabular-nums" style={{ color: "rgba(255,255,255,0.38)" }}>
                <span style={{ color: C.white }}>{String(sub + 1).padStart(2, "0")}</span>
                {" / "}
                {String(current.subSteps.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex gap-1.5 sm:gap-2.5">
              {current.subSteps.map((s, i) => {
                const selected = i === sub
                const passed = i < sub
                return (
                  <button
                    key={s.key}
                    role="tab"
                    aria-selected={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectSub(i)}
                    className="cx2-chapter flex min-w-0 flex-1 flex-col items-start gap-2.5 rounded-md px-0.5 py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <span
                      className="cx2-chapter-bar relative block h-[3px] w-full overflow-hidden rounded-full transition-colors duration-200"
                      style={{ background: "rgba(255,255,255,0.12)" }}
                    >
                      <span
                        key={selected ? `active-${sub}` : `idle-${i}`}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={
                          selected
                            ? {
                                width: "100%",
                                background: `linear-gradient(90deg, ${C.magenta}, #F29ED6)`,
                                boxShadow: "0 0 16px rgba(196,24,147,0.6)",
                                animationName: userPaused ? "none" : "cx2ChapterFill",
                                animationDuration: `${SUB_STEP_MS}ms`,
                                animationTimingFunction: "linear",
                                animationFillMode: "forwards",
                                animationPlayState: autoAdvance ? "running" : "paused",
                              }
                            : {
                                width: passed ? "100%" : "0%",
                                background: "rgba(231,217,247,0.4)",
                                transition: "width 0.35s ease",
                              }
                        }
                      />
                    </span>
                    <span
                      className="cx2-chapter-label text-[9.5px] sm:text-[11px] font-semibold uppercase leading-tight tracking-[0.06em] sm:tracking-[0.1em] transition-colors duration-200"
                      style={{ color: selected ? C.white : C.lilac }}
                    >
                      {s.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Panel */}
        <div
          role="tabpanel"
          id={`cx2-panel-${current.key}`}
          aria-labelledby={`cx2-tab-${current.key}`}
          className="mt-8 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center"
        >
          <div className="lg:col-span-4 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: C.magenta }}>
                {String(tab + 1).padStart(2, "0")} — {current.label}
              </p>
              <span
                className="text-[10px] font-bold tracking-[0.12em] uppercase rounded-full px-2.5 py-1"
                style={{ background: "rgba(255,255,255,0.08)", color: C.lavenderTint, border: "1px solid rgba(255,255,255,0.14)" }}
              >
                {current.role}
              </span>
            </div>
            <h3 className="mt-3 text-[1.7rem] sm:text-[2rem] leading-[1.15] font-bold text-white" style={HEADING}>
              {current.headline}
            </h3>
            <p className="mt-4 text-[15px] leading-[1.65]" style={{ color: C.lilac }}>
              {current.description}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {current.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14.5px]" style={{ color: C.lavenderTint }}>
                  <span className="mt-1 w-4 h-4 rounded-full shrink-0 flex items-center justify-center" style={{ background: GRADIENT }}>
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M2 5.2l2.2 2.2L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>

          </div>

          <div className="lg:col-span-8 min-w-0">
            <div className="rounded-2xl overflow-hidden bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)]" style={{ border: "1px solid rgba(255,255,255,0.14)" }}>
              <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: C.surface, borderColor: C.lavender }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.lavender }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.lavender }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.lavender }} />
                <span className="ml-2 text-[10.5px] font-bold tracking-[0.14em] uppercase" style={{ color: C.muted }}>
                  Clinax · {current.label}{activeSubStep ? ` · ${activeSubStep.label}` : ""}
                </span>
              </div>
              <div key={current.key} className="cx2-fade-in">
                <Showcase steps={current.subSteps} active={sub} />
              </div>
              <div className="px-4 py-2 border-t" style={{ background: C.surface, borderColor: C.lavender }}>
                <p className="text-[10.5px] font-medium tracking-wide" style={{ color: C.muted }}>
                  Demonstration data · fictional clinic
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <PrimaryButton href="#demo" size="lg">{CTA.primary}</PrimaryButton>
          <GhostButton href="#how-it-works" dark>How onboarding works</GhostButton>
        </div>
      </div>

      <style>{`
        @keyframes cx2FadeIn { from { opacity: 0; } to { opacity: 1; } }
        .cx2-fade-in { animation: cx2FadeIn 0.35s ease-out; }
        @keyframes cx2ChapterFill { from { width: 0; } to { width: 100%; } }
        .cx2-chapter:not(:disabled):hover .cx2-chapter-label { color: ${C.white}; }
        .cx2-chapter:not(:disabled):hover .cx2-chapter-bar { background: rgba(255,255,255,0.24); }
        @media (prefers-reduced-motion: reduce) { #product * { animation: none !important; transition-duration: 0.01ms !important; } }
      `}</style>
    </section>
  )
}
