"use client"

import { useState } from "react"
import * as Accordion from "@radix-ui/react-accordion"
import { C, HEADING } from "./theme"
import { FAQS } from "./content"
import { SectionHeading, GhostButton } from "./ui"
import { scrollToId } from "./motion"

const INITIAL = 5

export default function FAQ() {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? FAQS : FAQS.slice(0, INITIAL)

  return (
    <section id="faq" className="py-24 sm:py-28 scroll-mt-20 bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="FAQ" title="Questions clinic owners ask." sub="Straight answers — no sales pitch." />

        <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
          {shown.map((f, i) => (
            <Accordion.Item
              key={f.q}
              value={`faq-${i}`}
              className="rounded-2xl bg-white overflow-hidden data-[state=open]:shadow-[0_18px_40px_-24px_rgba(91,15,193,0.35)]"
              style={{ border: `1px solid ${C.lavender}` }}
            >
              <Accordion.Header>
                <Accordion.Trigger className="group w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B0FC1]/50 rounded-2xl">
                  <span className="text-[16px] font-bold leading-snug" style={{ ...HEADING, color: C.ink }}>
                    {f.q}
                  </span>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-data-[state=open]:rotate-45"
                    style={{ background: C.lavenderTint, color: C.violet }}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden cx2-acc">
                <p className="px-6 pb-6 -mt-1 text-[15px] leading-[1.7]" style={{ color: C.muted }}>
                  {f.a}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        {FAQS.length > INITIAL && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="text-[14px] font-semibold underline-offset-4 hover:underline cursor-pointer"
              style={{ color: C.violet }}
            >
              {expanded ? "Show fewer questions" : `Show ${FAQS.length - INITIAL} more questions`}
            </button>
          </div>
        )}

        <div className="mt-14 rounded-3xl p-8 text-center" style={{ background: C.surface, border: `1px solid ${C.lavender}` }}>
          <h3 className="text-[1.4rem] font-bold" style={{ ...HEADING, color: C.ink }}>
            Still have questions?
          </h3>
          <p className="mt-2 text-[15px]" style={{ color: C.muted }}>
            Book a demo and we&apos;ll answer everything with your clinic in mind.
          </p>
          <div className="mt-6">
            <GhostButton onClick={() => scrollToId("#demo")}>Request a Demo →</GhostButton>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cx2AccDown { from { height: 0; opacity: 0; } to { height: var(--radix-accordion-content-height); opacity: 1; } }
        @keyframes cx2AccUp { from { height: var(--radix-accordion-content-height); opacity: 1; } to { height: 0; opacity: 0; } }
        .cx2-acc[data-state="open"] { animation: cx2AccDown 0.28s cubic-bezier(0.22,1,0.36,1); }
        .cx2-acc[data-state="closed"] { animation: cx2AccUp 0.22s ease-in; }
        @media (prefers-reduced-motion: reduce) { .cx2-acc { animation: none !important; } }
      `}</style>
    </section>
  )
}
