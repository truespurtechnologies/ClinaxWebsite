import Link from "next/link"
import { C } from "./theme"
import { FOOTER_LINKS, FOOTER_RESOURCES, FOOTER_SOLUTIONS, LEGAL_LINKS } from "./content"
import { ClinaxLogo } from "./Nav"
import { CONTACT_EMAIL, TRUESPUR_URL } from "@/lib/site"

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: C.lilac }}>
        {title}
      </h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[13.5px] font-medium transition-opacity hover:opacity-70" style={{ color: C.lavenderTint }}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="py-14" style={{ background: C.violetDeeper, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <ClinaxLogo variant="reversed" height={36} />
            <p className="text-[13px] leading-[1.65] max-w-sm" style={{ color: C.lilac }}>
              Physiotherapy clinic management software — the clinical operating system for physio &amp; rehab clinics in India.
              Reception, therapists and leadership on one patient record.
            </p>
            <p className="text-[12px]" style={{ color: C.lilac }}>
              <a href={TRUESPUR_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80">
                A TrueSpur product
              </a>
              {" · "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2 hover:opacity-80">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <Column title="Product" links={FOOTER_LINKS} />
            <Column title="Solutions" links={FOOTER_SOLUTIONS} />
            <Column title="Resources" links={[...FOOTER_RESOURCES, ...LEGAL_LINKS]} />
          </div>
        </div>
        <p className="mt-12 pt-6 text-[12px]" style={{ color: C.lilac, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          © {new Date().getFullYear()} TrueSpur. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
