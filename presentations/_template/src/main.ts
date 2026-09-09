// ─────────────────────────────────────────────────────────────────────────
//  PLANTILLA / CATÁLOGO DE SLIDES
//
//  Esta presentación NO se publica (no está en presentations.json).
//  Es una galería de referencia: un slide por cada componente/opción del kit
//  @ppts/deck-kit. Copiá el bloque que necesites cuando armes una PPT real.
//
//  Verla con hot-reload:
//    pnpm --filter @ppts/template dev
//  (o: cd presentations/_template && pnpm dev)
//
//  Para crear una PPT real a partir de esto:
//    pnpm new-ppt
// ─────────────────────────────────────────────────────────────────────────
import { createDeck, Slide, VerticalSlides, formula } from "@ppts/deck-kit";

const slidesHtml = [
  // ═══════════════════════════════════════════════════════════════════════
  //  1. PORTADA — varios hijos (array de HTML) en un mismo slide
  // ═══════════════════════════════════════════════════════════════════════
  Slide([
    "<h1>Catálogo de slides</h1>",
    "<p>Un ejemplo por cada componente del kit</p>",
    "<p style='opacity:.6; font-size:.8em'>Navegá con → y ↓</p>",
  ]),

  // ═══════════════════════════════════════════════════════════════════════
  //  2. SLIDE con título (option: title)
  // ═══════════════════════════════════════════════════════════════════════
  Slide("<p>El texto del cuerpo va acá.</p>", {
    title: "Slide con título",
  }),

  // ═══════════════════════════════════════════════════════════════════════
  //  3. FÓRMULA — variantes de color (default | primary | accent)
  // ═══════════════════════════════════════════════════════════════════════
  Slide(
    [
      formula("a^2 + b^2 = c^2", { variant: "default" }),
      formula("a^2 + b^2 = c^2", { variant: "primary" }),
      formula("a^2 + b^2 = c^2", { variant: "accent" }),
    ],
    { title: "formula · variantes de color" }
  ),

  // ═══════════════════════════════════════════════════════════════════════
  //  4. FÓRMULA — tamaños (sm | md | lg)
  // ═══════════════════════════════════════════════════════════════════════
  Slide(
    [
      formula("E = m c^2", { size: "sm" }),
      formula("E = m c^2", { size: "md" }),
      formula("E = m c^2", { size: "lg" }),
    ],
    { title: "formula · tamaños" }
  ),

  // ═══════════════════════════════════════════════════════════════════════
  //  5. FÓRMULA — alineación (left | center | right) y título propio
  // ═══════════════════════════════════════════════════════════════════════
  Slide(
    [
      formula("f(x) = x^2", { align: "left", title: "Izquierda" }),
      formula("f(x) = x^2", { align: "center", title: "Centro" }),
      formula("f(x) = x^2", { align: "right", title: "Derecha" }),
    ],
    { title: "formula · alineación + título" }
  ),

  // ═══════════════════════════════════════════════════════════════════════
  //  6. FÓRMULA — modo texto plano (latex: false), sin renderizar LaTeX
  // ═══════════════════════════════════════════════════════════════════════
  Slide(
    formula("velocidad = distancia / tiempo", {
      latex: false,
      variant: "primary",
      size: "md",
    }),
    { title: "formula · texto plano (latex: false)" }
  ),

  // ═══════════════════════════════════════════════════════════════════════
  //  7. SLIDE con fondo de color (option: background)
  // ═══════════════════════════════════════════════════════════════════════
  Slide(formula("\\int_a^b f(x)\\,dx", { variant: "accent", size: "lg" }), {
    title: "Slide con fondo",
    background: "#1a1a2e",
  }),

  // ═══════════════════════════════════════════════════════════════════════
  //  8. SLIDE con notas del presentador (option: notes) — tecla "S"
  // ═══════════════════════════════════════════════════════════════════════
  Slide("<p>Abrí la vista de presentador con la tecla <code>S</code>.</p>", {
    title: "Slide con notas",
    notes: "Estas notas solo se ven en la vista de presentador (tecla S).",
  }),

  // ═══════════════════════════════════════════════════════════════════════
  //  9. SLIDE con id + className (options: id, className)
  //     Útil para enlaces internos (#intro) o estilos propios.
  // ═══════════════════════════════════════════════════════════════════════
  Slide("<p>Este slide tiene <code>id=\"intro\"</code> y una clase propia.</p>", {
    title: "Slide con id y className",
    id: "intro",
    className: "destacado",
  }),

  // ═══════════════════════════════════════════════════════════════════════
  //  10. TRANSICIONES — agrupadas en sub-slides (option: transition)
  //      La transición es del Slide entero, por eso cada variante necesita su
  //      propio <section>; las juntamos en un grupo vertical (navegá con ↓).
  //      Valores: none | fade | slide | convex | concave | zoom
  // ═══════════════════════════════════════════════════════════════════════
  VerticalSlides([
    Slide("<h2>Transiciones</h2><p>Presioná ↓ para recorrerlas</p>"),
    Slide("<p>Transición: <strong>fade</strong></p>", { title: "fade", transition: "fade" }),
    Slide("<p>Transición: <strong>slide</strong></p>", { title: "slide", transition: "slide" }),
    Slide("<p>Transición: <strong>convex</strong></p>", { title: "convex", transition: "convex" }),
    Slide("<p>Transición: <strong>concave</strong></p>", { title: "concave", transition: "concave" }),
    Slide("<p>Transición: <strong>zoom</strong></p>", { title: "zoom", transition: "zoom" }),
  ]),

  // ═══════════════════════════════════════════════════════════════════════
  //  11. HIJOS ANIDADOS — Slide acepta arreglos anidados de HTML/componentes
  // ═══════════════════════════════════════════════════════════════════════
  Slide(
    [
      "<p>Se pueden anidar arreglos de hijos:</p>",
      [
        formula("x_1 = \\dfrac{-b + \\sqrt{\\Delta}}{2a}", { size: "sm" }),
        formula("x_2 = \\dfrac{-b - \\sqrt{\\Delta}}{2a}", { size: "sm" }),
      ],
    ],
    { title: "Hijos anidados" }
  ),

  // ═══════════════════════════════════════════════════════════════════════
  //  12. SUB-DIAPOSITIVAS VERTICALES (VerticalSlides) — navegar con ↓
  // ═══════════════════════════════════════════════════════════════════════
  VerticalSlides([
    Slide("<h2>Grupo vertical</h2><p>Presioná ↓ para bajar</p>"),
    Slide(formula("v = v_0 + a t", { variant: "primary", size: "lg" }), {
      title: "Sub-slide 1",
    }),
    Slide(formula("x = x_0 + v_0 t + \\tfrac{1}{2} a t^2", { size: "md" }), {
      title: "Sub-slide 2",
    }),
  ]),
].join("");

createDeck({ slidesHtml });
