import type { Metadata } from "next"
import Link from "next/link"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import FinalCTA from "@/components/FinalCTA"
import JsonLd from "@/components/JsonLd"
import { Eyebrow } from "@/components/ui"
import { SOLUTIONS } from "@/components/solutions"
import { C, HEADING } from "@/components/theme"
import { SITE_URL } from "@/lib/site"
import { HOME_LAST_MODIFIED, breadcrumbLd, graph, webPageLd } from "@/lib/seo"

const TITLE = "Solutions — Clinic Software for Physiotherapy, Rehab & Multi-Branch Clinics"
const DESCRIPTION =
  "How Clinax fits physiotherapy clinics, rehabilitation centres and multi-branch practices — one clinical operating system for reception, therapists and leadership."

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Clinax` },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/solutions` },
  openGraph: { url: `${SITE_URL}/solutions` },
}

export default function SolutionsIndex() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageLd({ path: "/solutions", title: TITLE, description: DESCRIPTION, dateModified: HOME_LAST_MODIFIED }),
          breadcrumbLd([{ name: "Clinax", path: "/" }, { name: "Solutions", path: "/solutions" }])
        )}
      />
      <Nav />
      <main className="overflow-x-clip">
        <section id="top" className="pt-[68px]" style={{ background: C.violetDeep }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-16 sm:pt-20 sm:pb-20">
            <div className="max-w-3xl">
              <Eyebrow dark>Solutions</Eyebrow>
              <h1 className="mt-5 text-[2.2rem] sm:text-[2.75rem] leading-[1.08] font-bold tracking-[-0.015em] text-white" style={HEADING}>
                One clinical operating system. Built for the clinic you are running.
              </h1>
              <p className="mt-6 text-[1.05rem] leading-[1.7]" style={{ color: C.lilac }}>{DESCRIPTION}</p>
            </div>
          </div>
        </section>
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOLUTIONS.map((s) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="group flex flex-col rounded-2xl px-6 py-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_44px_-22px_rgba(91,15,193,0.4)]"
                style={{ background: C.surface, border: `1px solid ${C.lavender}` }}
              >
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: C.violet }}>{s.eyebrow}</span>
                <h2 className="mt-3 text-[1.2rem] leading-snug font-bold" style={{ ...HEADING, color: C.ink }}>{s.h1}</h2>
                <p className="mt-3 text-[14px] leading-[1.65]" style={{ color: C.muted }}>{s.description}</p>
                <span className="mt-5 text-[13.5px] font-semibold group-hover:underline underline-offset-4" style={{ color: C.violet }}>
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
