import type { Metadata } from "next"
import { notFound } from "next/navigation"
import SolutionPage from "@/components/SolutionPage"
import { SOLUTIONS, getSolution } from "@/components/solutions"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = getSolution(slug)
  if (!s) return {}
  return pageMetadata({ title: s.title, shareTitle: s.title, description: s.description, path: `/solutions/${s.slug}` })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getSolution(slug)
  if (!s) notFound()
  return <SolutionPage solution={s} />
}
