// Componente: Formula
// Función configurable que devuelve una fórmula formateada como HTML,
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
  /**
   * Trata la expresión como LaTeX (por defecto: true). Se envuelve en
   * delimitadores \( \) para que el plugin `math` de reveal.js la renderice,
   * y NO se escapa el HTML (el motor necesita las barras invertidas).
   * Pon `latex: false` para mostrar la expresión como texto plano escapado.
   */
  latex?: boolean;
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
 * Devuelve el HTML de una fórmula formateada según las opciones.
 *
 * @param expression - La expresión a mostrar, p. ej. "v = Δx / Δt".
 * @param options - Configuración opcional de estilo.
 * @returns Cadena HTML lista para insertar en un slide.
 *
 * @example
 * // Texto plano con estilo
 * formula("a = Δv / Δt", { title: "Aceleración", variant: "primary", size: "lg" })
 *
 * @example
 * // LaTeX (requiere el plugin math de reveal.js registrado)
 * formula("x = x_0 + v_0 t + \\tfrac{1}{2} a t^2", { latex: true, size: "lg" })
 */
export function formula(
  expression: string,
  options: FormulaOptions = {}
): string {
  const {
    title,
    variant = "default",
    size = "md",
    align = "center",
    latex = true,
  } = options;

  // En modo LaTeX no escapamos: el motor (KaTeX/MathJax) necesita las
  // barras invertidas. La expresión se envuelve en delimitadores \( \).
  // En modo texto plano sí escapamos para evitar inyección de HTML.
  const exprHtml = latex ? `\\(${expression}\\)` : escapeHtml(expression);

  const titleHtml = title
    ? `<span class="formula-title">${escapeHtml(title)}</span>`
    : "";

  return `
    <div class="formula-wrap formula-wrap--${align}">
      ${titleHtml}
      <span class="formula formula--${variant} formula--${size}">${exprHtml}</span>
    </div>`;
}
