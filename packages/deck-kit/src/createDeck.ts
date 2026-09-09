// Helper de inicialización del deck.
// Encapsula el boilerplate de reveal.js + plugin de matemáticas (KaTeX),
// para que cada presentación solo tenga que aportar su contenido.
import Reveal from "reveal.js";
import RevealMath from "reveal.js/plugin/math";

// Estilos base de reveal.js (rutas de la v6).
import "reveal.js/reveal.css";
import "reveal.js/theme/black.css";

// Estilos de los componentes del kit.
import "./component/math/formula.css";

export interface CreateDeckOptions {
  /** HTML de los slides ya compuesto (p. ej. con Slide()/VerticalSlides()). */
  slidesHtml: string;
  /** Selector del contenedor de slides. Por defecto ".slides". */
  target?: string;
  /** Opciones adicionales de reveal.js (se combinan con las por defecto). */
  reveal?: Record<string, unknown>;
}

/**
 * Inyecta los slides y arranca reveal.js con el plugin de matemáticas.
 *
 * @example
 * import { createDeck, Slide, formula } from "@ppts/deck-kit";
 * createDeck({ slidesHtml: [Slide('<h1>Hola</h1>')].join("") });
 */
export function createDeck(options: CreateDeckOptions) {
  const { slidesHtml, target = ".slides", reveal = {} } = options;

  const container = document.querySelector(target);
  if (!container) {
    throw new Error(`createDeck: no se encontró el contenedor "${target}"`);
  }
  container.innerHTML = slidesHtml;

  const deck = new Reveal({
    hash: true,
    slideNumber: true,
    plugins: [RevealMath.KaTeX],
    ...reveal,
  });
  deck.initialize();
  return deck;
}
