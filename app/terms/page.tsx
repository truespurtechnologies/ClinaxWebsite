import LegalPage from "@/components/LegalPage"
import { TERMS } from "@/components/legal"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "Terms governing use of the Clinax website, a clinical operating system for physiotherapy and rehabilitation clinics by TrueSpur.",
  path: "/terms",
})

export default function TermsPage() {
  return <LegalPage doc={TERMS} />
}
