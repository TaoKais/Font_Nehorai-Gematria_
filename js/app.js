import { MODES, calculate, markdownLine } from "./gematria.js";

const input = document.querySelector("#hebrew-input");
const label = document.querySelector("#label-input");
const mode = document.querySelector("#mode");
const word = document.querySelector("#word");
const parts = document.querySelector("#parts");
const total = document.querySelector("#total");
const formula = document.querySelector("#formula");
const copyButton = document.querySelector("#copy-markdown");
const copyStatus = document.querySelector("#copy-status");

for (const [value, title] of Object.entries(MODES)) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = title;
  mode.append(option);
}

function render() {
  const result = calculate(input.value, mode.value);
  word.textContent = result.clean || "—";
  total.textContent = String(result.total);
  formula.textContent = result.parts.length
    ? `${result.parts.map(({ letter, value }) => `${letter}(${value})`).join(" + ")} = ${result.total}`
    : "Escribe una palabra hebrea";

  parts.replaceChildren();
  for (const { letter, value } of result.parts) {
    const card = document.createElement("li");
    const glyph = document.createElement("span");
    const number = document.createElement("span");
    glyph.className = "glyph";
    glyph.textContent = letter;
    number.className = "letter-value";
    number.textContent = String(value);
    card.append(glyph, number);
    parts.append(card);
  }

  copyButton.disabled = result.parts.length === 0;
  copyButton.dataset.markdown = markdownLine(label.value, result);
}

async function copyMarkdown() {
  try {
    await navigator.clipboard.writeText(copyButton.dataset.markdown);
    copyStatus.textContent = "Copiado para GitHub";
  } catch {
    copyStatus.textContent = "No se pudo copiar automáticamente";
  }
  window.setTimeout(() => { copyStatus.textContent = ""; }, 2200);
}

input.addEventListener("input", render);
label.addEventListener("input", render);
mode.addEventListener("change", render);
copyButton.addEventListener("click", copyMarkdown);
render();

