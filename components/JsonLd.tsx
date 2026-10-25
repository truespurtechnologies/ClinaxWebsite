// Server component — emits a schema.org JSON-LD block. Pass the output of
// lib/seo.ts `graph(...)`. `<` is escaped so untrusted copy can never close
// the script tag.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
