import Link from "next/link"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import FinalCTA from "@/components/FinalCTA"
import JsonLd from "@/components/JsonLd"
import { Eyebrow } from "@/components/ui"
import { C, HEADING } from "@/components/theme"
import { getAllPosts } from "@/lib/blog"
import { breadcrumbLd, graph, pageMetadata, webPageLd } from "@/lib/seo"

const TITLE = "Blog — Running a Physiotherapy Clinic"
const DESCRIPTION =
  "Practical writing for physiotherapy and rehabilitation clinic owners in India: operations, documentation, growing to multiple branches and choosing clinic software."

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/blog", feed: true })

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })

export default function BlogIndex() {
  const posts = getAllPosts()
  return (
    <>
      <JsonLd
        data={graph(
          webPageLd({ path: "/blog", title: TITLE, description: DESCRIPTION, dateModified: posts[0]?.updated ?? "2026-10-11" }),
          breadcrumbLd([{ name: "Clinax", path: "/" }, { name: "Blog", path: "/blog" }])
        )}
      />
      <Nav />
      <main className="overflow-x-clip">
        <section id="top" className="pt-[68px]" style={{ background: C.violetDeep }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-16 sm:pt-20 sm:pb-20">
            <div className="max-w-3xl">
              <Eyebrow dark>Blog</Eyebrow>
              <h1 className="mt-5 text-[2.2rem] sm:text-[2.75rem] leading-[1.08] font-bold tracking-[-0.015em] text-white" style={HEADING}>
                Running a physiotherapy clinic, written down.
              </h1>
              <p className="mt-6 text-[1.05rem] leading-[1.7]" style={{ color: C.lilac }}>{DESCRIPTION}</p>
            </div>
          </div>
        </section>
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 flex flex-col gap-5">
            {posts.map((p) => (
              <article key={p.slug} className="rounded-2xl px-6 py-6 sm:px-8 sm:py-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-22px_rgba(91,15,193,0.4)]" style={{ background: C.surface, border: `1px solid ${C.lavender}` }}>
                <p className="text-[12px] font-medium" style={{ color: C.muted }}>
                  <time dateTime={p.published}>{fmt(p.published)}</time> · {p.readingMinutes} min read
                </p>
                <h2 className="mt-2 text-[1.3rem] sm:text-[1.45rem] leading-snug font-bold" style={{ ...HEADING, color: C.ink }}>
                  <Link href={`/blog/${p.slug}`} className="hover:underline underline-offset-4">{p.title}</Link>
                </h2>
                <p className="mt-3 text-[15px] leading-[1.7]" style={{ color: C.muted }}>{p.description}</p>
              </article>
            ))}
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
