export const MODES = Object.freeze({
  standard: { es: "Guematría estándar", en: "Standard gematria" },
  final: { es: "Mispar gadol (finales)", en: "Mispar gadol (final forms)" },
  ordinal: { es: "Valor ordinal", en: "Ordinal value" },
  reduced: { es: "Mispar katán", en: "Mispar katan" }
});

export const DUAL_ALPHABET = Object.freeze([
  { letter: "א", latin: "A", name: { es: "Álef", en: "Aleph" }, standard: 1, pua: 0xE100 },
  { letter: "ב", latin: "B", name: { es: "Bet", en: "Bet" }, standard: 2, pua: 0xE101 },
  { letter: "ג", latin: "G", name: { es: "Guímel", en: "Gimel" }, standard: 3, pua: 0xE102 },
  { letter: "ד", latin: "D", name: { es: "Dálet", en: "Dalet" }, standard: 4, pua: 0xE103 },
  { letter: "ה", latin: "H", name: { es: "He", en: "He" }, standard: 5, pua: 0xE104 },
  { letter: "ו", latin: "V", name: { es: "Vav", en: "Vav" }, standard: 6, pua: 0xE105 },
  { letter: "ז", latin: "Z", name: { es: "Zayin", en: "Zayin" }, standard: 7, pua: 0xE106 },
  { letter: "ח", latin: "Ḥ", name: { es: "Ḥet", en: "Het" }, standard: 8, pua: 0xE107 },
  { letter: "ט", latin: "Ṭ", name: { es: "Tet", en: "Tet" }, standard: 9, pua: 0xE108 },
  { letter: "י", latin: "Y", name: { es: "Yod", en: "Yod" }, standard: 10, pua: 0xE109 },
  { letter: "כ", latin: "K", name: { es: "Kaf", en: "Kaf" }, standard: 20, pua: 0xE10A },
  { letter: "ך", latin: "K*", name: { es: "Kaf final", en: "Final kaf" }, standard: 20, pua: 0xE10B },
  { letter: "ל", latin: "L", name: { es: "Lámed", en: "Lamed" }, standard: 30, pua: 0xE10C },
  { letter: "מ", latin: "M", name: { es: "Mem", en: "Mem" }, standard: 40, pua: 0xE10D },
  { letter: "ם", latin: "M*", name: { es: "Mem final", en: "Final mem" }, standard: 40, pua: 0xE10E },
  { letter: "נ", latin: "N", name: { es: "Nun", en: "Nun" }, standard: 50, pua: 0xE10F },
  { letter: "ן", latin: "N*", name: { es: "Nun final", en: "Final nun" }, standard: 50, pua: 0xE110 },
  { letter: "ס", latin: "S", name: { es: "Sámej", en: "Samekh" }, standard: 60, pua: 0xE111 },
  { letter: "ע", latin: "ʿ", name: { es: "Ayin", en: "Ayin" }, standard: 70, pua: 0xE112 },
  { letter: "פ", latin: "P", name: { es: "Pe", en: "Pe" }, standard: 80, pua: 0xE113 },
  { letter: "ף", latin: "P*", name: { es: "Pe final", en: "Final pe" }, standard: 80, pua: 0xE114 },
  { letter: "צ", latin: "TS", name: { es: "Tsadi", en: "Tsadi" }, standard: 90, pua: 0xE115 },
  { letter: "ץ", latin: "TS*", name: { es: "Tsadi final", en: "Final tsadi" }, standard: 90, pua: 0xE116 },
  { letter: "ק", latin: "Q", name: { es: "Qof", en: "Qof" }, standard: 100, pua: 0xE117 },
  { letter: "ר", latin: "R", name: { es: "Resh", en: "Resh" }, standard: 200, pua: 0xE118 },
  { letter: "ש", latin: "SH", name: { es: "Shin", en: "Shin" }, standard: 300, pua: 0xE119 },
  { letter: "ת", latin: "T", name: { es: "Tav", en: "Tav" }, standard: 400, pua: 0xE11A }
]);

const BY_LETTER = new Map(DUAL_ALPHABET.map((item) => [item.letter, item]));
const BY_LATIN_CODE = new Map(DUAL_ALPHABET.map((item) => [item.latin, item.letter]));
const FINAL_TO_BASE = Object.freeze({ ך: "כ", ם: "מ", ן: "נ", ף: "פ", ץ: "צ" });
const FINAL_GADOL = Object.freeze({ ך: 500, ם: 600, ן: 700, ף: 800, ץ: 900 });
const BASE_ORDER = [..."אבגדהוזחטיכלמנסעפצקרשת"];
const ORDINAL = new Map(BASE_ORDER.map((letter, index) => [letter, index + 1]));

const WORD_DICTIONARY = Object.freeze({
  HAKADOSH: "הקדוש", HAQADOSH: "הקדוש",
  SHALOM: "שלום", EMET: "אמת",
  HESED: "חסד", CHESED: "חסד",
  BITAJON: "ביטחון", BITACHON: "ביטחון", BITAHON: "ביטחון",
  ISRAEL: "ישראל", YISRAEL: "ישראל", ELOHIM: "אלהים"
});

