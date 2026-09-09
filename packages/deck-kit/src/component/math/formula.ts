// Componente: Formula
// Función configurable que devuelve una fórmula LaTeX formateada como HTML,
// lista para inyectar dentro de un <section> de reveal.js.
// Los estilos viven en ./formula.css (importado una vez desde main).

/** Variantes de color predefinidas en formula.css */
export type FormulaVariant = "default" | "primary" | "accent";

/** Tamaños predefinidos en formula.css */
export type FormulaSize = "sm" | "md" | "lg";

/** Alineación del bloque */
export type FormulaAlign = "left" | "center" | "right";

/** Opciones de configuración del componente */
export interface FormulaOptions {
  /** Título opcional que se muestra encima de la fórmula */
  title?: string;
  /** Variante de color (default | primary | accent) */
  variant?: FormulaVariant;
  /** Tamaño del texto (sm | md | lg) */
  size?: FormulaSize;
  /** Alineación del bloque (left | center | right) */
  align?: FormulaAlign;
}

/** Escapa caracteres HTML para evitar inyección al interpolar texto. */
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Devuelve el HTML de una fórmula LaTeX formateada según las opciones.
 *
 * La expresión SIEMPRE se interpreta como LaTeX: se envuelve en delimitadores
 * \( \) para que el plugin `math` de reveal.js (KaTeX) la renderice. Por eso
 * no se escapa el HTML de la expresión (el motor necesita las barras invertidas).
 *
 * @param expression - La expresión LaTeX, p. ej. "x = \\dfrac{-b}{2a}".
 * @param options - Configuración opcional de estilo.
 * @returns Cadena HTML lista para insertar en un slide.
 *
 * @example
 * formula("x = x_0 + v_0 t + \\tfrac{1}{2} a t^2", { size: "lg" })
 *
 * @example
 * formula("a^2 + b^2 = c^2", { title: "Pitágoras", variant: "primary" })
 */
export function formula(
  expression: string,
  options: FormulaOptions = {}
): string {
  const { title, variant = "default", size = "md", align = "center" } = options;

  // Siempre LaTeX: envolvemos en \( \) y NO escapamos (KaTeX necesita las
  // barras invertidas). El título sí se escapa porque es texto plano.
  const exprHtml = `\\(${expression}\\)`;

  const titleHtml = title
    ? `<span class="formula-title">${escapeHtml(title)}</span>`
    : "";

  return `
    <div class="formula-wrap formula-wrap--${align}">
      ${titleHtml}
      <span class="formula formula--${variant} formula--${size}">${exprHtml}</span>
    </div>`;
}
