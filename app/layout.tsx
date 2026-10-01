import type { Metadata } from "next"
import { Caladea, Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SITE_NAME, SITE_URL } from "@/lib/site"

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

const TITLE = "Clinax — Clinical Operating System for Physio & Rehab Clinics"
const DESCRIPTION =
  "Clinax replaces WhatsApp, spreadsheets and paper with one clinical operating system connecting reception, therapists and leadership — built for growing physiotherapy & rehabilitation clinics."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: "Built for growing physiotherapy & rehabilitation clinics. One connected operating system for reception, therapists, patients and leadership. Now onboarding early clinics.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/management-dashboard.png",
        width: 1492,
        height: 682,
        alt: "Clinax management dashboard — appointments, revenue and therapist utilisation in one view",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/management-dashboard.png"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${caladea.variable} ${jakarta.variable}`}>
      <body className="antialiased" style={{ fontFamily: "var(--font-cx2-body)" }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
