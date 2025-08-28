// app.js — Shell + Router SPA (solo ES) con directorios opcionales
document.title = "Checklist fractal";

/* ========= Config de rutas/carpetas opcionales =========
   Deja vacío ("") para tener todos los archivos en la raíz.
   Si creas carpetas, por ejemplo "routes/" y "data/", cambialas aquí.
*/
const ROUTES_DIR = ""; // p.ej. "routes/"
const DATA_DIR   = ""; // p.ej. "data/"

/* ========= Estado global ========= */
export const state = {
  trend: "alcista" // 'alcista' | 'bajista'
};

/* ========= Util: BASE_URL absoluta (soporta GitHub Pages) ========= */
function computeBaseUrl() {
  // URL del directorio actual (soporta /<repo>/ y subcarpetas)
  const u = new URL(".", window.location.href);
  return u.href; // termina con "/"
}
const BASE_URL = computeBaseUrl();

/* Hacer paths visibles a las vistas (para imports dinámicos internos si hiciera falta) */
window.PATHS = { BASE_URL, ROUTES_DIR, DATA_DIR };

/* ========= Menú (hash routing interno) ========= */
const MENU = [
  { title: "Fractales", hash: "#/fractales" },
  { title: "Fractales versión 2", hash: "#/en-construccion" },
  { title: "Rangos operativos", hash: "#/rangos" }
];

function renderSidebar() {
  const ul = document.getElementById("sideMenu");
  if (!ul) return;
  ul.innerHTML = MENU.map(m => `<li><a class="side-link" href="${m.hash}">${m.title}</a></li>`).join("");
  const y = document.getElementById("yearNow"); if (y) y.textContent = new Date().getFullYear();
}

/* ========= Header ========= */
function wireHeader() {
  const trendSel = document.getElementById("trendSelect");
  trendSel.value = state.trend;
  trendSel.addEventListener("change", e => {
    state.trend = e.target.value === "bajista" ? "bajista" : "alcista";
    route(); // re-render de la vista actual
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("app:reset"));
  });
}

/* ========= Router por hash ========= */
const routes = {
  "/fractales": () => import(/* @vite-ignore */ `${BASE_URL}${ROUTES_DIR}fractales.js`),
  "/checklistfractales": () => import(/* @vite-ignore */ `${BASE_URL}${ROUTES_DIR}checlist-fractales.js`),  
  "/rangos": () => import(/* @vite-ignore */ `${BASE_URL}${ROUTES_DIR}en-construccion.js`),
  "/en-construccion": () => import(/* @vite-ignore */ `${BASE_URL}${ROUTES_DIR}en-construccion.js`),
};

function parseHash() {
  const h = location.hash || "#/fractales";
  const path = h.replace(/^#/, "");
  return path || "/fractales";
}

async function route() {
  const host = document.getElementById("app");
  if (!host) return;
  host.innerHTML = "";
  const path = parseHash();
  const modLoader = routes[path] || routes["/fractales"];
  const mod = await modLoader();
  await mod.render(host, { state, BASE_URL, ROUTES_DIR, DATA_DIR });
}

/* ========= Init ========= */
renderSidebar();
wireHeader();
window.addEventListener("hashchange", route);
window.addEventListener("load", route);
route();
