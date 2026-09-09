// Script interactivo para crear una presentación nueva a partir de la plantilla.
//
// Uso:
//   pnpm new-ppt
//
// Qué hace:
//   1. Pide: materia (carpeta), tema (carpeta), título, área y descripción.
//   2. Copia presentations/_template → presentations/<materia>-<tema>.
//   3. Ajusta el `base` de vite.config.ts, el <title> y el `name` del package.json.
//   4. Agrega la entrada correspondiente en presentations.json.
//   5. Te muestra el comando para levantarla en local.
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import {
  cpSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = dirname(scriptDir);
const templateDir = join(root, "presentations", "_template");

// Modo no interactivo: pnpm new-ppt <materia> <tema> <título> <área> <descripción>
// Si se pasan los 5 argumentos, no se pregunta nada (útil para scripts/CI).
const args = process.argv.slice(2);
const nonInteractive = args.length >= 5;

const rl = nonInteractive
  ? null
  : createInterface({ input: stdin, output: stdout });

// Convierte texto libre en un slug apto para carpetas/URLs.
function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ask(question, { required = true, default: def } = {}) {
  const suffix = def ? ` (${def})` : "";
  while (true) {
    const answer = (await rl.question(`${question}${suffix}: `)).trim();
    if (answer) return answer;
    if (def !== undefined) return def;
    if (!required) return "";
    console.log("  ⚠ Este campo es obligatorio.");
  }
}

try {
  console.log("\n📊 Nueva presentación\n");

  let subjectFolderRaw, topicFolderRaw, title, subject, description;

  if (nonInteractive) {
    [subjectFolderRaw, topicFolderRaw, title, subject, description] = args;
  } else {
    subjectFolderRaw = await ask("Materia (carpeta, p. ej. math)");
    topicFolderRaw = await ask("Tema (carpeta, p. ej. factorization)");
    title = await ask("Título (p. ej. Factorización de polinomios)");
    subject = await ask("Área a mostrar en el portal", {
      default: subjectFolderRaw,
    });
    description = await ask("Descripción breve");
  }

  const subjectFolder = slugify(subjectFolderRaw);
  const topicFolder = slugify(topicFolderRaw);

  const id = `${subjectFolder}-${topicFolder}`;
  const dirName = id; // carpeta dentro de presentations/
  const path = `${subjectFolder}/${topicFolder}/`; // ruta pública (URL)
  const targetDir = join(root, "presentations", dirName);
  const pkgName = `@ppts/${id}`;

  // --- Validaciones ---
  if (!existsSync(templateDir)) {
    throw new Error(`No se encontró la plantilla en ${templateDir}`);
  }
  if (existsSync(targetDir)) {
    throw new Error(`Ya existe una presentación en presentations/${dirName}`);
  }

  const catalogPath = join(root, "presentations.json");
  const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
  if (catalog.presentations.some((p) => p.id === id || p.path === path)) {
    throw new Error(`Ya hay una entrada con id "${id}" o path "${path}" en presentations.json`);
  }

  // --- 1) Copiar plantilla ---
  cpSync(templateDir, targetDir, { recursive: true });

  // --- 2) Ajustar vite.config.ts (el `base`) ---
  const vitePath = join(targetDir, "vite.config.ts");
  let vite = readFileSync(vitePath, "utf8");
  vite = vite
    // Elimina el bloque TODO de la plantilla.
    .replace(
      /\/\/ TODO: reemplazá[\s\S]*?campo "path" que agregues en presentations\.json\.\n/,
      ""
    )
    .replace("`${SITE_BASE}materia/tema/`", "`${SITE_BASE}" + path + "`");
  writeFileSync(vitePath, vite);

  // --- 3) Ajustar index.html (título) ---
  const htmlPath = join(targetDir, "index.html");
  let html = readFileSync(htmlPath, "utf8");
  html = html
    .replace("    <!-- TODO: cambiar el título por el de tu presentación -->\n", "")
    .replace("<title>Nueva presentación</title>", `<title>${title}</title>`);
  writeFileSync(htmlPath, html);

  // --- 4) Ajustar package.json (name) ---
  const pkgPath = join(targetDir, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  pkg.name = pkgName;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

  // --- 5) Agregar al catálogo ---
  catalog.presentations.push({ id, title, subject, description, path });
  writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + "\n");

  console.log("\n✓ Presentación creada:\n");
  console.log(`  Carpeta:  presentations/${dirName}`);
  console.log(`  Paquete:  ${pkgName}`);
  console.log(`  URL:      /tutor-classes/${path}`);
  console.log(`  Catálogo: entrada agregada a presentations.json`);
  console.log("\nPasos siguientes:\n");
  console.log("  1. Instalá el nuevo paquete en el workspace:");
  console.log("       pnpm install");
  console.log("  2. Desarrollala en local (hot-reload):");
  console.log(`       pnpm --filter ${pkgName} dev`);
  console.log("  3. Editá los slides en:");
  console.log(`       presentations/${dirName}/src/main.ts`);
  console.log("  4. Cuando esté lista: git add . && git commit && git push\n");
} catch (err) {
  console.error(`\n✗ ${err.message}\n`);
  process.exitCode = 1;
} finally {
  rl?.close();
}
