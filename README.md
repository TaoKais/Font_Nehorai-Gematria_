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

The downloadable font stores its 27 combined glyphs at `U+E100–U+E11A`. Use **Copy font glyphs**, paste the result into another application, and apply the **Nehorai AlefBet Dual** font.

## Nota de estudio / Study note

La guematría es una herramienta interpretativa. Una coincidencia numérica no demuestra por sí sola equivalencia lingüística, histórica o teológica.

Gematria is an interpretive study tool. A numerical match does not by itself prove linguistic, historical, or theological equivalence.

## Licencias / Licenses

- Código / Code: MIT, Carlos David.
- Fuente / Font: derivada de DejaVu Sans; consulta `FONT-LICENSE.txt`.
