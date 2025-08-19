// Fractal Wizard - app.js (bilingual, no persistence)
/* Data ------------------------------------------------------------------- */
//const IMAGE_BASE = "./images/"; // Change to "./" if your images are in the project root
const IMAGE_BASE = "./"; 
const STEP_IMAGE_MAP = {
  1: ["image9.png", "image13.png", "image2.png"],
  2: ["image1.png"],
  3: ["image4.png", "image5.png"],
  4: ["image10.png"],
  5: ["image11.png"],
  6: ["image7.png", "image3.png"],
  7: ["image8.png"],
  8: ["image12.png"],
  9: ["image6.png"]
};

// Spanish steps (from your doc)
const STEPS_ES = [
  { text: '1) Detectar movimiento de "sube, y baja" de los máximos individuales de 3 velas, y marcar el “primer máximo”.' },
  { text: '2) Detectar si posteriormente hay una vela que rompa al primer máximo de abajo hacia arriba (la misma dirección del movimiento).' },
  { text: '3) Marcar el vórtice en el mínimo de la vela que tenga el mínimo más bajo entre la vela del “primer máximo” y la que rompe ese máximo.' },
  { text: '4) Validar que el máximo de la mecha alta del vórtice sea menor a las velas de los 2 extremos.' },
  { text: '5) Validar que se forma la “N”, donde el segundo impulso supera el máximo del primer impulso.' },
  { text: '6) Encontrar si hay un retroceso posterior que rompa el vórtice.' },
  { text: '7) Para que se confirme tiene que haber un impulso que rompa a ese posible docking.' },
  { text: '8) También hay que validar que el origen de ese impulso no esté por debajo del origen del primer impulso.' },
  { text: '9) Se confirma el rocking porque rompe al docking, y queda conformado el fractal.' }
];

// English translation (best-effort)
const STEPS_EN = [
  { text: '1) Detect a “rise and fall” movement in the individual highs of 3 candles, and mark the “first high”.' },
  { text: '2) Check if later there is a candle that breaks the first high from below to above (same direction as the move).' },
  { text: '3) Mark the vortex at the low of the candle that has the lowest low between the “first high” candle and the candle that breaks that high.' },
  { text: '4) Validate that the upper wick high of the vortex is lower than the highs of the two edge candles.' },
  { text: '5) Validate that the “N” shape forms, where the second impulse exceeds the first impulse.' },
  { text: '6) Find if there is a later pullback that breaks the vortex.' },
  { text: '7) For confirmation there must be an impulse that breaks that potential docking.' },
  { text: '8) Also validate that the origin of that impulse is not below the origin of the first impulse.' },
  { text: '9) Rocking is confirmed because it breaks the docking, thus the fractal is formed.' }
];

/* i18n strings ------------------------------------------------------------ */
const I18N = {
  es: {
    title: "Fractal Checklist Wizard",
    subtitle: "Checklist interactivo para recorrer tu algoritmo paso a paso.",
    toggleToList: "Modo lista",
    toggleToWizard: "Modo wizard",
    reset: "Reiniciar",
    hint: 'Atajos: <span class="kbd">Enter</span> = Listo, <span class="kbd">Backspace</span> = Atrás',
    back: "Atrás",
    done: "Listo",
    skip: "Saltar",
    footer: "Progreso no persistido. Se reinicia al recargar."
  },
  en: {
    title: "Fractal Checklist Wizard",
    subtitle: "Interactive checklist to walk through your algorithm step by step.",
    toggleToList: "List mode",
    toggleToWizard: "Wizard mode",
    reset: "Reset",
    hint: 'Shortcuts: <span class="kbd">Enter</span> = Done, <span class="kbd">Backspace</span> = Back',
    back: "Back",
    done: "Done",
    skip: "Skip",
    footer: "Progress is not persisted. It resets on reload."
  }
};

/* State (in-memory only) -------------------------------------------------- */
const state = {
  mode: "wizard",     // 'wizard' | 'list'
  index: 0,
  completed: new Set(),
  lang: "es"
};

function currentSteps() {
  return state.lang === "en" ? STEPS_EN : STEPS_ES;
}

