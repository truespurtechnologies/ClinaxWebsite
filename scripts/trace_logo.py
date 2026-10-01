# One-time provenance step: vectorises the approved raster lockup into the
# master SVG set in assets/Logo/svg/. Run from the repo root:
#
#   pip install vtracer pillow
#   python scripts/trace_logo.py
#
# vtracer ignores the alpha channel, so the transparent PNG is first
# flattened onto white. The traced paths are then partitioned by fill:
#   bg      - near-white fills (background + letter counters), dropped
#   ink     - dark navy letterforms
#   neutral - desaturated AA edge slivers (kept verbatim on light variants,
#             recoloured on reversed/mono)
#   mark    - the bright saturated blob colours of the "C"
# and the ink is clustered by vertical centre into wordmark vs tagline.
# Variants recombine the same traced geometry with recoloured fills.
# Afterwards run `node scripts/build-logo.mjs` to regenerate derivatives.

import re
import struct
import vtracer
from pathlib import Path
from PIL import Image

SRC = Path("assets/Logo/Logo Revised 1 without BG.png")
OUT = Path("assets/Logo/svg")
FLAT = OUT / "_flat.png"
TRACE = OUT / "_trace.svg"

INK = "#1F3A54"      # wordmark navy (brand "Primary Text")
WHITE = "#FFFFFF"
INK_MAX_CHANNEL = 140   # fills darker than this count as ink
BG_MIN_CHANNEL = 235    # fills lighter than this are background
NEUTRAL_SAT = 0.30      # fills greyer than this are AA slivers

def png_size(path):
    with open(path, "rb") as f:
        head = f.read(24)
    return struct.unpack(">II", head[16:24])

def hex_rgb(h):
    return int(h[1:3], 16), int(h[3:5], 16), int(h[5:7], 16)

def classify(h):
    r, g, b = hex_rgb(h)
    hi, lo = max(r, g, b), min(r, g, b)
    if lo > BG_MIN_CHANNEL:
        return "bg"
    if hi < INK_MAX_CHANNEL:
        return "ink"
    return "mark" if hi and (hi - lo) / hi > NEUTRAL_SAT else "neutral"

def parse_paths(raw):
    """Each traced path carries d, fill and a translate() transform."""
    out = []
    for tag in re.findall(r"<path[^>]*/?>", raw):
        d = re.search(r'd="([^"]+)"', tag)
        f = re.search(r'fill="([^"]+)"', tag)
        t = re.search(r'transform="translate\(([^)]+)\)"', tag)
        if not d or not f:
            continue
        tx, ty = (float(v) for v in t.group(1).replace(",", " ").split()) if t else (0.0, 0.0)
        out.append({"d": d.group(1), "fill": f.group(1), "tx": tx, "ty": ty})
    return out

def path_bbox(p):
    nums = [float(n) for n in re.findall(r"-?\d+\.?\d*", p["d"])]
    xs, ys = nums[0::2], nums[1::2]
    return min(xs) + p["tx"], min(ys) + p["ty"], max(xs) + p["tx"], max(ys) + p["ty"]

def bbox_union(boxes):
    return (min(b[0] for b in boxes), min(b[1] for b in boxes),
            max(b[2] for b in boxes), max(b[3] for b in boxes))

def fmt_bbox(b, pad=2):
    x0, y0, x1, y1 = b
    return f"{x0 - pad:.1f} {y0 - pad:.1f} {x1 - x0 + 2 * pad:.1f} {y1 - y0 + 2 * pad:.1f}"

def svg(viewbox, paths):
    body = "".join(
        f'<path fill="{p["fill"]}" transform="translate({p["tx"]:g},{p["ty"]:g})" d="{p["d"]}"/>\n'
        for p in paths
    )
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}">\n{body}</svg>\n'

