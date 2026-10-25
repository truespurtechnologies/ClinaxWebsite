import LegalPage from "@/components/LegalPage"
import { PRIVACY } from "@/components/legal"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Clinax, a TrueSpur product, collects, uses and protects information through the Clinax website and demo or early-access requests.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} />
}
