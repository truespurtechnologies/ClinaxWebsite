import Link from "next/link"
import { C, GRADIENT, HEADING } from "@/components/theme"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: C.surface }}>
      <div className="text-center max-w-md">
        <p className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: C.violet }}>
          404
        </p>
        <h1 className="mt-4 text-[2.2rem] leading-[1.1] font-bold" style={{ ...HEADING, color: C.ink }}>
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 text-[1.05rem] leading-[1.7]" style={{ color: C.muted }}>
          The link may be outdated. Head back to the Clinax homepage.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{ background: GRADIENT }}
        >
          Back to Clinax
        </Link>
      </div>
    </main>
  )
}
