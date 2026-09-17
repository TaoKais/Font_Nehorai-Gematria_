import test from "node:test";
import assert from "node:assert/strict";
import { calculate, letterValue, markdownLine } from "../js/gematria.js";

test("El Nombre suma 26 en guematría estándar", () => {
  assert.equal(calculate("יהוה").total, 26);
});

test("los signos vocálicos no alteran el resultado", () => {
  assert.equal(calculate("שָׁלוֹם").total, 376);
});

test("bitajón y ḥésed suman 157 con la ortografía מלאה", () => {
  assert.equal(calculate("ביטחון").total + calculate("חסד").total, 157);
});

test("las letras finales conservan el valor normal en modo estándar", () => {
  assert.equal(letterValue("ם", "standard"), 40);
  assert.equal(letterValue("ן", "standard"), 50);
});

test("mispar gadol da valores propios a las formas finales", () => {
  assert.equal(letterValue("ם", "final"), 600);
  assert.equal(letterValue("ץ", "final"), 900);
});

test("genera Markdown listo para GitHub", () => {
  assert.equal(
    markdownLine("EL NOMBRE", calculate("יהוה")),
    "**EL NOMBRE** — יהוה — י(10) + ה(5) + ו(6) + ה(5) = **26**"
  );
});