/* Helpers ----------------------------------------------------------------- */
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function setText(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; }
function setBtn(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function updateProgressUI() {
  const done = state.completed.size;
  const total = currentSteps().length || 1;
  const pct = Math.round((done * 100) / total);
  document.getElementById("progressBar").style.width = pct + "%";
  document.getElementById("progressText").textContent = pct + "%";
}

/* Render ------------------------------------------------------------------ */
function render() {
  const steps = currentSteps();
  const isList = state.mode === "list";

  // i18n in header/footer and buttons
  const i = I18N[state.lang];
  setText("appTitle", i.title);
  setText("appSubtitle", i.subtitle);
  setBtn("toggleModeBtn", isList ? i.toggleToWizard : i.toggleToList);
  setBtn("resetBtn", i.reset);
  setText("hintText", i.hint);
  setBtn("prevBtn", i.back);
  setBtn("doneBtn", i.done);
  setBtn("skipBtn", i.skip);
  setText("footerNote", i.footer);

  updateProgressUI();
  const root = document.getElementById("stepView");

  if (isList) {
    // Render all steps with checkboxes
    let html = "";
    steps.forEach((s, idx) => {
      const done = state.completed.has(idx);
      const imgs = STEP_IMAGE_MAP[idx + 1] || [];
      let figs = imgs.map((f) => `
        <figure class="figure">
          <img src="${IMAGE_BASE + f}" alt="Step ${idx + 1} illustration">
          <figcaption>Step ${idx + 1} illustration</figcaption>
        </figure>
      `).join("");
      html += `
        <div class="card" style="margin-bottom:10px;">
          <div class="step-head">
            <span class="step-index">${idx + 1}</span>
            <h3 class="step-title">${done ? "✅ " : ""}${escapeHtml(s.text)}</h3>
          </div>
          ${figs}
          <div style="margin-left:38px;margin-top:8px;">
            <label style="font-size:13px;color:#cbd6e6;">
              <input type="checkbox" data-idx="${idx}" ${done ? "checked" : ""} /> ${state.lang === "en" ? "Mark as completed" : "Marcar como completado"}
            </label>
          </div>
        </div>
      `;
    });
    root.innerHTML = html;
    root.querySelectorAll('input[type="checkbox"][data-idx]').forEach(cb => {
      cb.addEventListener("change", (e) => {
        const idx = Number(e.target.getAttribute("data-idx"));
        if (e.target.checked) state.completed.add(idx);
        else state.completed.delete(idx);
        updateProgressUI();
      });
    });
  } else {
    // Wizard mode: render current step
    const s = steps[state.index] || { text: "(sin pasos)" };
    const done = state.completed.has(state.index);
    const imgs = STEP_IMAGE_MAP[state.index + 1] || [];
    const figs = imgs.map((f) => `
      <figure class="figure">
        <img src="${IMAGE_BASE + f}" alt="Step ${state.index + 1} illustration">
        <figcaption>Step ${state.index + 1} illustration</figcaption>
      </figure>
    `).join("");
    root.innerHTML = `
      <div class="step-head">
        <span class="step-index">${state.index + 1}</span>
        <h3 class="step-title">${done ? "✅ " : ""}${escapeHtml(s.text)}</h3>
      </div>
      ${figs}
    `;
  }

  // Show/hide nav buttons based on mode
  document.getElementById("prevBtn").style.display = isList ? "none" : "inline-block";
  document.getElementById("doneBtn").style.display = isList ? "none" : "inline-block";
  document.getElementById("skipBtn").style.display = isList ? "none" : "inline-block";
}

/* Events ------------------------------------------------------------------ */
document.getElementById("toggleModeBtn").addEventListener("click", () => {
  state.mode = state.mode === "wizard" ? "list" : "wizard";
  render();
});
document.getElementById("resetBtn").addEventListener("click", () => {
  state.index = 0;
  state.completed = new Set();
  render();
});
document.getElementById("prevBtn").addEventListener("click", () => {
  if (state.index > 0) {
    state.index--;
    render();
  }
});
document.getElementById("doneBtn").addEventListener("click", () => {
  state.completed.add(state.index);
  if (state.index < currentSteps().length - 1) state.index++;
  render();
});
document.getElementById("skipBtn").addEventListener("click", () => {
  if (state.index < currentSteps().length - 1) state.index++;
  render();
});
document.getElementById("langSelect").addEventListener("change", (e) => {
  state.lang = e.target.value === "en" ? "en" : "es";
  render();
});

// Keyboard shortcuts
window.addEventListener("keydown", (e) => {
  if (state.mode !== "wizard") return;
  if (e.key === "Enter") document.getElementById("doneBtn").click();
  if (e.key === "Backspace") { e.preventDefault(); document.getElementById("prevBtn").click(); }
});

// Initialize
render();
