# Nehorai Gematria

Fuente hebrea de uso personal y calculadora visual para estudiar guematría en el navegador. No necesita servidor, base de datos ni API.

> **EL NOMBRE** — יהוה — י(10) + ה(5) + ו(6) + ה(5) = **26**

## Qué contiene

- `fonts/NehoraiGematria-Regular.ttf`: fuente instalable en Windows, Linux y macOS.
- `fonts/NehoraiGematria-Regular.woff`: versión optimizada para la web.
- Calculadora letra por letra preparada para GitHub Pages.
- Métodos estándar, ordinal, reducido y *mispar gadol* para letras finales.
- Escritura con *niqqud*: los signos se muestran, pero no alteran la suma.
- Botón para copiar una fórmula en Markdown y pegarla en un README.

La fuente presenta los caracteres. El cálculo lo realiza `js/gematria.js`, porque OpenType no puede evaluar dinámicamente una suma a partir de cualquier palabra.

## Usarla localmente

```bash
npm test
npm run serve
```

Después abre <http://localhost:8080>.

También puedes abrir `index.html` directamente, aunque un servidor local evita restricciones de algunos navegadores con módulos JavaScript.

## Instalar la fuente en Windows

1. Abre la carpeta `fonts`.
2. Haz clic derecho en `NehoraiGematria-Regular.ttf`.
3. Elige **Instalar** o **Instalar para todos los usuarios**.
4. Reinicia la aplicación donde quieras usarla y selecciona **Nehorai Gematria**.

La fuente permite escribir hebreo, pero el teclado hebreo de Windows debe estar activado por separado. Cambia entre español y hebreo con `Win + Espacio`.

## Publicarla en GitHub

```bash
git init
git add .
git commit -m "Primera versión de Nehorai Gematria"
git branch -M main
gh repo create nehorai-gematria --public --source=. --remote=origin --push
```

En GitHub abre **Settings → Pages** y elige **GitHub Actions** como origen. El flujo incluido prueba los cálculos y publica la página en cada envío a `main`.

## Uso desde otro proyecto

```css
@font-face {
  font-family: "Nehorai Gematria";
  src: url("./fonts/NehoraiGematria-Regular.woff") format("woff");
  font-display: swap;
}

.hebreo {
  font-family: "Nehorai Gematria", sans-serif;
  direction: rtl;
}
```

Y para calcular desde JavaScript:

```js
import { calculate } from "./js/gematria.js";

console.log(calculate("יהוה"));
// total: 26
```

## Métodos incluidos

| Método | Regla resumida |
|---|---|
| Estándar | א=1…ט=9; י=10…צ=90; ק=100…ת=400 |
| Finales | ך=500, ם=600, ן=700, ף=800, ץ=900 |
| Ordinal | Las 22 letras valen de 1 a 22 |
| Reducido | Se reduce cada valor a una cifra |

La guematría es una herramienta interpretativa y de estudio; una coincidencia numérica no demuestra por sí sola equivalencia lingüística, histórica o teológica.

## Licencias

- Código: MIT, a nombre de Carlos David.
- Fuente: derivada renombrada de DejaVu Sans; consulta `FONT-LICENSE.txt`.
