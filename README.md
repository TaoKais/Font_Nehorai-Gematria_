# Nehorai Alef–Bet Dual

Fuente personalizada latino–hebrea y cuaderno bilingüe de guematría para estudiar letras, palabras y oraciones completas.

**Demo:** <https://taokais.github.io/Font_Nehorai-Gematria_/>

**English:** [jump to the English guide](#english-guide)

## Qué hace

Cada uno de los 27 glifos de estudio reúne tres datos dentro de una sola forma:

- letra hebrea;
- código latino inequívoco;
- valor estándar de guematría.

La aplicación muestra además el valor dinámico según el método elegido, el subtotal de cada palabra y el total de toda la oración. Su interfaz cambia entre **Español** y **English**.

## Tres capas: original, transliteración y hebreo

Nehorai Alef–Bet Dual distingue explícitamente entre **transliterar** una palabra extranjera con letras hebreas y **traducirla** al hebreo. Son operaciones diferentes y sus valores de guematría no deben confundirse.

### A. Texto de origen

Es la frase introducida por el usuario en español o inglés.

Ejemplo:

> ¿QUIÉN TE HA CONSTITUIDO JEFE Y JUEZ SOBRE NOSOTROS?

### B. Transliteración fonética al Alef–Bet

La aplicación puede representar los sonidos o códigos de una palabra española o inglesa mediante letras del Alef–Bet. Esta capa es una **codificación/transliteración fonética** y **no constituye una traducción al hebreo**.

Los subtotales y totales mostrados en esta capa son, por tanto, el **valor gemátrico de la transliteración**: la suma de las letras hebreas utilizadas para representar la forma sonora o codificada de la palabra original.

Por ejemplo, dentro del sistema de transliteración:

```text
QUIÉN → קוין → 100 + 6 + 10 + 50 = 166
```

Ese `166` pertenece a la representación `קוין`; no significa que la palabra hebrea real para «quién» tenga ese valor.

### C. Hebreo real / traducción semántica

Cuando existe una traducción hebrea o un texto bíblico de referencia, debe mostrarse en una capa separada. Aquí sí se calculan los valores de las **palabras hebreas reales**.

Para Éxodo 2:14, la pregunta «¿Quién te ha constituido jefe y juez sobre nosotros?» aparece en hebreo como:

```text
מִי שָׂמְךָ לְאִישׁ שַׂר וְשֹׁפֵט עָלֵינוּ
```

Sin niqqud:

```text
מי שמך לאיש שר ושפט עלינו
```

| Español | Hebreo | Gematría estándar |
|---|---:|---:|
| quién | `מי` | 50 |
| te puso / constituyó | `שמך` | 360 |
| como hombre | `לאיש` | 341 |
| jefe / príncipe | `שר` | 500 |
| y juez | `ושפט` | 395 |
| sobre nosotros | `עלינו` | 166 |

**Total del hebreo bíblico: 1812.**

La interfaz debería identificar claramente estas capas, por ejemplo:

1. **Original ES/EN**
2. **Transliteración fonética → Alef–Bet — no es traducción**
3. **Hebreo semántico / texto bíblico**
4. **Gematría de la transliteración**
5. **Gematría del hebreo**

El objetivo es permitir comparar ambas representaciones sin afirmar una equivalencia lingüística simplemente porque coincidan letras o números.

Ejemplos de entrada:

| Entrada | Hebreo | Total estándar |
|---|---:|---:|
| `SHALOM` | שלום | 376 |
| `CHESED` | חסד | 72 |
| `HAQADOSH` | הקדוש | 415 |
| `[Y][H][V][H]` | יהוה | 26 |
| `בראשית ברא` | בראשית ברא | 1116 |

Los corchetes permiten indicar cada letra exactamente: `Q=ק`, `K=כ`, `Ṭ=ט`, `T=ת`, `Ḥ=ח`, `SH=ש` y `TS=צ`. Las formas finales se escriben como `K*`, `M*`, `N*`, `P*` y `TS*`.

## La fuente

Descarga e instala:

- `fonts/NehoraiAlefBetDual-Regular.ttf`
- `fonts/NehoraiAlefBetDual-Regular.woff` para la web

La fuente utiliza 27 posiciones del Área de Uso Privado de Unicode (`U+E100–U+E11A`) para no reemplazar las letras latinas o hebreas normales del sistema. El botón **Copiar glifos de la fuente** genera esa secuencia: después de pegarla en otra aplicación, selecciona **Nehorai AlefBet Dual**.

La fuente presenta los glifos. JavaScript calcula las sumas, ya que OpenType no puede evaluar dinámicamente cualquier oración.

## Métodos incluidos

| Método | Regla resumida |
|---|---|
| Estándar | א=1…ט=9; י=10…צ=90; ק=100…ת=400 |
| Mispar gadol | ך=500, ם=600, ן=700, ף=800, ץ=900 |
| Ordinal | Las 22 letras valen de 1 a 22 |
| Mispar katán | Cada valor se reduce a una cifra |

Los signos vocálicos y de cantilación se conservan al escribir hebreo, pero no se suman. Los espacios y la puntuación tampoco alteran el resultado.

## Desarrollo local

```bash
python3 tools/build_font.py
npm test
npm run serve
```

Después abre <http://localhost:8080>. El flujo de GitHub Actions ejecuta las pruebas y publica GitHub Pages en cada envío a `main`.

## English guide

Nehorai Alef–Bet Dual is a custom Latin–Hebrew study font and bilingual gematria notebook. Each study glyph contains the Hebrew letter, an unambiguous Latin code, and its standard value. The web app calculates every letter, each word subtotal, and the complete sentence total.

Select **English** in the interface. You may enter Hebrew directly, familiar forms such as `SHALOM`, `CHESED`, or `HAQADOSH`, and exact bracket codes such as `[Y][H][V][H]`.

### Three distinct layers

The project distinguishes **phonetic/transcription mapping** from **semantic Hebrew translation**. A Latin word rendered with Alef–Bet characters is not automatically a Hebrew word.

1. **Original ES/EN text** — the user's source sentence.
2. **Phonetic transliteration → Alef–Bet** — a sound/code representation; **not a Hebrew translation**.
3. **Semantic Hebrew / source text** — actual Hebrew wording when available.
4. **Transliteration gematria** — values of the Hebrew characters chosen for the transcription.
5. **Hebrew gematria** — values of the actual Hebrew words.

A numerical match between the two layers is useful for study or comparison, but it does not by itself establish linguistic, historical, or theological equivalence.

The downloadable font stores its 27 combined glyphs at `U+E100–U+E11A`. Use **Copy font glyphs**, paste the result into another application, and apply the **Nehorai AlefBet Dual** font.

## Nota de estudio / Study note

La guematría es una herramienta interpretativa. Una coincidencia numérica no demuestra por sí sola equivalencia lingüística, histórica o teológica.

Gematria is an interpretive study tool. A numerical match does not by itself prove linguistic, historical, or theological equivalence.

## Licencias / Licenses

- Código / Code: MIT, Carlos David.
- Fuente / Font: derivada de DejaVu Sans; consulta `FONT-LICENSE.txt`.
