import Link from "next/link"
import { C } from "./theme"
import { FOOTER_LINKS, LEGAL_LINKS } from "./content"
import { ClinaxLogo } from "./Nav"
import { CONTACT_EMAIL, TRUESPUR_URL } from "@/lib/site"

export default function Footer() {
  return (
    <footer className="py-10" style={{ background: C.violetDeeper, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <ClinaxLogo variant="reversed" height={36} />
          <p className="text-[11px]" style={{ color: C.lilac }}>
            The clinical operating system for physiotherapy &amp; rehabilitation clinics ·{" "}
            <a href={TRUESPUR_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80">
              A TrueSpur product
            </a>
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {FOOTER_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium transition-opacity hover:opacity-70"
              style={{ color: C.lavenderTint }}
            >
              {l.label}
            </Link>
          ))}
          {LEGAL_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium transition-opacity hover:opacity-70"
              style={{ color: C.lavenderTint }}
            >
              {l.label}
            </Link>
          ))}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[13px] font-medium transition-opacity hover:opacity-70" style={{ color: C.lavenderTint }}>
            {CONTACT_EMAIL}
          </a>
        </nav>

        <p className="text-[12px]" style={{ color: C.lilac }}>
          © {new Date().getFullYear()} TrueSpur. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
