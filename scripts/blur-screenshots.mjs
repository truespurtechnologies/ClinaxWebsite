// One-off asset prep script for the Clinax product screenshots.
//
// Reads the raw product screenshots from `assets/raw/`
// (which contain Physiora-specific demo branding) and writes clean,
// kebab-case copies into `public/images/` with the Physiora text
// regions blurred out. Originals are left untouched.
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
      { x: 48, y: 30, w: 120, h: 18 }, // sidebar "Physiora Clinic Platform"
      { x: 1108, y: 12, w: 140, h: 28 }, // header branch chip "Physiora Velachery"
      { x: 248, y: 84, w: 60, h: 16 }, // subtitle "Physiora • ..."
    ],
  },
  {
    src: "Schedule.png",
    out: "schedule.png",
    regions: [
      { x: 40, y: 28, w: 120, h: 18 }, // sidebar "Physiora Clinic Platform"
      { x: 1100, y: 2, w: 200, h: 32 }, // header branch chip "Physiora Velachery"
      { x: 1030, y: 150, w: 175, h: 30 }, // branch dropdown "Physiora Velachery"
    ],
  },
  {
    src: "Therapist Dashboard.png",
    out: "therapist-dashboard.png",
    regions: [
      { x: 800, y: 6, w: 150, h: 30 }, // header branch chip
      { x: 0, y: 88, w: 130, h: 16 }, // "Physiora Velachery • ..."
    ],
  },
  {
    src: "Management Dashboard.png",
    out: "management-dashboard.png",
    regions: [
      { x: 28, y: 34, w: 140, h: 14 }, // sidebar "Physiora Clinic Platform"
      { x: 1140, y: 6, w: 185, h: 28 }, // header branch chip "Physiora Velachery"
      { x: 210, y: 78, w: 150, h: 18 }, // subtitle "Physiora Velachery • ..."
      { x: 1250, y: 60, w: 242, h: 40 }, // branch tabs Velachery/Nungambakkam/OMR
    ],
  },
  // Visit screens have no Physiora-specific text — copy through unchanged.
  { src: "Visit 2.png", out: "visit-assess.png", regions: [] },
  { src: "Visit 3.png", out: "visit-treat.png", regions: [] },
  { src: "Visit 4.png", out: "visit-plan.png", regions: [] },
  { src: "Visit 5.png", out: "visit-complete.png", regions: [] },
]

async function blurRegion(image, meta, region) {
  const { x, y, w, h } = region
  const clampedW = Math.min(w, meta.width - x)
  const clampedH = Math.min(h, meta.height - y)
  if (clampedW <= 0 || clampedH <= 0) return null
  const blurredPatch = await sharp(await image.clone().extract({ left: x, top: y, width: clampedW, height: clampedH }).toBuffer())
    .blur(14)
    .toBuffer()
  return { input: blurredPatch, left: x, top: y }
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
      const patch = await blurRegion(base, meta, region)
      if (patch) composites.push(patch)
    }

    await sharp(srcPath).composite(composites).toFile(outPath)
    console.log(`blurred  ${job.src} -> ${job.out} (${composites.length} regions)`)
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
