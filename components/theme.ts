// Clinax design tokens.
//
// Palette is lifted from the Clinax × Physiora proposal deck (Sep 2026) so the
// public product page and customer-facing collateral share one identity.
// Fonts are provided by app/layout.tsx as CSS variables.

export const C = {
  ink: "#241934",
  muted: "#6E6580",
  violet: "#5B0FC1",
  violetDeep: "#3A0C7D",
  violetDeeper: "#2A0860",
  magenta: "#C41893",
  lavender: "#E6DFF5",
  lavenderTint: "#E7D9F7",
  surface: "#F7F4FC",
  lilac: "#B9A9D6",
  peach: "#FDF1E7",
  brown: "#8A4B12",
  white: "#FFFFFF",
} as const

export const HEADING = { fontFamily: "var(--font-cx2-heading)" } as const
export const BODY = { fontFamily: "var(--font-cx2-body)" } as const

export const GRADIENT = `linear-gradient(135deg, ${C.violet} 0%, ${C.magenta} 100%)`
