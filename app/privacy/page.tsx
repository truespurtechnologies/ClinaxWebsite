import type { Metadata } from "next"
import LegalPage from "@/components/LegalPage"
import { PRIVACY } from "@/components/legal"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy Policy — Clinax",
  description:
    "How Clinax, a TrueSpur product, collects, uses and protects information through the Clinax website and demo or early-access requests.",
  alternates: { canonical: `${SITE_URL}/privacy` },
}

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} />
}
