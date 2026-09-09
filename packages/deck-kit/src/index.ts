// API pública de @ppts/deck-kit.
// Componentes reutilizables + helper de inicialización para construir
// presentaciones con reveal.js de forma declarativa.

export { Slide, VerticalSlides } from "./component/general/slide";
export type {
  SlideChild,
  SlideOptions,
  SlideTransition,
} from "./component/general/slide";

export { formula } from "./component/math/formula";
export type {
  FormulaOptions,
  FormulaVariant,
  FormulaSize,
  FormulaAlign,
} from "./component/math/formula";

export { createDeck } from "./createDeck";
export type { CreateDeckOptions } from "./createDeck";
