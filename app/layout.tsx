import type { Metadata } from "next"
import { Caladea, Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, KEYWORDS, OG_IMAGE, TITLE_TEMPLATE, graph, organizationLd, websiteLd } from "@/lib/seo"
import JsonLd from "@/components/JsonLd"

// Clinax identity mirrors the Clinax × Physiora proposal deck:
// Cambria headings (Caladea is the metric-compatible web equivalent) and a
// clean sans body. Exposed as CSS variables consumed by components/theme.ts.
const caladea = Caladea({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-cx2-heading",
  display: "swap",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cx2-body",
  display: "swap",
})

const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: TITLE_TEMPLATE },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: KEYWORDS,
  authors: [{ name: "TrueSpur", url: "https://truespur.ai" }],
  creator: "TrueSpur",
  publisher: "TrueSpur",
  category: "Business Software",
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  verification: {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${caladea.variable} ${jakarta.variable}`}>
      <body className="antialiased" style={{ fontFamily: "var(--font-cx2-body)" }}>
        <JsonLd data={graph(organizationLd(), websiteLd())} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