const LATIN_TOKENS = Object.freeze([
  ["SH", "ש"], ["Š", "ש"],
  ["TS", "צ"], ["TZ", "צ"], ["Ṣ", "צ"],
  ["CH", "ח"], ["Ḥ", "ח"], ["KH", "כ"],
  ["Ṭ", "ט"], ["ʿ", "ע"], ["ʻ", "ע"],
  ["A", ""], ["E", ""], ["I", "י"], ["O", "ו"], ["U", "ו"],
  ["B", "ב"], ["G", "ג"], ["D", "ד"], ["H", "ה"],
  ["V", "ו"], ["W", "ו"], ["Z", "ז"], ["T", "ת"],
  ["Y", "י"], ["J", "ח"], ["K", "כ"], ["Q", "ק"],
  ["L", "ל"], ["M", "מ"], ["N", "נ"], ["S", "ס"],
  ["P", "פ"], ["F", "פ"], ["R", "ר"], ["'", "א"], ["’", "א"]
]);

function reduceNumber(value) {
  let current = Math.abs(value);
  while (current > 9) current = [...String(current)].reduce((sum, digit) => sum + Number(digit), 0);
  return current;
}

function applyFinalForm(word) {
  if (!word) return word;
  const finals = { כ: "ך", מ: "ם", נ: "ן", פ: "ף", צ: "ץ" };
  const letters = [...word];
  if (finals[letters.at(-1)]) letters[letters.length - 1] = finals[letters.at(-1)];
  return letters.join("");
}

function latinWordToHebrew(word) {
  const original = word.toLocaleUpperCase("en").normalize("NFC");
  if (WORD_DICTIONARY[original]) return WORD_DICTIONARY[original];
  const compact = original.replace(/[\s._-]+/g, "");
  let result = "";
  let cursor = 0;
  while (cursor < compact.length) {
    const match = LATIN_TOKENS.find(([token]) => compact.startsWith(token, cursor));
    if (!match) { cursor += 1; continue; }
    result += match[1];
    cursor += match[0].length;
  }
  return applyFinalForm(result);
}

export function removeMarks(text = "") {
  return String(text).normalize("NFD").replace(/[\u0591-\u05C7]/g, "");
}

export function hebrewLetters(text = "") {
  return [...removeMarks(text)].filter((character) => BY_LETTER.has(character));
}

export function containsHebrew(text = "") {
  return /[\u05D0-\u05EA]/u.test(String(text));
}

export function latinToHebrew(text = "") {
  const exact = String(text).replace(/\[([^\]]+)\]/gu, (match, code) => {
    return BY_LATIN_CODE.get(code.trim().toLocaleUpperCase("en")) ?? match;
  });
  return exact
    .split(/(\s+|[.,;:!?()[\]{}"“”]+)/u)
    .map((part) => /[A-Za-zÀ-žʿʻḤḥṬṭṢṣŠš'’-]/u.test(part) ? latinWordToHebrew(part) : part)
    .join("");
}

export function normalizeToHebrew(text = "") {
  return containsHebrew(text) ? String(text) : latinToHebrew(text);
}

export function dualGlyphChar(letter) {
  const item = BY_LETTER.get(letter);
  return item ? String.fromCodePoint(item.pua) : "";
}

export function dualText(text = "") {
  const analysis = analyzeSentence(text);
  return analysis.words
    .map((word) => word.parts.map((part) => part.dual).join(""))
    .join(" ");
}

export function latinCode(text = "") {
  return removeMarks(text).split(/\s+/u).filter(Boolean)
    .map((word) => hebrewLetters(word).map((letter) => BY_LETTER.get(letter).latin).join("·"))
    .join("   ");
}

export function letterValue(letter, mode = "standard") {
  const item = BY_LETTER.get(letter);
  if (!item) return 0;
  const base = FINAL_TO_BASE[letter] ?? letter;
  if (mode === "final" && Object.hasOwn(FINAL_GADOL, letter)) return FINAL_GADOL[letter];
  if (mode === "ordinal") return ORDINAL.get(base) ?? 0;
  if (mode === "reduced") return reduceNumber(item.standard);
  return item.standard;
}

export function calculate(text, mode = "standard") {
  const parts = hebrewLetters(text).map((letter) => {
    const item = BY_LETTER.get(letter);
    return {
      letter, latin: item.latin, name: item.name,
      dual: dualGlyphChar(letter), value: letterValue(letter, mode)
    };
  });
  return {
    source: String(text), clean: parts.map((part) => part.letter).join(""),
    latin: parts.map((part) => part.latin).join("·"), mode, parts,
    total: parts.reduce((sum, part) => sum + part.value, 0)
  };
}

export function analyzeSentence(text, mode = "standard") {
  const words = removeMarks(normalizeToHebrew(text)).split(/\s+/u)
    .map((word) => calculate(word, mode)).filter((word) => word.parts.length > 0);
  const parts = words.flatMap((word) => word.parts);
  return {
    source: String(text), hebrew: words.map((word) => word.clean).join(" "),
    latin: words.map((word) => word.latin).join("   "), mode, words, parts,
    total: words.reduce((sum, word) => sum + word.total, 0)
  };
}

export function markdownReport(label, analysis, language = "es") {
  const safeLabel = String(label || (language === "en" ? "Sentence" : "Oración"))
    .replace(/([\\`*_{}\[\]()#+.!|>-])/g, "\\$1");
  const wordFormulas = analysis.words.map((word) => {
    const letters = word.parts.map(({ letter, latin, value }) => `${letter}/${latin}(${value})`).join(" + ");
    return `${word.clean}: ${letters} = ${word.total}`;
  });
  const totalLabel = language === "en" ? "Sentence total" : "Total de la oración";
  return `**${safeLabel}** — ${analysis.hebrew} — ${wordFormulas.join("; ")} — **${totalLabel}: ${analysis.total}**`;
}

export function markdownLine(label, calculation) {
  return markdownReport(label, { hebrew: calculation.clean, words: [calculation], total: calculation.total });
}
