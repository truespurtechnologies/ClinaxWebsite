import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import FinalCTA from "@/components/FinalCTA"
import StickyCTA from "@/components/StickyCTA"
import JsonLd from "@/components/JsonLd"
import { Eyebrow } from "@/components/ui"
import { C, HEADING } from "@/components/theme"
import { getSolution } from "@/components/solutions"
import { POSTS, getAllPosts, getPost } from "@/lib/blog"
import { articleLd, breadcrumbLd, graph, pageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = getPost(slug)
  if (!p) return {}
  return pageMetadata({
    title: p.seoTitle ?? p.title,
    shareTitle: p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    article: { publishedTime: p.published, modifiedTime: p.updated },
  })
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const { default: Body } = await import(`@/content/blog/${slug}.mdx`)
  const path = `/blog/${post.slug}`
  const solution = post.solution ? getSolution(post.solution) : undefined
  const more = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <JsonLd
        data={graph(
          articleLd({ path, title: post.title, description: post.description, datePublished: post.published, dateModified: post.updated }),
          breadcrumbLd([{ name: "Clinax", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path }])
        )}
      />
      <Nav />
      <main className="overflow-x-clip">
        <section id="top" className="pt-[68px]" style={{ background: C.violetDeep }}>
          <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-14 pb-14 sm:pt-20 sm:pb-16">
            <nav aria-label="Breadcrumb" className="text-[12px] font-medium" style={{ color: C.lilac }}>
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-white">Clinax</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ol>
            </nav>
            <div className="mt-8">
              <Eyebrow dark>Article</Eyebrow>
            </div>
            <h1 className="mt-5 text-balance text-[2rem] sm:text-[2.6rem] leading-[1.1] font-bold tracking-[-0.015em] text-white" style={HEADING}>
              {post.title}
            </h1>
            <p className="mt-5 text-[1.02rem] leading-[1.7]" style={{ color: C.lilac }}>{post.description}</p>
            <p className="mt-6 text-[12.5px] font-medium" style={{ color: C.lilac }}>
              By TrueSpur · <time dateTime={post.published}>{fmt(post.published)}</time>
              {post.updated !== post.published && <> · Updated <time dateTime={post.updated}>{fmt(post.updated)}</time></>}
              {" · "}{post.readingMinutes} min read
            </p>
          </div>
        </section>

        <article className="py-16 sm:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <Body />

            {solution && (
              <aside className="mt-14 rounded-3xl p-7 sm:p-8" style={{ background: C.surface, border: `1px solid ${C.lavender}` }}>
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: C.violet }}>Read next</p>
                <h2 className="mt-3 text-[1.25rem] leading-snug font-bold" style={{ ...HEADING, color: C.ink }}>
                  <Link href={`/solutions/${solution.slug}`} className="hover:underline underline-offset-4">{solution.h1}</Link>
                </h2>
                <p className="mt-2 text-[14.5px] leading-[1.65]" style={{ color: C.muted }}>{solution.description}</p>
              </aside>
            )}

            {more.length > 0 && (
              <div className="mt-14">
                <h2 className="text-[13px] font-bold tracking-[0.14em] uppercase" style={{ color: C.violet }}>More from the blog</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {more.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="text-[15.5px] font-semibold hover:underline underline-offset-4" style={{ color: C.ink }}>
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>

        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
