"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

// Reveals content once scrolled into view (same pattern as app/clinax).
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.25) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(el)
          }
        })
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

export function riseStyle(active: boolean, delay = 0, distance = 14): CSSProperties {
  return {
    opacity: active ? 1 : 0,
    transform: active ? "translate(0,0)" : `translate(0,${distance}px)`,
    transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  }
}

export function scrollToId(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
}
