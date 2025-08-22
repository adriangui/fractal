// _wizard.js — Wizard genérico para cualquier vista (ES-only)
const IMAGE_BASE = "./"; // raíz del proyecto para imágenes

export function renderWizard(host, {
  getSteps,         // () => array [{text}]
  getImages,        // () => { [stepNumber]: string[] }
  getCaptions,      // () => { [stepNumber]: string[] }
  title,            // string opcional
  listenReset = true
}) {
  let mode = "wizard";  // "wizard" | "list"
  let index = 0;
  let completed = new Set();

  function captionFor(step, imgIndex) {
    const capsMap = getCaptions() || {};
    const list = capsMap[step] || [];
    const val = list[imgIndex];
    return (val && String(val).trim() !== "") ? val : `Paso ${step} — imagen ${imgIndex + 1}`;
  }

  function updateProgressUI(root) {
    const steps = getSteps();
    const done = completed.size;
    const total = steps.length || 1;
    const pct = Math.round((done * 100) / total);
    root.querySelector("#progressBar").style.width = pct + "%";
    root.querySelector("#progressText").textContent = pct + "%";
    return { done, total, pct, complete: done >= total };
  }

  function renderBody(root) {
    const steps = getSteps();
    const imgsMap = getImages();
    const isList = mode === "list";

    const body = root.querySelector("#routeBody");
    const hint = root.querySelector("#hintText");
    const nav = root.querySelector(".nav .nav-btns");

    const prog = updateProgressUI(root);

    if (prog.complete) {
      hint.textContent = "¡Completado!";
      nav.innerHTML = `<button id="restartInlineBtn" class="btn ok">Reiniciar</button>`;
      nav.querySelector("#restartInlineBtn").onclick = () => {
        index = 0; completed = new Set(); renderBody(root);
      };
    } else {
      hint.innerHTML = 'Atajos: <span class="kbd">Enter</span> = Listo, <span class="kbd">Backspace</span> = Atrás';
      nav.innerHTML = `
        <button id="prevBtn" class="btn">Atrás</button>
        <button id="doneBtn" class="btn ok">Listo</button>
        <button id="skipBtn" class="btn">Saltar</button>
      `;
      nav.querySelector("#prevBtn").onclick = () => { if (index > 0) { index--; renderBody(root); } };
      nav.querySelector("#doneBtn").onclick = () => { completed.add(index); if (index < steps.length - 1) index++; renderBody(root); };
      nav.querySelector("#skipBtn").onclick = () => { if (index < steps.length - 1) index++; renderBody(root); };
    }

    if (isList) {
      let html = "";
      steps.forEach((s, idx) => {
        const done = completed.has(idx);
        const imgs = (imgsMap[idx + 1] || []);
        const figs = imgs.map((f, imgIdx) => `
          <figure class="figure">
            <img src="${IMAGE_BASE + f}" alt="${captionFor(idx + 1, imgIdx)}">
            <figcaption>${captionFor(idx + 1, imgIdx)}</figcaption>
          </figure>
        `).join("");
        html += `
          <div class="card" style="margin-bottom:10px;">
            <div class="step-head">
              <span class="step-index">${idx + 1}</span>
              <h3 class="step-title">${done ? "✅ " : ""}${s.text}</h3>
            </div>
            ${figs}
            <div style="margin-left:38px;margin-top:8px;">
              <label style="font-size:13px;color:#cbd6e6;">
                <input type="checkbox" data-idx="${idx}" ${done ? "checked" : ""} /> Marcar como completado
              </label>
            </div>
          </div>
        `;
      });
      body.innerHTML = html;
      body.querySelectorAll('input[type="checkbox"][data-idx]').forEach(cb => {
        cb.onchange = (e) => {
          const idx = Number(e.target.getAttribute("data-idx"));
          if (e.target.checked) completed.add(idx); else completed.delete(idx);
          const p = updateProgressUI(root); if (p.complete) renderBody(root);
        };
      });
    } else {
      const s = steps[index] || { text: "(sin pasos)" };
      const done = completed.has(index);
      const imgs = (imgsMap[index + 1] || []);
      const figs = imgs.map((f, imgIdx) => `
        <figure class="figure">
          <img src="${IMAGE_BASE + f}" alt="${captionFor(index + 1, imgIdx)}">
          <figcaption>${captionFor(index + 1, imgIdx)}</figcaption>
        </figure>
      `).join("");
      body.innerHTML = `
        <div class="card">
          <div class="step-head">
            <span class="step-index">${index + 1}</span>
            <h3 class="step-title">${done ? "✅ " : ""}${s.text}</h3>
          </div>
          ${figs}
        </div>
      `;
    }

    if (!prog.complete) {
      const prev = nav.querySelector("#prevBtn");
      const doneBtn = nav.querySelector("#doneBtn");
      const skip = nav.querySelector("#skipBtn");
      if (prev) prev.style.display = isList ? "none" : "inline-block";
      if (doneBtn) doneBtn.style.display = isList ? "none" : "inline-block";
      if (skip) skip.style.display = isList ? "none" : "inline-block";
    }
  }

  host.innerHTML = `
    <section class="card">
      ${title ? `<h2 style="margin-top:0;">${title}</h2>` : ""}
      <div class="progress-wrap">
        <div class="progress"><span id="progressBar"></span></div>
        <div class="progress-label"><span id="progressText">0%</span></div>
      </div>

      <div id="routeBody"></div>

      <nav class="nav">
        <div class="hint" id="hintText"></div>
        <div class="nav-btns"></div>
      </nav>

      <div style="display:flex;gap:8px;margin-top:10px;">
        <button id="toggleModeBtn" class="btn">Modo lista</button>
      </div>
    </section>
  `;

  const toggle = host.querySelector("#toggleModeBtn");
  toggle.onclick = () => {
    mode = (mode === "wizard") ? "list" : "wizard";
    toggle.textContent = (mode === "list") ? "Modo wizard" : "Modo lista";
    renderBody(host);
  };
  toggle.textContent = (mode === "list") ? "Modo wizard" : "Modo lista";

  function onKey(e) {
    if (mode !== "wizard") return;
    const steps = getSteps();
    if (e.key === "Enter") { completed.add(index); if (index < steps.length - 1) index++; renderBody(host); }
    if (e.key === "Backspace") { e.preventDefault(); if (index > 0) { index--; renderBody(host); } }
  }
  window.addEventListener("keydown", onKey);

  function onReset() { index = 0; completed = new Set(); renderBody(host); }
  if (listenReset) window.addEventListener("app:reset", onReset);

  renderBody(host);
}
