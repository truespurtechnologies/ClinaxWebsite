import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import Audience from "@/components/Audience"
import PainPoints from "@/components/PainPoints"
import BeforeAfter from "@/components/BeforeAfter"
import Platform from "@/components/Platform"
import ProductExperience from "@/components/ProductExperience"
import Steps from "@/components/Steps"
import WhyClinax from "@/components/WhyClinax"
import Intelligence from "@/components/Intelligence"
import TrustStrip from "@/components/TrustStrip"
import FAQ from "@/components/FAQ"
import FinalCTA from "@/components/FinalCTA"
import Footer from "@/components/Footer"
import StickyCTA from "@/components/StickyCTA"
import JsonLd from "@/components/JsonLd"
import { FAQS } from "@/components/content"
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, HOME_LAST_MODIFIED, faqLd, graph, pageMetadata, softwareLd, webPageLd } from "@/lib/seo"

export const metadata = pageMetadata({ title: DEFAULT_TITLE, absoluteTitle: true, description: DEFAULT_DESCRIPTION, path: "/", feed: true })

export default function ClinaxPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageLd({ path: "/", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, dateModified: HOME_LAST_MODIFIED }),
          softwareLd(),
          faqLd(FAQS)
        )}
      />
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <Audience />
        <PainPoints />
        <BeforeAfter />
        <Platform />
        <ProductExperience />
        <Steps />
        <WhyClinax />
        <Intelligence />
        <TrustStrip />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
