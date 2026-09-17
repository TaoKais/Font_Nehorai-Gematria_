#!/usr/bin/env python3
"""Build the renamed TTF and WOFF font assets from DejaVu Sans."""

from pathlib import Path
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
OUTPUT_TTF = ROOT / "fonts" / "NehoraiGematria-Regular.ttf"
OUTPUT_WOFF = ROOT / "fonts" / "NehoraiGematria-Regular.woff"

NAMES = {
    1: "Nehorai Gematria",
    2: "Regular",
    3: "Nehorai Gematria Regular 0.1.0",
    4: "Nehorai Gematria Regular",
    6: "NehoraiGematria-Regular",
    16: "Nehorai Gematria",
    17: "Regular",
}


def renamed_font() -> TTFont:
    font = TTFont(SOURCE)
    table = font["name"]
    for record in table.names:
        if record.nameID in NAMES:
            replacement = NAMES[record.nameID]
            encoding = record.getEncoding()
            try:
                record.string = replacement.encode(encoding)
            except (LookupError, UnicodeEncodeError):
                record.string = replacement.encode("utf-16-be")
    return font


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"No se encontró la fuente base: {SOURCE}")
    OUTPUT_TTF.parent.mkdir(parents=True, exist_ok=True)

    font = renamed_font()
    font.save(OUTPUT_TTF)

    font = renamed_font()
    font.flavor = "woff"
    font.save(OUTPUT_WOFF)

    print(OUTPUT_TTF)
    print(OUTPUT_WOFF)


if __name__ == "__main__":
    main()
