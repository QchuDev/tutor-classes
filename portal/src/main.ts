// Portal: lista todas las presentaciones a partir del catálogo (presentations.json).
import "./style.css";
import catalog from "@catalog";

interface PresentationEntry {
  id: string;
  title: string;
  subject: string;
  description: string;
  path: string;
}

interface Catalog {
  presentations: PresentationEntry[];
}

// Base del sitio (coincide con vite `base`). En dev es "/", en build "/<repo>/".
const BASE = import.meta.env.BASE_URL;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function card(p: PresentationEntry): string {
  // Los assets de cada presentación se sirven bajo BASE + su path relativo.
  const href = `${BASE}${p.path}`;
  return `
    <a class="card" href="${href}">
      <span class="card-subject">${escapeHtml(p.subject)}</span>
      <h2 class="card-title">${escapeHtml(p.title)}</h2>
      <p class="card-desc">${escapeHtml(p.description)}</p>
      <span class="card-cta">Ver presentación →</span>
    </a>`;
}

const { presentations } = catalog as Catalog;

const grid = document.querySelector("#grid");
if (grid) {
  grid.innerHTML = presentations.length
    ? presentations.map(card).join("\n")
    : `<p class="empty">Todavía no hay presentaciones publicadas.</p>`;
}
