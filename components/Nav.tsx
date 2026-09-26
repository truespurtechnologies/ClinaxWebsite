"use client"

import { useEffect, useState } from "react"
import { C, GRADIENT } from "./theme"
import { NAV_LINKS } from "./content"
import { scrollToId } from "./motion"
import { PrimaryButton } from "./ui"

export function ClinaxMark({ size = 30 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-lg shrink-0"
      style={{ width: size, height: size, background: GRADIENT }}
      aria-hidden="true"
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="2.5" fill="white" />
        <path d="M7 1.5V4M7 10V12.5M1.5 7H4M10 7H12.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const go = (href: string) => {
    setMenuOpen(false)
    scrollToId(href)
  }

  // The hero is dark, so the nav is light-on-dark until the page scrolls.
  const onDark = !scrolled && !menuOpen
  const textColor = onDark ? C.white : C.ink
  const mutedColor = onDark ? C.lilac : C.muted

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        onDark ? "bg-transparent" : "bg-white/92 backdrop-blur-md shadow-[0_1px_0_0_rgba(36,25,52,0.06)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); setMenuOpen(false); scrollToId("#top") }}
          className="flex items-center gap-2.5"
          aria-label="Clinax — back to top"
        >
          <ClinaxMark />
          <span className="font-extrabold tracking-[-0.01em] text-[19px]" style={{ color: textColor }}>
            Clinax
          </span>
          <span className="hidden sm:inline text-[11px] font-medium tracking-wide border-l pl-2.5 ml-0.5" style={{ color: mutedColor, borderColor: onDark ? "rgba(255,255,255,0.18)" : C.lavender }}>
            by TrueSpur
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => { e.preventDefault(); go(l.href) }}
              className="text-[14px] font-semibold transition-opacity duration-150 hover:opacity-70 cursor-pointer"
              style={{ color: textColor }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <PrimaryButton href="#demo">Request a Demo</PrimaryButton>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-5 h-0.5 transition-all duration-200 origin-center ${
                menuOpen ? (i === 0 ? "rotate-45 translate-y-2" : i === 1 ? "opacity-0" : "-rotate-45 -translate-y-2") : ""
              }`}
              style={{ background: textColor }}
            />
          ))}
        </button>
      </div>

      <div
        className={`md:hidden bg-white border-t transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        style={{ borderColor: C.lavender }}
      >
        <nav className="flex flex-col px-5 py-4 gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => { e.preventDefault(); go(l.href) }}
              className="text-base font-semibold py-3 text-left border-b last:border-0 cursor-pointer block"
              style={{ color: C.ink, borderColor: C.surface }}
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3">
            <PrimaryButton href="#demo" onClick={() => go("#demo")} className="w-full justify-center">
              Request a Demo
            </PrimaryButton>
          </div>
        </nav>
      </div>
    </header>
  )
}
