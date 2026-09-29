import Link from "next/link"
import { C } from "./theme"
import { FOOTER_LINKS, LEGAL_LINKS } from "./content"
import { ClinaxMark } from "./Nav"
import { CONTACT_EMAIL } from "@/lib/site"

export default function Footer() {
  return (
    <footer className="py-10" style={{ background: C.violetDeeper, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <ClinaxMark size={28} />
          <div>
            <p className="text-white font-extrabold text-[16px] leading-none">Clinax</p>
            <p className="text-[11px] mt-1" style={{ color: C.lilac }}>
              The Clinical Operating System · A TrueSpur Product
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {FOOTER_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium transition-opacity hover:opacity-70"
              style={{ color: C.lavenderTint }}
            >
              {l.label}
            </a>
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
