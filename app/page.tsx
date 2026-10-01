import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import Audience from "@/components/Audience"
import PainPoints from "@/components/PainPoints"
import BeforeAfter from "@/components/BeforeAfter"
import Platform from "@/components/Platform"
import ProductExperience from "@/components/ProductExperience"
import PatientJourney from "@/components/PatientJourney"
import Steps from "@/components/Steps"
import WhyClinax from "@/components/WhyClinax"
import Intelligence from "@/components/Intelligence"
import TrustStrip from "@/components/TrustStrip"
import FAQ from "@/components/FAQ"
import FinalCTA from "@/components/FinalCTA"
import Footer from "@/components/Footer"
import StickyCTA from "@/components/StickyCTA"

export default function ClinaxPage() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <Audience />
        <PainPoints />
        <BeforeAfter />
        <Platform />
        <ProductExperience />
        <PatientJourney />
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
