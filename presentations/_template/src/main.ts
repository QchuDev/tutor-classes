// Plantilla de presentación.
// Copiá esta carpeta a presentations/<materia>-<tema> para empezar una PPT nueva.
//
// Pasos:
//   1. Copiá presentations/_template → presentations/mi-presentacion
//   2. Ajustá el `base` en vite.config.ts y el <title> en index.html
//   3. Escribí tus slides abajo con Slide() / VerticalSlides() / formula()
//   4. Agregá una entrada en presentations.json (id, title, subject, description, path)
//
// Componentes disponibles en el kit compartido @ppts/deck-kit:
//   - Slide(children, options)       → un <section> de reveal.js
//   - VerticalSlides([...])          → grupo navegable con ↑/↓
//   - formula(latex, options)        → fórmula LaTeX (KaTeX)
//   - createDeck({ slidesHtml })     → inyecta los slides e inicializa reveal.js
import { createDeck, Slide, VerticalSlides, formula } from "@ppts/deck-kit";

const slidesHtml = [
  // Portada
  Slide([
    "<h1>Título de la presentación</h1>",
    "<p>Subtítulo o descripción breve</p>",
  ]),

  // Slide con una fórmula
  Slide(formula("a x^2 + b x + c = 0", { variant: "primary", size: "lg" }), {
    title: "Un concepto",
  }),

  // Slide con varios elementos + notas del presentador (tecla "S")
  Slide(
    [
      "<p>Podés combinar texto y fórmulas:</p>",
      formula("E = m c^2", { size: "md" }),
    ],
    { title: "Otro concepto", notes: "Nota para el presentador." }
  ),

  // Sub-diapositivas verticales (se navegan con ↓)
  VerticalSlides([
    Slide("<h2>Sección</h2><p>Presiona ↓</p>"),
    Slide(formula("x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", { size: "lg" }), {
      title: "Detalle",
    }),
  ]),
].join("");

createDeck({ slidesHtml });
