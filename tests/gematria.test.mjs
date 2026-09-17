import test from "node:test";
import assert from "node:assert/strict";
import {
  analyzeSentence, calculate, dualGlyphChar, dualText, latinToHebrew,
  letterValue, markdownReport
} from "../js/gematria.js";

test("El Nombre suma 26 en guematría estándar", () => {
  assert.equal(calculate("יהוה").total, 26);
});

test("los signos vocálicos no alteran el resultado", () => {
  assert.equal(calculate("שָׁלוֹם").total, 376);
});

test("acepta código latino en español o inglés", () => {
  assert.equal(latinToHebrew("HAQADOSH"), "הקדוש");
  assert.equal(analyzeSentence("HAQADOSH").total, 415);
  assert.equal(analyzeSentence("CHESED").hebrew, "חסד");
  assert.equal(analyzeSentence("CHESED").total, 72);
  assert.equal(analyzeSentence("SHALOM").total, 376);
});

test("calcula subtotales por palabra y total de oración", () => {
  const result = analyzeSentence("בראשית ברא");
  assert.deepEqual(result.words.map((word) => word.total), [913, 203]);
  assert.equal(result.total, 1116);
});

test("asigna un glifo dual privado a cada forma", () => {
  assert.equal(dualGlyphChar("א").codePointAt(0), 0xE100);
  assert.equal(dualGlyphChar("ת").codePointAt(0), 0xE11A);
});

test("acepta códigos exactos entre corchetes y genera texto con la fuente", () => {
  const result = analyzeSentence("[Y][H][V][H]");
  assert.equal(result.hebrew, "יהוה");
  assert.equal(result.total, 26);
  assert.equal([...dualText("[Y][H][V][H]")].length, 4);
});

test("mispar gadol da valores propios a las formas finales", () => {
  assert.equal(letterValue("ם", "standard"), 40);
  assert.equal(letterValue("ם", "final"), 600);
  assert.equal(letterValue("ץ", "final"), 900);
});

test("genera informes bilingües listos para GitHub", () => {
  const analysis = analyzeSentence("יהוה");
  assert.match(markdownReport("EL NOMBRE", analysis, "es"), /Total de la oración: 26/);
  assert.match(markdownReport("THE NAME", analysis, "en"), /Sentence total: 26/);
});
