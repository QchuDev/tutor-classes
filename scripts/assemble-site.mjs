// Ensambla el sitio final en ./dist a partir de los builds individuales.
//
// Estructura resultante (sirve tal cual en GitHub Pages bajo /<repo>/):
//   dist/                         ← portal (índice)
//   dist/math/factorization/      ← presentación
//   dist/physics/kinematics/      ← presentación
//
// Cada presentación declara su ruta pública en presentations.json.
import { cpSync, rmSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Raíz del monorepo: la carpeta que contiene a scripts/.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = dirname(scriptDir);
const outDir = join(root, "dist");

// Mapeo: proyecto (carpeta) → ruta pública dentro del sitio.
const catalog = JSON.parse(
  await import("node:fs/promises").then((fs) =>
    fs.readFile(join(root, "presentations.json"), "utf8")
  )
);

const projects = catalog.presentations.map((p) => ({
  // id coincide con el nombre de carpeta en presentations/<id>
  from: join(root, "presentations", p.id, "dist"),
  to: join(outDir, p.path),
  label: p.path,
}));

// 1) Limpia el dist final.
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

// 2) Copia el portal a la raíz.
const portalDist = join(root, "portal", "dist");
if (!existsSync(portalDist)) {
  console.error("✗ Falta el build del portal. Corré 'pnpm build' primero.");
  process.exit(1);
}
cpSync(portalDist, outDir, { recursive: true });
console.log("✓ portal → /");

// 3) Copia cada presentación a su subruta.
for (const { from, to, label } of projects) {
  if (!existsSync(from)) {
    console.error(`✗ Falta el build de ${label} (${from}).`);
    process.exit(1);
  }
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
  console.log(`✓ ${label}`);
}

// 4) .nojekyll evita que GitHub Pages procese el sitio con Jekyll
//    (necesario para que sirva carpetas que empiezan con _ y assets).
await import("node:fs/promises").then((fs) =>
  fs.writeFile(join(outDir, ".nojekyll"), "")
);
console.log("✓ .nojekyll");

console.log(`\nSitio ensamblado en ${outDir}`);
