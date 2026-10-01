import Link from "next/link"
import { C, HEADING } from "./theme"
import { ClinaxLogo } from "./Nav"
import Footer from "./Footer"
import type { LegalDoc } from "./legal"

// Shared layout for /privacy and /terms. The main Nav is anchor-based (it
// scrolls within the landing page), so legal pages get a minimal header that
// links back home instead.
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <header className="bg-white" style={{ borderBottom: `1px solid ${C.lavender}` }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Clinax — back to homepage">
            <ClinaxLogo variant="primary" height={34} />
            <span className="hidden sm:inline text-[11px] font-medium tracking-wide border-l pl-2.5 ml-0.5" style={{ color: C.muted, borderColor: C.lavender }}>
              by TrueSpur
            </span>
          </Link>
          <Link
            href="/"
            className="text-[13.5px] font-semibold transition-opacity hover:opacity-70"
            style={{ color: C.violet }}
          >
            ← Back to clinax.in
          </Link>
        </div>
      </header>

      <main className="py-16 sm:py-20" style={{ background: C.surface }}>
        <article className="max-w-3xl mx-auto px-5 sm:px-8">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: C.violet }}>
            Legal
          </p>
          <h1 className="mt-4 text-[2.2rem] sm:text-[2.8rem] leading-[1.08] font-bold tracking-[-0.01em]" style={{ ...HEADING, color: C.ink }}>
            {doc.title}
          </h1>
          <p className="mt-3 text-[13px] font-medium" style={{ color: C.muted }}>
            {doc.updated}
          </p>
          <p className="mt-8 text-[15.5px] leading-[1.75]" style={{ color: C.ink }}>
            {doc.intro}
          </p>

          {doc.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-[1.35rem] leading-tight font-bold" style={{ ...HEADING, color: C.ink }}>
                {s.heading}
              </h2>
              {s.paragraphs?.map((p, i) => (
                <p key={i} className="mt-4 text-[15px] leading-[1.75]" style={{ color: C.muted }}>
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-4 flex flex-col gap-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[15px] leading-[1.7]" style={{ color: C.muted }}>
                      <span className="mt-[9px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: C.magenta }} />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </main>

      <Footer />
    </>
  )
}
