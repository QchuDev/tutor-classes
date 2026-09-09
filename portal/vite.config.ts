import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

// El portal se sirve en la raíz del sitio: /<repo>/.
const SITE_BASE = process.env.SITE_BASE ?? "/tutor-classes/";

export default defineConfig({
  base: SITE_BASE,
  server: {
    fs: {
      // Permite que Vite lea el catálogo ubicado en la raíz del monorepo.
      allow: [fileURLToPath(new URL("..", import.meta.url))],
    },
  },
  resolve: {
    alias: {
      // Permite importar el catálogo que vive en la raíz del monorepo.
      "@catalog": fileURLToPath(new URL("../presentations.json", import.meta.url)),
    },
  },
});