def recolour(paths, colour):
    return [{**p, "fill": colour} for p in paths]

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    w, h = png_size(SRC)
    print(f"source: {w}x{h}")

    # Flatten alpha onto white — vtracer traces RGB and ignores alpha, so
    # garbage RGB under transparent pixels would otherwise become geometry.
    Image.alpha_composite(Image.new("RGBA", (w, h), (255, 255, 255, 255)),
                          Image.open(SRC).convert("RGBA")).convert("RGB").save(FLAT)

    vtracer.convert_image_to_svg_py(
        str(FLAT), str(TRACE),
        colormode="color", hierarchical="cutout", mode="spline",
        filter_speckle=4, color_precision=7, layer_difference=16,
        corner_threshold=60, length_threshold=4.0, splice_threshold=45,
        path_precision=2,
    )

    raw = TRACE.read_text(encoding="utf-8")
    paths = parse_paths(raw)
    print(f"traced {len(paths)} paths")

    mark, ink, neutral, dropped = [], [], [], 0
    for p in paths:
        cls = classify(p["fill"])
        if cls == "bg":
            dropped += 1
        else:
            {"mark": mark, "ink": ink, "neutral": neutral}[cls].append(p)
    print(f"mark {len(mark)}, ink {len(ink)}, neutral {len(neutral)}, bg dropped {dropped}")

    # Split ink+neutrals into wordmark vs tagline at the largest centroid-y gap.
    text = sorted(ink + neutral, key=lambda p: (path_bbox(p)[1] + path_bbox(p)[3]) / 2)
    gaps = sorted(((path_bbox(text[i + 1])[1] - path_bbox(text[i])[3], i)
                   for i in range(len(text) - 1)), reverse=True)
    split = gaps[0][1] + 1
    word_i = [p for p in text[:split] if classify(p["fill"]) == "ink"]
    word_n = [p for p in text[:split] if classify(p["fill"]) != "ink"]
    tag_i = [p for p in text[split:] if classify(p["fill"]) == "ink"]
    tag_n = [p for p in text[split:] if classify(p["fill"]) != "ink"]
    print(f"wordmark: {len(word_i)} ink + {len(word_n)} AA | tagline: {len(tag_i)} ink + {len(tag_n)} AA")

    bb_mark = bbox_union([path_bbox(p) for p in mark])
    bb_word = bbox_union([path_bbox(p) for p in word_i + word_n])
    bb_tag = bbox_union([path_bbox(p) for p in tag_i + tag_n])
    bb_all = bbox_union([bb_mark, bb_word, bb_tag])
    bb_compact = bbox_union([bb_mark, bb_word])

    masters = {
        "clinax-lockup.svg": svg(fmt_bbox(bb_all),
                                 mark + word_n + tag_n + recolour(word_i + tag_i, INK)),
        "clinax-lockup-reversed.svg": svg(fmt_bbox(bb_all),
                                          mark + recolour(word_i + word_n + tag_i + tag_n, WHITE)),
        "clinax-lockup-compact.svg": svg(fmt_bbox(bb_compact),
                                         mark + word_n + recolour(word_i, INK)),
        "clinax-lockup-compact-reversed.svg": svg(fmt_bbox(bb_compact),
                                                  mark + recolour(word_i + word_n, WHITE)),
        "clinax-mark.svg": svg(fmt_bbox(bb_mark), mark),
        "clinax-wordmark.svg": svg(fmt_bbox(bb_word), word_n + recolour(word_i, INK)),
        "clinax-lockup-mono-dark.svg": svg(fmt_bbox(bb_all),
                                           recolour(mark + word_i + word_n + tag_i + tag_n, INK)),
        "clinax-lockup-mono-light.svg": svg(fmt_bbox(bb_all),
                                            recolour(mark + word_i + word_n + tag_i + tag_n, WHITE)),
    }
    for name, content in masters.items():
        (OUT / name).write_text(content, encoding="utf-8")
        print(f"wrote {OUT / name}")

if __name__ == "__main__":
    main()
