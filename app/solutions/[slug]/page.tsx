import type { Metadata } from "next"
import { notFound } from "next/navigation"
import SolutionPage from "@/components/SolutionPage"
import { SOLUTIONS, getSolution } from "@/components/solutions"
import { SITE_URL } from "@/lib/site"
import { OG_IMAGE } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = getSolution(slug)
  if (!s) return {}
  const url = `${SITE_URL}/solutions/${s.slug}`
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: s.title, description: s.description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: s.title, description: s.description, images: [OG_IMAGE.url] },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getSolution(slug)
  if (!s) notFound()
  return <SolutionPage solution={s} />
}
