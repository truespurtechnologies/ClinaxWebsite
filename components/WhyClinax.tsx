"use client"

import Image from "next/image"
import { C, HEADING } from "./theme"
import { WHY_CLINAX, WHY_CLINAX_IMAGE } from "./content"
import { useInView, riseStyle } from "./motion"
import { Eyebrow } from "./ui"

// Editorial split — left: the approach narrative as numbered reasons with
// lavender divider lines; right: the clinic-in-action photo spanning both
// rows, sticky while the reasons scroll. On mobile the image sits between
// the heading and the list.
export default function WhyClinax() {
  const { ref, inView } = useInView(0.15)
  return (
    <section className="py-24 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-x-16 gap-y-10">
        <div className="lg:col-span-7">
          <Eyebrow>The Clinax approach</Eyebrow>
          <h2
            className="mt-5 text-[2rem] sm:text-[2.6rem] lg:text-[3rem] leading-[1.08] font-bold tracking-[-0.01em]"
            style={{ ...HEADING, color: C.ink }}
          >
            Why a clinical operating system <em style={{ color: C.magenta }}>— not another app.</em>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-[1.7] max-w-2xl" style={{ color: C.muted }}>
            Not a chat app with a spreadsheet behind it. Not a generic billing system with a notes field. A clinical operating system.
          </p>
        </div>

        <figure className="relative lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-2 self-start lg:sticky lg:top-28" style={riseStyle(inView, 0)}>
          <div
            className="absolute -inset-6 pointer-events-none blur-3xl opacity-60"
            aria-hidden="true"
            style={{ background: `radial-gradient(60% 60% at 50% 40%, rgba(91,15,193,0.14), transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(196,24,147,0.12), transparent 70%)` }}
          />
          <Image
            src="/images/clinic-in-action.webp"
            width={1536}
            height={1024}
            alt={WHY_CLINAX_IMAGE.alt}
            className="relative w-full h-auto rounded-3xl"
            style={{ border: `1px solid ${C.lavender}`, boxShadow: "0 30px 70px -30px rgba(91,15,193,0.35)" }}
          />
          <figcaption
            className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.9)", color: C.ink, border: `1px solid ${C.lavender}` }}
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: C.magenta }} aria-hidden="true" />
            {WHY_CLINAX_IMAGE.caption}
          </figcaption>
        </figure>

        <div ref={ref} className="lg:col-span-7 lg:row-start-2 self-start">
          {WHY_CLINAX.map((item, i) => (
            <div
              key={item.title}
              className="group flex gap-5 sm:gap-6 py-6 sm:py-7 items-start transition-colors duration-200 hover:bg-[#FBF9FE]"
              style={{ ...riseStyle(inView, i * 0.08), borderTop: `1px solid ${C.lavender}` }}
            >
              <span
                className="text-[1.9rem] sm:text-[2.2rem] leading-none font-bold select-none shrink-0"
                style={{ ...HEADING, color: C.lavender }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-[1.15rem] sm:text-[1.25rem] leading-tight font-bold" style={{ ...HEADING, color: C.ink }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.7]" style={{ color: C.muted }}>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.lavender}` }} />
        </div>
      </div>
    </section>
  )
}
