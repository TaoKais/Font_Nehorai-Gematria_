import { DUAL_ALPHABET, MODES, analyzeSentence, dualText, letterValue, markdownReport } from "./gematria.js";

const COPY = {
  es: {
    eyebrow: "Fuente bidireccional · Alef–Bet", intro: "Cada glifo reúne la letra hebrea, su código latino y su valor. Escribe una palabra o una oración y estudia cada suma hasta el total completo.",
    download: "Descargar fuente TTF", desk: "Mesa de composición", title: "Título del estudio",
    source: "Hebreo o código latino", help: "Puedes escribir הקדוש, HAQADOSH o [Y][H][V][H]. Código inequívoco: Q=ק, K=כ, Ṭ=ט, T=ת, Ḥ=ח, SH=ש y TS=צ.",
    method: "Método numérico", reading: "Lectura bidireccional", total: "Total de la oración",
    copy: "Copiar estudio completo", copyGlyphs: "Copiar glifos de la fuente", copied: "Resultado copiado", glyphsCopied: "Glifos copiados; selecciona la fuente Nehorai al pegarlos", empty: "Escribe en hebreo o con código latino",
    alphabetEyebrow: "27 formas · 22 letras", alphabet: "Alef–Bet de doble lectura",
    alphabetHelp: "Pulsa un glifo para añadirlo. El número exterior cambia con el método elegido; la forma central conserva hebreo y código latino."
  },
  en: {
    eyebrow: "Bidirectional font · Alef–Bet", intro: "Each glyph combines its Hebrew letter, Latin code, and value. Enter a word or sentence and study every sum through the complete total.",
    download: "Download TTF font", desk: "Composition desk", title: "Study title",
    source: "Hebrew or Latin code", help: "You may enter הקדוש, HAQADOSH, or [Y][H][V][H]. Unambiguous code: Q=ק, K=כ, Ṭ=ט, T=ת, Ḥ=ח, SH=ש, and TS=צ.",
    method: "Numeric method", reading: "Bidirectional reading", total: "Sentence total",
    copy: "Copy complete study", copyGlyphs: "Copy font glyphs", copied: "Result copied", glyphsCopied: "Glyphs copied; select the Nehorai font after pasting", empty: "Enter Hebrew or a Latin code",
    alphabetEyebrow: "27 forms · 22 letters", alphabet: "Dual-reading Alef–Bet",
    alphabetHelp: "Select a glyph to add it. The outer number follows the chosen method; the central form preserves its Hebrew letter and Latin code."
  }
};

const input = document.querySelector("#source-input");
const label = document.querySelector("#label-input");
const mode = document.querySelector("#mode");
const language = document.querySelector("#language");
const hebrewOutput = document.querySelector("#hebrew-output");
const latinOutput = document.querySelector("#latin-output");
const glyphWords = document.querySelector("#glyph-words");
const wordTotals = document.querySelector("#word-totals");
const formula = document.querySelector("#formula");
const total = document.querySelector("#total");
const copyButton = document.querySelector("#copy-result");
const copyGlyphsButton = document.querySelector("#copy-glyphs");
const copyStatus = document.querySelector("#copy-status");
const alphabet = document.querySelector("#alphabet-grid");

function translatedName(item) { return item.name[language.value] ?? item.name.es; }

function fillModes() {
  const selected = mode.value || "standard";
  mode.replaceChildren();
  for (const [value, titles] of Object.entries(MODES)) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = titles[language.value];
    mode.append(option);
  }
  mode.value = selected;
}

function translateInterface() {
  const copy = COPY[language.value];
  document.documentElement.lang = language.value;
  document.querySelectorAll("[data-copy]").forEach((element) => {
    element.textContent = copy[element.dataset.copy];
  });
  fillModes();
}

function makeGlyphCard(part, compact = false) {
  const card = document.createElement(compact ? "button" : "li");
  card.className = compact ? "alphabet-key" : "dual-card";
  if (compact) card.type = "button";
  const name = part.name ? (part.name[language.value] ?? part.name.es) : translatedName(part);
  card.setAttribute("aria-label", `${name}: ${part.letter}, ${part.latin}, ${part.value ?? part.standard}`);
  card.title = `${name} · ${part.letter} / ${part.latin} · ${part.value ?? part.standard}`;
  const symbol = document.createElement("span");
  symbol.className = "dual-symbol";
  symbol.textContent = part.dual ?? String.fromCodePoint(part.pua);
  const value = document.createElement("strong");
  value.className = "dynamic-value";
  value.textContent = String(part.value ?? part.standard);
  card.append(symbol, value);
  return card;
}

function renderAlphabet() {
  alphabet.replaceChildren();
  for (const item of DUAL_ALPHABET) {
    const key = makeGlyphCard({ ...item, value: letterValue(item.letter, mode.value) }, true);
    key.addEventListener("click", () => {
      const current = input.value;
      const analysis = analyzeSentence(current, mode.value);
      input.value = /[A-Za-zÀ-ž]/u.test(current) ? `${analysis.hebrew}${item.letter}` : `${current}${item.letter}`;
      input.focus();
      render();
    });
    alphabet.append(key);
  }
}

function render() {
  const analysis = analyzeSentence(input.value, mode.value);
  hebrewOutput.textContent = analysis.hebrew || "—";
  latinOutput.textContent = analysis.latin || "—";
  total.textContent = String(analysis.total);
  glyphWords.replaceChildren();
  wordTotals.replaceChildren();

  for (const word of analysis.words) {
    const group = document.createElement("section");
    group.className = "glyph-word";
    group.dir = "rtl";
    const cards = document.createElement("ol");
    cards.className = "dual-cards";
    for (const part of word.parts) cards.append(makeGlyphCard(part));
    const subtotal = document.createElement("p");
    subtotal.className = "word-subtotal";
    subtotal.textContent = `${word.clean} = ${word.total}`;
    group.append(cards, subtotal);
    glyphWords.append(group);

    const chip = document.createElement("span");
    const hebrew = document.createElement("b");
    const value = document.createElement("i");
    hebrew.dir = "rtl";
    hebrew.lang = "he";
    hebrew.textContent = word.clean;
    value.textContent = String(word.total);
    chip.append(hebrew, value);
    wordTotals.append(chip);
  }

  formula.textContent = analysis.parts.length
    ? `${analysis.parts.map(({ letter, latin, value }) => `${letter}/${latin}(${value})`).join(" + ")} = ${analysis.total}`
    : COPY[language.value].empty;
  copyButton.disabled = analysis.parts.length === 0;
  copyGlyphsButton.disabled = analysis.parts.length === 0;
  copyButton.dataset.result = markdownReport(label.value, analysis, language.value);
  copyGlyphsButton.dataset.result = dualText(input.value);
}

async function copyValue(button, statusKey) {
  try {
    await navigator.clipboard.writeText(button.dataset.result);
    copyStatus.textContent = COPY[language.value][statusKey];
  } catch {
    copyStatus.textContent = language.value === "en" ? "Select and copy the result manually" : "Selecciona y copia el resultado manualmente";
  }
  window.setTimeout(() => { copyStatus.textContent = ""; }, 2200);
}

input.addEventListener("input", render);
label.addEventListener("input", render);
mode.addEventListener("change", () => { renderAlphabet(); render(); });
language.addEventListener("change", () => { translateInterface(); renderAlphabet(); render(); });
copyButton.addEventListener("click", () => copyValue(copyButton, "copied"));
copyGlyphsButton.addEventListener("click", () => copyValue(copyGlyphsButton, "glyphsCopied"));
translateInterface();
renderAlphabet();
render();
