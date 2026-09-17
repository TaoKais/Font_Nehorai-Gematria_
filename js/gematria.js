export const MODES = Object.freeze({
  standard: "Guematría estándar",
  final: "Mispar gadol (finales)",
  ordinal: "Valor ordinal",
  reduced: "Mispar katán"
});

const LETTERS = [..."אבגדהוזחטיכלמנסעפצקרשת"];
const STANDARD_SEQUENCE = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 20, 30, 40, 50, 60, 70, 80, 90,
  100, 200, 300, 400
];

const standard = Object.fromEntries(
  LETTERS.map((letter, index) => [letter, STANDARD_SEQUENCE[index]])
);

const FINAL_TO_BASE = Object.freeze({ ך: "כ", ם: "מ", ן: "נ", ף: "פ", ץ: "צ" });
const FINAL_GADOL = Object.freeze({ ך: 500, ם: 600, ן: 700, ף: 800, ץ: 900 });

const ordinal = Object.fromEntries(
  LETTERS.map((letter, index) => [letter, index + 1])
);

function reduceNumber(value) {
  let current = Math.abs(value);
  while (current > 9) {
    current = [...String(current)].reduce((sum, digit) => sum + Number(digit), 0);
  }
  return current;
}

export function removeMarks(text = "") {
  return String(text).normalize("NFD").replace(/[\u0591-\u05C7]/g, "");
}

export function hebrewLetters(text = "") {
  return [...removeMarks(text)].filter((character) =>
    Object.hasOwn(standard, character) || Object.hasOwn(FINAL_TO_BASE, character)
  );
}

export function letterValue(letter, mode = "standard") {
  const base = FINAL_TO_BASE[letter] ?? letter;

  if (mode === "final" && Object.hasOwn(FINAL_GADOL, letter)) {
    return FINAL_GADOL[letter];
  }
  if (mode === "ordinal") {
    return ordinal[base] ?? 0;
  }
  if (mode === "reduced") {
    return reduceNumber(standard[base] ?? 0);
  }
  return standard[base] ?? 0;
}

export function calculate(text, mode = "standard") {
  const letters = hebrewLetters(text);
  const parts = letters.map((letter) => ({ letter, value: letterValue(letter, mode) }));
  return {
    source: String(text),
    clean: letters.join(""),
    mode,
    parts,
    total: parts.reduce((sum, part) => sum + part.value, 0)
  };
}

export function markdownLine(label, calculation) {
  const safeLabel = String(label || "Palabra").replace(/([\\`*_{}\[\]()#+.!|>-])/g, "\\$1");
  const formula = calculation.parts.map(({ letter, value }) => `${letter}(${value})`).join(" + ");
  return `**${safeLabel}** — ${calculation.clean} — ${formula} = **${calculation.total}**`;
}

