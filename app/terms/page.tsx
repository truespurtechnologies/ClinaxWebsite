import type { Metadata } from "next"
import LegalPage from "@/components/LegalPage"
import { TERMS } from "@/components/legal"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Terms of Service — Clinax",
  description:
    "Terms governing use of the Clinax website, a clinical operating system for physiotherapy and rehabilitation clinics by TrueSpur.",
  alternates: { canonical: `${SITE_URL}/terms` },
}

export default function TermsPage() {
  return <LegalPage doc={TERMS} />
}
