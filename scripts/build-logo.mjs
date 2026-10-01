// Generates web derivatives from the SVG logo masters in assets/Logo/svg/
// (masters are produced once by scripts/trace_logo.py — do not hand-edit
// derivatives; re-run this script after masters change).
//
//   node scripts/build-logo.mjs   (requires `sharp` devDependency)
//
// Outputs:
//   public/logo/*.svg         site-usable copies of the masters
//   public/logo/*.png|.webp   raster derivatives (lockups/wordmark 1600w, mark 1024)
//   app/icon.png              favicon — mark centred on transparent square
//   app/apple-icon.png        touch icon — mark on white (iOS masks it itself)

import sharp from "sharp"
import { copyFile, mkdir, readdir } from "node:fs/promises"

const SRC = "assets/Logo/svg"
const OUT = "public/logo"
const RENDER_DENSITY = 300 // render large, then downscale — crisp edges
const LOCKUP_W = 1600
const MARK_W = 1024
const ICON_SIZE = 512
const ICON_PAD = 0.08 // fraction of canvas

async function render(svgPath, width) {
  return sharp(svgPath, { density: RENDER_DENSITY })
    .resize({ width })
    .png()
    .toBuffer()
}

await mkdir(OUT, { recursive: true })

const masters = (await readdir(SRC)).filter((f) => f.endsWith(".svg") && !f.startsWith("_"))
for (const name of masters) {
  const base = name.replace(/\.svg$/, "")
  await copyFile(`${SRC}/${name}`, `${OUT}/${name}`)
  const width = base === "clinax-mark" ? MARK_W : LOCKUP_W
  const png = await render(`${SRC}/${name}`, width)
  await sharp(png).png().toFile(`${OUT}/${base}.png`)
  await sharp(png).webp({ quality: 92 }).toFile(`${OUT}/${base}.webp`)
  console.log(`${name} -> svg, png, webp`)
}

const mark = `${SRC}/clinax-mark.svg`
const inner = Math.round(ICON_SIZE * (1 - ICON_PAD * 2))
const iconMark = await sharp(mark, { density: RENDER_DENSITY }).resize({ width: inner }).png().toBuffer()
const { width: iw, height: ih } = await sharp(iconMark).metadata()
const square = (background, out) =>
  sharp({ create: { width: ICON_SIZE, height: ICON_SIZE, channels: 4, background } })
    .composite([{ input: iconMark, left: Math.round((ICON_SIZE - iw) / 2), top: Math.round((ICON_SIZE - ih) / 2) }])
    .png()
    .toFile(out)
    .then(() => console.log(`wrote ${out}`))

await square({ r: 0, g: 0, b: 0, alpha: 0 }, "app/icon.png")
await square({ r: 255, g: 255, b: 255, alpha: 1 }, "app/apple-icon.png")
