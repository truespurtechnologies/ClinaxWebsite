// One-off asset prep script for the Clinax product screenshots.
//
// Reads the raw product screenshots from `assets/raw/`
// (which contain Physiora-specific demo branding) and writes clean,
// kebab-case copies into `public/images/` with the Physiora text
// regions redacted. Originals are left untouched.
//
// Redaction is a flat-fill patch (colour sampled from the pixel just above
// the region, which is reliably background on every screen we redact) —
// not a blur. A blurred patch still reads as a smudge/defect at hero scale;
// a flat fill the same colour as its surroundings makes the text simply
// disappear. Add an explicit `color` on a region (e.g. "#FFFFFF") to
// override the sample if a region ever sits on a busier background.
//
// Usage: node scripts/blur-screenshots.mjs (requires: pnpm add -D sharp)
import sharp from "sharp"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC_DIR = path.join(__dirname, "..", "assets", "raw")
const OUT_DIR = path.join(__dirname, "..", "public", "images")

// Each entry: source file -> output file + list of pixel regions (relative
// to the original screenshot) to blur out because they contain
// "Physiora"/branch-specific text.
const JOBS = [
  {
    src: "Reception Front Desk.png",
    out: "front-desk.png",
    regions: [
      { x: 8, y: 33, w: 155, h: 17, color: "#FFFFFF" }, // sidebar "Physiora Clinic Platform"
      { x: 1102, y: 3, w: 160, h: 44, color: "#FFFFFF" }, // header branch chip + drop shadow "Physiora Velachery"
      { x: 248, y: 84, w: 60, h: 16 }, // subtitle "Physiora • ..."
    ],
  },
  {
    src: "Schedule.png",
    out: "schedule.png",
    regions: [
      { x: 8, y: 33, w: 155, h: 17, color: "#FFFFFF" }, // sidebar "Physiora Clinic Platform"
      { x: 1100, y: 3, w: 155, h: 44, color: "#FFFFFF" }, // header branch chip + drop shadow "Physiora Velachery"
      { x: 1028, y: 144, w: 175, h: 38, color: "#FFFFFF" }, // branch dropdown "Physiora Velachery"
    ],
  },
  {
    src: "Therapist Dashboard.png",
    out: "therapist-dashboard.png",
    regions: [
      { x: 800, y: 3, w: 150, h: 44, color: "#FFFFFF" }, // header branch chip + drop shadow
      { x: 0, y: 87, w: 140, h: 18 }, // "Physiora Velachery • ..."
    ],
  },
  {
    src: "Management Dashboard.png",
    out: "management-dashboard.png",
    regions: [
      { x: 8, y: 33, w: 155, h: 17, color: "#FFFFFF" }, // sidebar "Physiora Clinic Platform"
      // explicit white: sampling 3px above would hit the thin dark accent
      // bar at the very top of this screen, not the header background.
      { x: 1145, y: 4, w: 160, h: 46, color: "#FFFFFF" }, // header branch chip + its drop shadow "Physiora Velachery"
      { x: 215, y: 80, w: 172, h: 16 }, // subtitle "Physiora Velachery • 10 Aug 2026"
      { x: 1202, y: 62, w: 290, h: 36, color: "#FFFFFF" }, // branch tabs All/Velachery/Nungambakkam/OMR
    ],
  },
  // Visit screens have no Physiora-specific text — copy through unchanged.
  { src: "Visit 2.png", out: "visit-assess.png", regions: [] },
  { src: "Visit 3.png", out: "visit-treat.png", regions: [] },
  { src: "Visit 4.png", out: "visit-plan.png", regions: [] },
  { src: "Visit 5.png", out: "visit-complete.png", regions: [] },
]

async function sampleColor(image, meta, x, y) {
  const sx = Math.min(Math.max(x, 0), meta.width - 1)
  const sy = Math.min(Math.max(y - 3, 0), meta.height - 1) // a few px above the region, reliably background
  const { data, info } = await image
    .clone()
    .extract({ left: sx, top: sy, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true })
  const [r, g, b] = data
  return info.channels === 4 ? { r, g, b, alpha: data[3] / 255 } : { r, g, b, alpha: 1 }
}

async function fillRegion(image, meta, region) {
  const { x, y, w, h, color } = region
  const clampedW = Math.min(w, meta.width - x)
  const clampedH = Math.min(h, meta.height - y)
  if (clampedW <= 0 || clampedH <= 0) return null
  const background = color ?? (await sampleColor(image, meta, x, y))
  const patch = await sharp({ create: { width: clampedW, height: clampedH, channels: 4, background } })
    .png()
    .toBuffer()
  return { input: patch, left: x, top: y }
}

async function run() {
  await sharp({ create: { width: 1, height: 1, channels: 4, background: "#fff" } })
    .png()
    .toBuffer()
    .catch(() => {}) // no-op, just ensures sharp is initialised early

  const fs = await import("node:fs/promises")
  await fs.mkdir(OUT_DIR, { recursive: true })

  for (const job of JOBS) {
    const srcPath = path.join(SRC_DIR, job.src)
    const outPath = path.join(OUT_DIR, job.out)
    const base = sharp(srcPath)
    const meta = await base.metadata()

    if (job.regions.length === 0) {
      await sharp(srcPath).toFile(outPath)
      console.log(`copied   ${job.src} -> ${job.out}`)
      continue
    }

    const composites = []
    for (const region of job.regions) {
      const patch = await fillRegion(base, meta, region)
      if (patch) composites.push(patch)
    }

    await sharp(srcPath).composite(composites).toFile(outPath)
    console.log(`redacted ${job.src} -> ${job.out} (${composites.length} regions)`)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
