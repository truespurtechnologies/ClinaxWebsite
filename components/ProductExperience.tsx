"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import Image from "next/image"
import { C, GRADIENT, HEADING } from "./theme"
import { FEATURE_TABS } from "./content"
import { SectionHeading, PrimaryButton, GhostButton } from "./ui"

// ─── Tabbed feature explorer — the primary product proof ────────────────────

export default function ProductExperience() {
  const [tab, setTab] = useState(0)
  const [sub, setSub] = useState(() => Math.max(FEATURE_TABS[0].subSteps?.findIndex((s) => s.src) ?? 0, 0))
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const current = FEATURE_TABS[tab]
  const subStepsWithScreens = current.subSteps?.filter((s) => s.src) ?? []
  const activeSubStep = current.subSteps?.[sub]
  const screen = activeSubStep?.src
    ? { src: activeSubStep.src, alt: activeSubStep.alt ?? current.screen.alt, width: activeSubStep.width ?? current.screen.width, height: activeSubStep.height ?? current.screen.height }
    : current.screen

  const firstScreenSub = (i: number) => Math.max(FEATURE_TABS[i].subSteps?.findIndex((s) => s.src) ?? 0, 0)

  const goTo = (i: number) => {
    const next = (i + FEATURE_TABS.length) % FEATURE_TABS.length
    setTab(next)
    setSub(firstScreenSub(next))
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(tab + 1) }
    else if (e.key === "ArrowLeft") { e.preventDefault(); goTo(tab - 1) }
    else if (e.key === "Home") { e.preventDefault(); goTo(0) }
    else if (e.key === "End") { e.preventDefault(); goTo(FEATURE_TABS.length - 1) }
  }

  const selectSub = (i: number) => {
    if (!current.subSteps?.[i]?.src) return
    setSub(i)
  }

  const onSubKeyDown = (e: KeyboardEvent) => {
    const steps = current.subSteps
    if (!steps?.length) return
    const n = steps.length
    if (e.key === "ArrowRight") { e.preventDefault(); selectSub((sub + 1) % n) }
    else if (e.key === "ArrowLeft") { e.preventDefault(); selectSub((sub - 1 + n) % n) }
    else if (e.key === "Home") { e.preventDefault(); selectSub(subStepsWithScreens.length ? steps.indexOf(subStepsWithScreens[0]) : 0) }
    else if (e.key === "End") { e.preventDefault(); selectSub(subStepsWithScreens.length ? steps.indexOf(subStepsWithScreens[subStepsWithScreens.length - 1]) : 0) }
  }

  return (
    <section id="product" className="relative py-24 sm:py-28 overflow-hidden scroll-mt-20" style={{ background: C.violetDeep }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(800px 500px at 50% 0%, rgba(91,15,193,0.6), transparent 65%), radial-gradient(700px 400px at 100% 100%, rgba(196,24,147,0.25), transparent 65%)` }}
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          dark
          eyebrow="See it in action"
          title={<>One connected workflow, from the front desk to the treatment floor.</>}
          sub="Real Clinax screens across the roles that run your clinic every day."
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
                onClick={() => { setTab(i); setSub(firstScreenSub(i)) }}
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

        {/* Panel */}
        <div
          role="tabpanel"
          id={`cx2-panel-${current.key}`}
          aria-labelledby={`cx2-tab-${current.key}`}
          className="mt-8 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center"
        >
          <div className="lg:col-span-4 min-w-0">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: C.magenta }}>
              {String(tab + 1).padStart(2, "0")} — {current.label}
            </p>
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

            {current.subSteps && (
              <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Clinical care steps" onKeyDown={onSubKeyDown}>
                {current.subSteps.map((s, i) => {
                  const hasScreen = Boolean(s.src)
                  const selected = hasScreen && i === sub
                  return (
                    <button
                      key={s.key}
                      role="tab"
                      aria-selected={selected}
                      aria-disabled={!hasScreen}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => selectSub(i)}
                      disabled={!hasScreen}
                      title={hasScreen ? undefined : "Shown in the clinical workflow — screenshot coming soon"}
                      className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${hasScreen ? "cursor-pointer" : "cursor-default opacity-60"}`}
                      style={
                        selected
                          ? { background: C.white, color: C.violetDeep }
                          : { background: "rgba(255,255,255,0.08)", color: C.lavenderTint, border: hasScreen ? "1px solid rgba(255,255,255,0.14)" : "1px dashed rgba(255,255,255,0.25)" }
                      }
                    >
                      {i + 1}. {s.label}
                    </button>
                  )
                })}
              </div>
            )}
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
              <div className="overflow-x-auto">
                <Image
                  key={screen.src}
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  sizes="(min-width: 1024px) 60vw, (min-width: 640px) 92vw, 640px"
                  className="w-full min-w-[640px] h-auto block cx2-fade-in"
                />
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
          <PrimaryButton href="#demo" size="lg">Request a Demo</PrimaryButton>
          <GhostButton href="#demo" dark>See how it fits your workflows</GhostButton>
        </div>
      </div>

      <style>{`
        @keyframes cx2FadeIn { from { opacity: 0; } to { opacity: 1; } }
        .cx2-fade-in { animation: cx2FadeIn 0.35s ease-out; }
        @media (prefers-reduced-motion: reduce) { #product * { animation: none !important; transition-duration: 0.01ms !important; } }
      `}</style>
    </section>
  )
}
