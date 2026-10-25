import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { HOME_LAST_MODIFIED, LEGAL_LAST_MODIFIED } from "@/lib/seo"
import { SOLUTIONS } from "@/components/solutions"
import { getAllPosts } from "@/lib/blog"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const blogLatest = posts[0]?.updated ?? HOME_LAST_MODIFIED
  return [
    { url: SITE_URL, lastModified: HOME_LAST_MODIFIED, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/solutions`, lastModified: HOME_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    ...SOLUTIONS.map((s) => ({
      url: `${SITE_URL}/solutions/${s.slug}`,
      lastModified: s.updated,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/blog`, lastModified: blogLatest, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.updated,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/privacy`, lastModified: LEGAL_LAST_MODIFIED, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: LEGAL_LAST_MODIFIED, changeFrequency: "yearly", priority: 0.2 },
  ]
}
