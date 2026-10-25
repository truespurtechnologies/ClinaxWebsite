// Builds the social share (Open Graph / Twitter) image from the Clinax-branded
// clinic-in-action marketing art (see AGENTS.md — this is the one raw asset
// cleared for public use).
//
//   node scripts/build-og.mjs   (requires `sharp` devDependency)
//
// Output: public/og/clinax-og.jpg — 1200x630, centre crop, progressive JPEG.
// Referenced from app/layout.tsx metadata (openGraph.images / twitter.images).

import sharp from "sharp"
import { mkdir } from "node:fs/promises"

const SRC = "assets/raw/Clinax Physiotherapy Clinic in Action.png"
const OUT_DIR = "public/og"
const OUT = `${OUT_DIR}/clinax-og.jpg`
const W = 1200
const H = 630

await mkdir(OUT_DIR, { recursive: true })
const info = await sharp(SRC)
  .resize({ width: W, height: H, fit: "cover", position: "attention" })
  .jpeg({ quality: 82, progressive: true, mozjpeg: true })
  .toFile(OUT)
console.log(`${OUT}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`)
