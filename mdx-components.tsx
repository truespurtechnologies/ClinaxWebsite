import type { MDXComponents } from "mdx/types"
import Link from "next/link"
import { C, HEADING } from "@/components/theme"

// Typography for blog articles (content/blog/*.mdx). Brand tokens via inline
// style, layout via Tailwind — same convention as the rest of components/.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (p) => <h2 {...p} className="mt-12 text-[1.6rem] sm:text-[1.9rem] leading-[1.2] font-bold tracking-[-0.01em]" style={{ ...HEADING, color: C.ink }} />,
    h3: (p) => <h3 {...p} className="mt-9 text-[1.2rem] sm:text-[1.3rem] leading-snug font-bold" style={{ ...HEADING, color: C.ink }} />,
    p: (p) => <p {...p} className="mt-5 text-[1.02rem] leading-[1.8]" style={{ color: C.muted }} />,
    ul: (p) => <ul {...p} className="mt-5 flex flex-col gap-2.5 pl-5 list-disc marker:text-[#C41893]" />,
    ol: (p) => <ol {...p} className="mt-5 flex flex-col gap-2.5 pl-5 list-decimal marker:font-semibold marker:text-[#5B0FC1]" />,
    li: (p) => <li {...p} className="text-[1rem] leading-[1.7] pl-1" style={{ color: C.ink }} />,
    strong: (p) => <strong {...p} className="font-semibold" style={{ color: C.ink }} />,
    blockquote: (p) => (
      <blockquote {...p} className="mt-6 pl-5 border-l-2 text-[1.05rem] leading-[1.7] italic" style={{ borderColor: C.magenta, color: C.ink }} />
    ),
    hr: () => <hr className="my-12 border-0 h-px" style={{ background: C.lavender }} />,
    a: ({ href = "", children, ...rest }) =>
      href.startsWith("/") || href.startsWith("#") ? (
        <Link href={href} {...rest} className="font-semibold underline underline-offset-4" style={{ color: C.violet }}>
          {children}
        </Link>
      ) : (
        <a href={href} {...rest} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4" style={{ color: C.violet }}>
          {children}
        </a>
      ),
    table: (p) => (
      <div className="mt-6 overflow-x-auto rounded-2xl" style={{ border: `1px solid ${C.lavender}` }}>
        <table {...p} className="w-full text-left text-[14.5px]" />
      </div>
    ),
    th: (p) => <th {...p} className="px-4 py-3 font-bold" style={{ background: C.surface, color: C.ink, borderBottom: `1px solid ${C.lavender}` }} />,
    td: (p) => <td {...p} className="px-4 py-3 align-top leading-[1.6]" style={{ color: C.muted, borderBottom: `1px solid ${C.lavender}` }} />,
    ...components,
  }
}
