import type { ReactNode } from "react"
import { C, GRADIENT } from "./theme"

// Shared primitives for the coded product-showcase mockups. These are
// deliberately simplified demonstration UIs for marketing — not the
// application itself. They keep each screen's concept legible while leaving
// out navigation chrome, identifiers, field-level schema and internal
// mechanics. All data is fictional: one consistent demo clinic cast.

export const DONE = { bg: "#E9F6EE", text: "#1E7A46", border: "#C7E5D2" }
export const ACTIVE = { bg: "#F3EDFC", border: "rgba(91,15,193,0.45)" }

export type ShowcaseProps = { steps?: { key: string; label: string }[]; active?: number }

export function ShowcaseShell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="img" aria-label={label} className="px-3.5 py-4 sm:px-6 sm:py-6" style={{ background: "#FBFAFE" }}>
      <div aria-hidden="true">{children}</div>
    </div>
  )
}

export function ScreenHeader({ title, sub, meta, chips }: { title: string; sub?: string; meta?: string; chips?: ReactNode }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="text-[15px] sm:text-[17px] font-bold" style={{ color: C.ink }}>{title}</span>
        {chips}
        {meta && <span className="ml-auto text-[11px] font-medium" style={{ color: C.muted }}>{meta}</span>}
      </div>
      {sub && <p className="mt-0.5 text-[11.5px] sm:text-[12px]" style={{ color: C.muted }}>{sub}</p>}
    </div>
  )
}

export function Tick({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="5" cy="5" r="4.5" fill={DONE.text} />
      <path d="M3 5.2l1.4 1.4L7 3.8" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export type ChipTone = "violet" | "warm" | "done" | "neutral" | "muted"

const CHIP_STYLES: Record<ChipTone, { background: string; color: string; border?: string }> = {
  violet: { background: C.lavenderTint, color: C.violet },
  warm: { background: C.peach, color: C.brown },
  done: { background: DONE.bg, color: DONE.text },
  neutral: { background: C.surface, color: C.muted, border: `1px solid ${C.lavender}` },
  muted: { background: "#F1EDF8", color: C.muted },
}

export function Chip({ children, tone = "neutral" }: { children: ReactNode; tone?: ChipTone }) {
  return (
    <span className="rounded-md px-2 py-1 text-[10.5px] font-semibold whitespace-nowrap" style={CHIP_STYLES[tone]}>
      {children}
    </span>
  )
}

export function Card({ title, sub, aside, className = "", children }: { title: string; sub: string; aside?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <div className={`rounded-xl border bg-white p-4 sm:p-5 ${className}`} style={{ borderColor: C.lavender }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[13px] font-bold" style={{ color: C.ink }}>{title}</p>
          <p className="text-[11px]" style={{ color: C.muted }}>{sub}</p>
        </div>
        {aside}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  )
}

export function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b py-2.5 last:border-0 last:pb-0 first:pt-0" style={{ borderColor: C.lavender }}>
      <span className="text-[11.5px]" style={{ color: C.muted }}>{k}</span>
      <span className="text-[12px] font-semibold text-right" style={{ color: C.ink }}>{v}</span>
    </div>
  )
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="text-[12px] leading-[1.6] border-b py-2.5 last:border-0 last:pb-0 first:pt-0" style={{ color: C.ink, borderColor: C.lavender }}>
      {children}
    </p>
  )
}

const STAT_TONES = { violet: C.violet, green: DONE.text, amber: C.brown, ink: C.ink } as const

export function StatTile({ label, value, caption, tone = "violet" }: { label: string; value: ReactNode; caption: string; tone?: keyof typeof STAT_TONES }) {
  return (
    <div className="rounded-xl border bg-white p-3 sm:p-4" style={{ borderColor: C.lavender }}>
      <p className="text-[9.5px] sm:text-[10px] font-bold tracking-[0.1em] uppercase" style={{ color: C.muted }}>{label}</p>
      <p className="mt-1 text-[20px] sm:text-[24px] font-bold leading-none" style={{ color: STAT_TONES[tone] }}>{value}</p>
      <p className="mt-1.5 text-[10px] sm:text-[11px] leading-snug" style={{ color: C.muted }}>{caption}</p>
    </div>
  )
}

export function PainBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="pt-1">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] font-bold tracking-[0.1em] uppercase" style={{ color: C.muted }}>{label}</span>
        <span className="rounded-md px-1.5 py-0.5 text-[10.5px] font-bold" style={{ background: C.peach, color: C.brown }}>{value}/10</span>
      </div>
      <div className="relative mt-2 h-[5px] rounded-full" style={{ background: C.lavender }}>
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${value * 10}%`, background: GRADIENT }} />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white" style={{ left: `${value * 10}%`, border: `2px solid ${C.violet}` }} />
      </div>
    </div>
  )
}

export function Progress({ label, done, total }: { label: string; done: number; total: number }) {
  return (
    <div className="border-b py-2.5" style={{ borderColor: C.lavender }}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[11.5px]" style={{ color: C.muted }}>{label}</span>
        <span className="text-[12px] font-semibold" style={{ color: C.ink }}>{done} of {total} sessions</span>
      </div>
      <div className="mt-2 h-[5px] rounded-full" style={{ background: C.lavender }}>
        <div className="h-full rounded-full" style={{ width: `${(done / total) * 100}%`, background: GRADIENT }} />
      </div>
    </div>
  )
}

export function Bar({ pct, highlight }: { pct: number; highlight?: boolean }) {
  return (
    <div className="h-[5px] rounded-full flex-1" style={{ background: C.lavender }}>
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: highlight ? GRADIENT : C.violet }} />
    </div>
  )
}
