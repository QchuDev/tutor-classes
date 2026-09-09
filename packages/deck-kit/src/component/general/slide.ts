// Componente general: Slide
// Envuelve contenido en un <section> de reveal.js y permite componer
// múltiples componentes/anidados de forma cómoda.
//
// Modelo de composición: todos los componentes devuelven strings de HTML.
// Slide acepta hijos como string, arreglo de strings, o arreglos anidados,
// para que puedas escribir:
//
//   Slide([
//     '<h2>Título</h2>',
//     formula('v = \\dfrac{\\Delta x}{\\Delta t}'),
//     [subComponenteA(), subComponenteB()],
//   ])

/** Un hijo puede ser HTML (string) o un arreglo (posiblemente anidado) de hijos. */
export type SlideChild = string | SlideChild[];

/** Transiciones soportadas por reveal.js */
export type SlideTransition =
  | "none"
  | "fade"
  | "slide"
  | "convex"
  | "concave"
  | "zoom";

/** Opciones de configuración de un Slide */
export interface SlideOptions {
  /** Título opcional; se renderiza como <h2> antes del contenido. */
  title?: string;
  /** Color de fondo del slide (data-background-color). */
  background?: string;
  /** Imagen de fondo (data-background-image). */
  backgroundImage?: string;
  /** Transición de entrada/salida (data-transition). */
  transition?: SlideTransition;
  /** Notas del presentador (se muestran con la tecla "S"). */
  notes?: string;
  /** id del <section>, útil para enlaces internos / hash. */
  id?: string;
  /** Clases CSS extra para el <section>. */
  className?: string;
}

/** Aplana hijos anidados y los une en un solo string de HTML. */
function renderChildren(children: SlideChild): string {
  if (Array.isArray(children)) {
    return children.map(renderChildren).join("\n");
  }
  return children;
}

/** Construye los atributos data-* del <section> según las opciones. */
function buildAttributes(options: SlideOptions): string {
  const attrs: string[] = [];
  if (options.id) attrs.push(`id="${options.id}"`);
  if (options.className) attrs.push(`class="${options.className}"`);
  if (options.background)
    attrs.push(`data-background-color="${options.background}"`);
  if (options.backgroundImage)
    attrs.push(`data-background-image="${options.backgroundImage}"`);
  if (options.transition)
    attrs.push(`data-transition="${options.transition}"`);
  return attrs.length ? " " + attrs.join(" ") : "";
}

/**
 * Crea un slide (<section>) componiendo uno o varios hijos.
 *
 * @param children - HTML/componentes anidados. Puede ser string o arreglo anidado.
 * @param options - Configuración del slide (título, fondo, transición, notas...).
 * @returns Cadena HTML de un <section> lista para inyectar en `.slides`.
 *
 * @example
 * Slide([
 *   formula('a = \\dfrac{\\Delta v}{\\Delta t}', { title: 'Aceleración' }),
 * ], { background: '#1a1a2e', transition: 'zoom', notes: 'Explicar Δ' })
 */
export function Slide(
  children: SlideChild,
  options: SlideOptions = {}
): string {
  const attrs = buildAttributes(options);
  const titleHtml = options.title ? `<h2>${options.title}</h2>` : "";
  const body = renderChildren(children);
  const notesHtml = options.notes
    ? `<aside class="notes">${options.notes}</aside>`
    : "";

  return `<section${attrs}>
    ${titleHtml}
    ${body}
    ${notesHtml}
  </section>`;
}

/**
 * Crea un slide con sub-diapositivas verticales (navegables con ↑/↓).
 * Cada elemento del arreglo es un Slide horizontal-hijo.
 *
 * @param slides - Arreglo de strings de <section> (normalmente creados con Slide()).
 * @returns Un <section> contenedor con los sub-<section> anidados.
 *
 * @example
 * VerticalSlides([
 *   Slide('<h2>Intro</h2>'),
 *   Slide(formula('v = v_0 + a t')),
 * ])
 */
export function VerticalSlides(slides: string[]): string {
  return `<section>
    ${slides.join("\n")}
  </section>`;
}
