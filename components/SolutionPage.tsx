import Link from "next/link"
import { C, HEADING } from "./theme"
import { CTA } from "./content"
import { SOLUTIONS, type Solution } from "./solutions"
import { PrimaryButton, GhostButton, Eyebrow } from "./ui"
import Nav from "./Nav"
import Steps from "./Steps"
import TrustStrip from "./TrustStrip"
import FinalCTA from "./FinalCTA"
import Footer from "./Footer"
import StickyCTA from "./StickyCTA"
import JsonLd from "./JsonLd"
import { breadcrumbLd, faqLd, graph, softwareLd, webPageLd } from "@/lib/seo"

// Server-rendered template for /solutions/<slug>. Long-form, crawlable copy
// up top (hero + sections + FAQ), then the shared proof/CTA sections from the
// homepage so every solution page converts the same way (#demo).
export default function SolutionPage({ solution }: { solution: Solution }) {
  const path = `/solutions/${solution.slug}`
  const related = solution.related.map((slug) => SOLUTIONS.find((s) => s.slug === slug)).filter((s): s is Solution => Boolean(s))

  return (
    <>
      <JsonLd
        data={graph(
          webPageLd({ path, title: solution.title, description: solution.description, dateModified: solution.updated }),
          breadcrumbLd([
            { name: "Clinax", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: solution.eyebrow, path },
          ]),
          softwareLd(),
          faqLd(solution.faqs)
        )}
      />
      <Nav />
      <main className="overflow-x-clip">
        <section id="top" className="relative overflow-hidden pt-[68px]" style={{ background: C.violetDeep }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(900px 520px at 72% -12%, rgba(196,24,147,0.22), transparent 60%), radial-gradient(900px 620px at 8% 35%, rgba(91,15,193,0.45), transparent 65%)`,
            }}
          />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-16 sm:pt-20 sm:pb-20">
            <nav aria-label="Breadcrumb" className="text-[12px] font-medium" style={{ color: C.lilac }}>
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-white">Clinax</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/solutions" className="hover:text-white">Solutions</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" style={{ color: C.lavenderTint }}>{solution.eyebrow}</li>
              </ol>
            </nav>
            <div className="mt-8 max-w-3xl">
              <Eyebrow dark>{solution.eyebrow}</Eyebrow>
              <h1
                className="mt-5 text-balance text-[2.2rem] sm:text-[2.75rem] lg:text-[3.05rem] leading-[1.07] font-bold tracking-[-0.015em] text-white"
                style={HEADING}
              >
                {solution.h1}
              </h1>
              <p className="mt-7 text-[1rem] sm:text-[1.1rem] leading-[1.7]" style={{ color: C.lilac }}>
                {solution.intro}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <PrimaryButton href="#demo" size="lg">{CTA.primary}</PrimaryButton>
                <GhostButton href="/#product" dark size="lg">{CTA.secondary}</GhostButton>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            {solution.sections.map((s, i) => (
              <div key={s.heading} className={i === 0 ? "" : "mt-14"}>
                <h2 className="text-[1.7rem] sm:text-[2.1rem] leading-[1.15] font-bold tracking-[-0.01em]" style={{ ...HEADING, color: C.ink }}>
                  {s.heading}
                </h2>
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="mt-5 text-[1.02rem] leading-[1.75]" style={{ color: C.muted }}>
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-5 flex flex-col gap-3">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[15.5px] leading-[1.65]" style={{ color: C.ink }}>
                        <span className="mt-[11px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: C.magenta }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 sm:py-24" style={{ background: C.surface, borderTop: `1px solid ${C.lavender}` }}>
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-5 text-[1.7rem] sm:text-[2.1rem] leading-[1.15] font-bold tracking-[-0.01em]" style={{ ...HEADING, color: C.ink }}>
              Common questions
            </h2>
            <dl className="mt-8 flex flex-col gap-3">
              {solution.faqs.map((f) => (
                <div key={f.q} className="rounded-2xl bg-white px-6 py-5" style={{ border: `1px solid ${C.lavender}` }}>
                  <dt className="text-[16px] font-bold leading-snug" style={{ ...HEADING, color: C.ink }}>{f.q}</dt>
                  <dd className="mt-2 text-[15px] leading-[1.7]" style={{ color: C.muted }}>{f.a}</dd>
                </div>
              ))}
            </dl>

            {related.length > 0 && (
              <div className="mt-14">
                <h3 className="text-[13px] font-bold tracking-[0.14em] uppercase" style={{ color: C.violet }}>Related</h3>
                <ul className="mt-4 grid sm:grid-cols-3 gap-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/solutions/${r.slug}`}
                        className="block h-full rounded-2xl bg-white px-5 py-4 text-[14.5px] font-semibold transition-colors hover:bg-[#FBF9FE]"
                        style={{ border: `1px solid ${C.lavender}`, color: C.ink }}
                      >
                        {r.eyebrow}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <Steps />
        <TrustStrip />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
