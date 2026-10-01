"use client"

import { C, GRADIENT, HEADING } from "./theme"
import { FINAL_CTA } from "./content"
import { useInView, riseStyle } from "./motion"
import { Eyebrow } from "./ui"
import DemoForm from "./DemoForm"
import { CONTACT_EMAIL } from "@/lib/site"

export default function FinalCTA() {
  const { ref, inView } = useInView(0.15)
  return (
    <section id="demo" className="relative py-24 sm:py-28 overflow-hidden scroll-mt-20" style={{ background: C.violetDeep }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(800px 500px at 0% 100%, rgba(196,24,147,0.35), transparent 65%), radial-gradient(700px 500px at 100% 0%, rgba(91,15,193,0.6), transparent 65%)` }}
      />
      <div ref={ref} className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 min-w-0" style={riseStyle(inView, 0)}>
          <Eyebrow dark>{FINAL_CTA.eyebrow}</Eyebrow>
          <h2 className="mt-6 text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] leading-[1.05] font-bold text-white tracking-[-0.01em]" style={HEADING}>
            {FINAL_CTA.headline}
          </h2>
          <p className="mt-6 text-[1.05rem] sm:text-[1.15rem] leading-[1.65] max-w-xl" style={{ color: C.lilac }}>
            {FINAL_CTA.sub}
          </p>
          <ul className="mt-8 flex flex-col gap-3.5">
            {FINAL_CTA.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[15px] font-medium" style={{ color: C.lavenderTint }}>
                <span className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center" style={{ background: GRADIENT }}>
                  <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 5.2l2.2 2.2L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
          <blockquote
            className="mt-10 pl-5 border-l-2 text-[1.15rem] sm:text-[1.3rem] leading-snug font-bold text-white"
            style={{ ...HEADING, borderImage: `linear-gradient(180deg, ${C.violet}, ${C.magenta}) 1` }}
          >
            &ldquo;{FINAL_CTA.quote}&rdquo;
          </blockquote>
          <p className="mt-10 text-[13px]" style={{ color: C.lilac }}>
            Prefer email?{" "}
            <a href={`mailto:${CONTACT_EMAIL}?subject=Clinax Early Access Request`} className="font-semibold underline underline-offset-4 text-white">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <div className="lg:col-span-6 min-w-0" style={riseStyle(inView, 0.15)}>
          <DemoForm />
        </div>
      </div>
    </section>
  )
}
