"use client"

import { useEffect, useState } from "react"
import { C } from "./theme"
import { CTA } from "./content"
import { PrimaryButton } from "./ui"

// Appears once the hero has scrolled out and hides again near the demo form,
// where a duplicate CTA would just be noise. Desktop/tablet already has the
// primary CTA pinned in the nav bar, so this is mobile-only (where that
// button is hidden behind the hamburger menu).
export default function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("top")
    const demo = document.getElementById("demo")
    if (!hero || !demo) return
    let heroOut = false
    let demoIn = false
    const update = () => setVisible(heroOut && !demoIn)
    const heroObs = new IntersectionObserver(([e]) => { heroOut = !e.isIntersecting; update() }, { threshold: 0 })
    const demoObs = new IntersectionObserver(([e]) => { demoIn = e.isIntersecting; update() }, { threshold: 0.1 })
    heroObs.observe(hero)
    demoObs.observe(demo)
    return () => { heroObs.disconnect(); demoObs.disconnect() }
  }, [])

  return (
    <div
      className={`md:hidden fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 invisible"
      }`}
      aria-hidden={!visible}
    >
      <div
        className="pointer-events-auto flex items-center gap-4 rounded-full pl-5 pr-2 py-2 shadow-[0_18px_50px_-18px_rgba(36,25,52,0.45)] backdrop-blur-md"
        style={{ background: "rgba(255,255,255,0.92)", border: `1px solid ${C.lavender}` }}
      >
        <p className="hidden sm:block text-[13px] font-semibold" style={{ color: C.ink }}>
          {CTA.status} — see Clinax with your workflows.
        </p>
        <PrimaryButton href="#demo">{CTA.primary}</PrimaryButton>
      </div>
    </div>
  )
}
