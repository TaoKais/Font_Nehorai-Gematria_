#!/usr/bin/env python3
"""Build Nehorai AlefBet Dual: Hebrew + Latin code + standard value."""

from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
OUTPUT_TTF = ROOT / "fonts" / "NehoraiAlefBetDual-Regular.ttf"
OUTPUT_WOFF = ROOT / "fonts" / "NehoraiAlefBetDual-Regular.woff"
FAMILY = "Nehorai AlefBet Dual"
POSTSCRIPT = "NehoraiAlefBetDual-Regular"
VERSION = "0.2.0"
CANVAS_WIDTH = 1900

GLYPHS = [
    ("א", "A", 1), ("ב", "B", 2), ("ג", "G", 3), ("ד", "D", 4),
    ("ה", "H", 5), ("ו", "V", 6), ("ז", "Z", 7), ("ח", "Ḥ", 8),
    ("ט", "Ṭ", 9), ("י", "Y", 10), ("כ", "K", 20), ("ך", "K*", 20),
    ("ל", "L", 30), ("מ", "M", 40), ("ם", "M*", 40), ("נ", "N", 50),
    ("ן", "N*", 50), ("ס", "S", 60), ("ע", "ʿ", 70), ("פ", "P", 80),
    ("ף", "P*", 80), ("צ", "TS", 90), ("ץ", "TS*", 90), ("ק", "Q", 100),
    ("ר", "R", 200), ("ש", "SH", 300), ("ת", "T", 400),
]

NAMES = {
    1: FAMILY,
    2: "Regular",
    3: f"{FAMILY} Regular {VERSION}",
    4: f"{FAMILY} Regular",
    5: f"Version {VERSION}",
    6: POSTSCRIPT,
    16: FAMILY,
    17: "Regular",
}


def rename(font: TTFont) -> None:
    for record in font["name"].names:
        if record.nameID not in NAMES:
            continue
        replacement = NAMES[record.nameID]
        try:
            record.string = replacement.encode(record.getEncoding())
        except (LookupError, UnicodeEncodeError):
            record.string = replacement.encode("utf-16-be")


def bounds_for(glyph_set, glyph_name):
    pen = BoundsPen(glyph_set)
    glyph_set[glyph_name].draw(pen)
    return pen.bounds or (0, 0, 0, 0)


def draw_centered(font, target_pen, text, scale, baseline):
    """Draw unshaped display text centered in the custom glyph canvas."""
    cmap = font.getBestCmap()
    glyph_set = font.getGlyphSet()
    runs = []
    total_advance = 0
    for character in text:
        glyph_name = cmap.get(ord(character), ".notdef")
        advance = font["hmtx"].metrics[glyph_name][0]
        runs.append((glyph_name, advance))
        total_advance += advance

    cursor = (CANVAS_WIDTH - total_advance * scale) / 2
    for glyph_name, advance in runs:
        x_min, _, x_max, _ = bounds_for(glyph_set, glyph_name)
        visual_adjust = ((advance - (x_max - x_min)) / 2 - x_min) * scale
        transform = (scale, 0, 0, scale, cursor + visual_adjust, baseline)
        glyph_set[glyph_name].draw(TransformPen(target_pen, transform))
        cursor += advance * scale


def add_dual_glyphs(font: TTFont) -> None:
    glyph_order = list(font.getGlyphOrder())
    glyf = font["glyf"]
    hmtx = font["hmtx"]
    cmap_tables = [table for table in font["cmap"].tables if table.isUnicode()]

    for index, (hebrew, latin, value) in enumerate(GLYPHS):
        codepoint = 0xE100 + index
        glyph_name = f"uni{codepoint:04X}"
        pen = TTGlyphPen(font.getGlyphSet())
        draw_centered(font, pen, hebrew, 0.82, 670)
        draw_centered(font, pen, f"{latin} {value}", 0.30, 45)
        glyf[glyph_name] = pen.glyph()
        hmtx.metrics[glyph_name] = (CANVAS_WIDTH, 0)
        glyph_order.append(glyph_name)
        for table in cmap_tables:
            table.cmap[codepoint] = glyph_name

    font.setGlyphOrder(glyph_order)
    font["maxp"].numGlyphs = len(glyph_order)


def build() -> TTFont:
    font = TTFont(SOURCE)
    rename(font)
    add_dual_glyphs(font)
    return font


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Base font not found: {SOURCE}")
    OUTPUT_TTF.parent.mkdir(parents=True, exist_ok=True)

    font = build()
    font.save(OUTPUT_TTF)

    font = build()
    font.flavor = "woff"
    font.save(OUTPUT_WOFF)

    print(OUTPUT_TTF)
    print(OUTPUT_WOFF)


if __name__ == "__main__":
    main()
