"use client"

import type { ReactNode } from "react"
import { C, GRADIENT, HEADING } from "./theme"
import { scrollToId } from "./motion"

export function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2.5 6.5h8M7.5 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PrimaryButton({
  children,
  href = "#demo",
  onClick,
  className = "",
  size = "md",
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  size?: "md" | "lg"
}) {
  const pad = size === "lg" ? "px-8 py-4 text-[15px]" : "px-6 py-3 text-sm"
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        if (onClick) onClick()
        else scrollToId(href)
      }}
      className={`group inline-flex items-center gap-2.5 rounded-full font-semibold text-white shadow-[0_10px_30px_-10px_rgba(91,15,193,0.6)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-10px_rgba(196,24,147,0.55)] active:translate-y-0 cursor-pointer ${pad} ${className}`}
      style={{ background: GRADIENT }}
    >
      {children}
      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
        <ArrowIcon />
      </span>
    </a>
  )
}

export function GhostButton({
  children,
  href,
  onClick,
  dark = false,
  className = "",
  size = "md",
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  dark?: boolean
  className?: string
  size?: "md" | "lg"
}) {
  const pad = size === "lg" ? "px-7 py-4 text-[15px]" : "px-5 py-3 text-sm"
  const cls = `inline-flex items-center gap-2 rounded-full font-semibold border transition-colors duration-200 cursor-pointer ${pad} ${className}`
  const sty = dark
    ? { borderColor: "rgba(255,255,255,0.22)", color: C.white, background: "rgba(255,255,255,0.06)" }
    : { borderColor: C.lavender, color: C.ink, background: C.white }
  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault()
          if (onClick) onClick()
          else scrollToId(href)
        }}
        className={cls}
        style={sty}
      >
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls} style={sty}>
      {children}
    </button>
  )
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase"
      style={
        dark
          ? { background: "rgba(255,255,255,0.08)", color: C.lavenderTint, border: "1px solid rgba(255,255,255,0.14)" }
          : { background: C.lavenderTint, color: C.violet }
      }
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: dark ? C.magenta : C.violet }} />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
  align = "center",
}: {
  eyebrow: string
  title: ReactNode
  sub?: ReactNode
  dark?: boolean
  align?: "center" | "left"
}) {
  const center = align === "center"
  return (
    <div className={`${center ? "text-center mx-auto items-center" : "items-start"} flex flex-col max-w-3xl mb-12 sm:mb-16`}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className="mt-5 text-[2rem] sm:text-[2.6rem] lg:text-[3rem] leading-[1.08] font-bold tracking-[-0.01em]"
        style={{ ...HEADING, color: dark ? C.white : C.ink }}
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-5 text-[1.05rem] leading-[1.7] max-w-2xl" style={{ color: dark ? C.lilac : C.muted }}>
          {sub}
        </p>
      )}
    </div>
  )
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: GRADIENT }}
    >
      {children}
    </span>
  )
}
