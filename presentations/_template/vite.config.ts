import { defineConfig } from "vite";

// El sitio se sirve bajo /<repo>/ en GitHub Pages y cada presentación
// vive en su propia subruta. SITE_BASE lo inyecta el workflow (default "/tutor-classes/").
const SITE_BASE = process.env.SITE_BASE ?? "/tutor-classes/";

// TODO: reemplazá "materia/tema/" por la ruta pública de esta presentación,
// p. ej. "math/factorization/". Debe terminar en "/" y coincidir con el
// campo "path" que agregues en presentations.json.
export default defineConfig({
  base: `${SITE_BASE}materia/tema/`,
});
