"use client"

import { C, GRADIENT } from "./theme"
import { TRUST_ITEMS } from "./content"
import { useInView, riseStyle } from "./motion"

const TRUST_ICONS = [
  // shield + check — encrypted records
  <path key="shield" d="M10 3l6 2.5v4.7c0 3.4-2.4 5.9-6 7.3-3.6-1.4-6-3.9-6-7.3V5.5L10 3z M7.5 9.9l1.8 1.8 3.2-3.4" />,
  // lock — role-based access
  <path key="lock" d="M6 9.5h8V16H6V9.5z M8 9.5V7a2 2 0 0 1 4 0v2.5" />,
  // database — backups
  <path key="db" d="M10 4c3.3 0 6 1.1 6 2.5S13.3 9 10 9 4 7.9 4 6.5 6.7 4 10 4z M4 6.5v7C4 14.9 6.7 16 10 16s6-1.1 6-2.5v-7 M4 10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5" />,
  // export arrow — data ownership
  <path key="export" d="M10 11V4 M6.8 7.2L10 4l3.2 3.2 M4 13v3.5h12V13" />,
]

export default function TrustStrip() {
  const { ref, inView } = useInView(0.2)
  return (
    <section className="py-14 sm:py-16" style={{ background: C.surface, borderTop: `1px solid ${C.lavender}`, borderBottom: `1px solid ${C.lavender}` }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <h2 className="text-center text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: C.violet }}>
          Security &amp; data ownership
        </h2>
        <div ref={ref} className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_ITEMS.map((t, i) => (
            <div key={t.title} className="flex flex-col items-center text-center" style={riseStyle(inView, i * 0.08)}>
              <span className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: GRADIENT }}>
                <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {TRUST_ICONS[i]}
                </svg>
              </span>
              <p className="mt-3.5 text-[14.5px] font-bold" style={{ color: C.ink }}>
                {t.title}
              </p>
              <p className="mt-1.5 text-[13px] leading-[1.55]" style={{ color: C.muted }}>
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
