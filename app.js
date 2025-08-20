// Sidebar menu + captions por imagen + alcista/bajista + ES/EN + wizard/list
document.title = "Checklist fractal";

/* ---------------------- Configurable Sidebar Links ---------------------- */
const MENU_LINKS = [
  { title: "Fractales", url: "https://adriangui.github.io/fractal/" },
  { title: "Fractales versión 2", url: "https://adriangui.github.io/fractal/enConstruccion.html" },
  { title: "Rangos operativos", url: "https://adriangui.github.io/fractal/enConstruccion.html" },
  // { title: "Otra sección", url: "./enConstruccion.html" },
];

/* ---------------------- Images & captions ------------------------------- */
const IMAGE_BASE = "./"; // imágenes en la raíz

// Imágenes por PASO (ALCISTA)
const STEP_IMAGE_MAP_BULL = {
  1: ["paso 1.png"],
  2: ["paso 2.png"],
  3: ["paso 3.png", "paso 3 b.png"],
  4: ["paso 4.png"],
  5: ["paso 5.png"],
  6: ["paso 6.png", "paso 6 b.png"],
  7: ["paso 7.png"],
  8: ["paso 8.png"],
  9: ["paso 9.png"]
};

// Imágenes BAJISTA = mismo nombre + " (bajista)" antes de la extensión
function withSuffixBeforeExt(name, suffix){
  const i = name.lastIndexOf(".");
  return i === -1 ? name + suffix : name.slice(0,i) + suffix + name.slice(i);
}
const STEP_IMAGE_MAP_BEAR = Object.fromEntries(
  Object.entries(STEP_IMAGE_MAP_BULL).map(([k, arr]) => [Number(k), arr.map(f => withSuffixBeforeExt(f, " (bajista)"))])
);

// CAPTIONS por PASO y por IMAGEN (arrays). Si hay menos captions que imágenes,
// se autocompleta con un caption por defecto.
const CAPTIONS = {
  es: {
    1: [""],
    2: [""],
    3: ["Validar que el retroceso no rompa el origen del primer impulso"],
    4: [""],
    5: [""],
    6: ["Posible docking, pero todavía no se confirma, ya que..."],
    7: [""],
    8: [""],
    9: [""]
  },
  en: {
    1: ["Step 1 illustration"],
    2: ["Step 2 illustration"],
    3: ["Step 3 illustration"],
    4: ["Step 4 illustration"],
    5: ["Step 5 illustration"],
    6: ["Step 6 illustration"],
    7: ["Step 7 illustration"],
    8: ["Step 8 illustration"],
    9: ["Step 9 illustration"]
  }
};

function captionFor(step, imgIndex, lang){
  const byLang = CAPTIONS[lang] || CAPTIONS.es;
  const list = byLang[step] || [];
  /*if (list[imgIndex]) return list[imgIndex];
  // fallback: autogenera según idioma
  return lang === "en" ? `Step ${step} — image ${imgIndex+1}` : `Paso ${step} — imagen ${imgIndex+1}`;*/
  return list[imgIndex];
}

/* ---------------------- Steps (ALCISTA/BULL) ---------------------------- */
const STEPS_ES_BULL = [
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

const STEPS_EN_BULL = [
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

/* ---------------------- Steps (BAJISTA/BEAR) ---------------------------- */
function invertBearishES(s){
  let t=s;
  t=t.replace(/abajo\s+hacia\s+arriba/gi,'__UPDIR__')
     .replace(/arriba\s+hacia\s+abajo/gi,'abajo hacia arriba');
  const swaps=[
    [/sube/gi,'__BAJA__'],[/baja/gi,'__SUBE__'],
    [/máximos/gi,'__MINIMOS_PL__'],[/mínimos/gi,'__MAXIMOS_PL__'],
    [/máximo/gi,'__MINIMO__'],[/mínimo/gi,'__MAXIMO__'],
    [/alta/gi,'__BAJA_WORD__'],[/arriba/gi,'__ABAJO__'],[/abajo/gi,'__ARRIBA__'],
  ];
  swaps.forEach(([re,ph])=>t=t.replace(re,ph));
  t=t.replace(/__UPDIR__/g,'arriba hacia abajo')
     .replace(/__BAJA__/g,'baja').replace(/__SUBE__/g,'sube')
     .replace(/__MINIMOS_PL__/g,'mínimos').replace(/__MAXIMOS_PL__/g,'máximos')
     .replace(/__MINIMO__/g,'mínimo').replace(/__MAXIMO__/g,'máximo')
     .replace(/__BAJA_WORD__/g,'baja').replace(/__ABAJO__/g,'abajo').replace(/__ARRIBA__/g,'arriba');
  t=t.replace(/primer\s+máximo/gi,'primer mínimo').replace(/primer\s+mínimo/gi,'primer máximo');
  t=t.replace(/máximo de la mecha alta/gi,'mínimo de la mecha baja');
  return t;
}
function invertBearishEN(s){
  let t=s;
  t=t.replace(/from below to above/gi,'__ABOVE__')
     .replace(/from above to below/gi,'from below to above');
  const swaps=[
    [/rise/gi,'__FALL__'],[/fall/gi,'__RISE__'],
    [/highs/gi,'__LOWS_PL__'],[/lows/gi,'__HIGHS_PL__'],
    [/high/gi,'__LOW__'],[/low/gi,'__HIGH__'],
    [/upper/gi,'__LOWER__'],[/lower/gi,'__UPPER__'],
    [/above/gi,'__BELOW__'],[/below/gi,'__ABOVE__'],
  ];
  swaps.forEach(([re,ph])=>t=t.replace(re,ph));
  t=t.replace(/__ABOVE__/g,'from above to below')
     .replace(/__FALL__/g,'fall').replace(/__RISE__/g,'rise')
     .replace(/__LOWS_PL__/g,'lows').replace(/__HIGHS_PL__/g,'highs')
     .replace(/__LOW__/g,'low').replace(/__HIGH__/g,'high')
     .replace(/__LOWER__/g,'lower').replace(/__UPPER__/g,'upper')
     .replace(/__BELOW__/g,'below').replace(/__ABOVE__/g,'above');
  t=t.replace(/first\s+high/gi,'first low').replace(/first\s+low/gi,'first high');
  return t;
}
const STEPS_ES_BEAR = STEPS_ES_BULL.map(o=>({text:invertBearishES(o.text)}));
const STEPS_EN_BEAR = STEPS_EN_BULL.map(o=>({text:invertBearishEN(o.text)}));

/* ---------------------- i18n -------------------------------------------- */
const I18N={
  es:{
    title:"Fractal Checklist Wizard",
    subtitle:"Checklist interactivo para recorrer tu algoritmo paso a paso.",
    toggleToList:"Modo lista", toggleToWizard:"Modo wizard",
    reset:"Reiniciar",
    hint:'Atajos: <span class="kbd">Enter</span> = Listo, <span class="kbd">Backspace</span> = Atrás',
    back:"Atrás", done:"Listo", skip:"Saltar",
    footer:"Progreso no persistido. Se reinicia al recargar.",
    trendLabel:"Tendencia", completed:"¡Completado!", restart:"Reiniciar",
    markCompleted:"Marcar como completado",
  },
  en:{
    title:"Fractal Checklist Wizard",
    subtitle:"Interactive checklist to walk through your algorithm step by step.",
    toggleToList:"List mode", toggleToWizard:"Wizard mode",
    reset:"Reset",
    hint:'Shortcuts: <span class="kbd">Enter</span> = Done, <span class="kbd">Backspace</span> = Back',
    back:"Back", done:"Done", skip:"Skip",
    footer:"Progress is not persisted. It resets on reload.",
    trendLabel:"Trend", completed:"Completed!", restart:"Restart",
    markCompleted:"Mark as completed",
  }
};

/* ---------------------- State ------------------------------------------- */
const state={mode:"wizard", index:0, completed:new Set(), lang:"es", trend:"alcista"};

/* ---------------------- Sidebar render ---------------------------------- */
function renderSidebar(){
  const ul=document.getElementById("sideMenu");
  if(!ul) return;
  ul.innerHTML = MENU_LINKS.map(l=>(
    `<li><a class="side-link" href="${l.url}" target="_blank" rel="noopener noreferrer">${l.title}</a></li>`
  )).join("");
  const y=document.getElementById("yearNow"); if(y) y.textContent = new Date().getFullYear();
}

/* ---------------------- Trend select ------------------------------------ */
function ensureTrendSelect(){
  let trend=document.getElementById("trendSelect");
  if(!trend){
    const toolbar=document.querySelector(".toolbar")||document.body;
    trend=document.createElement("select");
    trend.id="trendSelect"; trend.title="Tendencia / Trend";
    trend.innerHTML=`<option value="alcista">Alcista</option><option value="bajista">Bajista</option>`;
    const before=document.getElementById("toggleModeBtn");
    if(before && toolbar.contains(before)) toolbar.insertBefore(trend,before); else toolbar.appendChild(trend);
  }
  trend.value=state.trend;
  trend.onchange=(e)=>{ state.trend = e.target.value==="bajista"?"bajista":"alcista"; state.index=0; state.completed=new Set(); render(); };
}

/* ---------------------- Current getters --------------------------------- */
function currentSteps(){
  const bear=state.trend==="bajista";
  if(state.lang==="en") return bear?STEPS_EN_BEAR:STEPS_EN_BULL;
  return bear?STEPS_ES_BEAR:STEPS_ES_BULL;
}
function currentImageMap(){
  return state.trend==="bajista"?STEP_IMAGE_MAP_BEAR:STEP_IMAGE_MAP_BULL;
}

/* ---------------------- Helpers ----------------------------------------- */
function escapeHtml(str){
  return String(str).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}
function setText(id,html){const el=document.getElementById(id); if(el) el.innerHTML=html;}
function setBtn(id,text){const el=document.getElementById(id); if(el) el.textContent=text;}
function updateProgressUI(){
  const done=state.completed.size, total=currentSteps().length||1, pct=Math.round(done*100/total);
  document.getElementById("progressBar").style.width=pct+"%";
  document.getElementById("progressText").textContent=pct+"%";
  return {done,total,pct,complete:done>=total};
}

/* ---------------------- Render ------------------------------------------ */
function render(){
  renderSidebar();
  ensureTrendSelect();

  const steps=currentSteps();
  const isList=state.mode==="list";
  const i=I18N[state.lang];

  setText("appTitle", i.title);
  setText("appSubtitle", i.subtitle);
  setBtn("toggleModeBtn", isList? i.toggleToWizard : i.toggleToList);
  setBtn("resetBtn", i.reset);
  setText("hintText", i.hint);
  setText("footerNote", i.footer);

  const prog=updateProgressUI();
  const root=document.getElementById("stepView");
  const imgsMap=currentImageMap();

  const navBtns=document.querySelector(".nav .nav-btns");

  if(prog.complete){
    if(navBtns){
      navBtns.innerHTML=`<button id="restartInlineBtn" class="btn ok">${i.restart}</button>`;
      document.getElementById("restartInlineBtn").onclick=()=>{ state.index=0; state.completed=new Set(); render(); };
    }
    setText("hintText", i.completed);
  }else{
    if(navBtns){
      navBtns.innerHTML=`
        <button id="prevBtn" class="btn">${i.back}</button>
        <button id="doneBtn" class="btn ok">${i.done}</button>
        <button id="skipBtn" class="btn">${i.skip}</button>`;
      document.getElementById("prevBtn").onclick=()=>{ if(state.index>0){ state.index--; render(); } };
      document.getElementById("doneBtn").onclick=()=>{ state.completed.add(state.index); if(state.index<steps.length-1) state.index++; render(); };
      document.getElementById("skipBtn").onclick=()=>{ if(state.index<steps.length-1) state.index++; render(); };
    }
  }

  /* Cuerpo */
  if(isList){
    let html="";
    steps.forEach((s,idx)=>{
      const done=state.completed.has(idx);
      const imgs=imgsMap[idx+1]||[];
      const figs=imgs.map((filename,imgIndex)=>`
        <figure class="figure">
          <img src="${IMAGE_BASE+filename}" alt="${escapeHtml(captionFor(idx+1,imgIndex,state.lang))}">
          <figcaption>${escapeHtml(captionFor(idx+1,imgIndex,state.lang))}</figcaption>
        </figure>`).join("");
      html+=`
        <div class="card" style="margin-bottom:10px;">
          <div class="step-head">
            <span class="step-index">${idx+1}</span>
            <h3 class="step-title">${done?"✅ ":""}${escapeHtml(s.text)}</h3>
          </div>
          ${figs}
          <div style="margin-left:38px;margin-top:8px;">
            <label style="font-size:13px;color:#cbd6e6;">
              <input type="checkbox" data-idx="${idx}" ${done?"checked":""} /> ${i.markCompleted}
            </label>
          </div>
        </div>`;
    });
    root.innerHTML=html;
    root.querySelectorAll('input[type="checkbox"][data-idx]').forEach(cb=>{
      cb.onchange=(e)=>{
        const idx=Number(e.target.getAttribute("data-idx"));
        if(e.target.checked) state.completed.add(idx); else state.completed.delete(idx);
        const p=updateProgressUI(); if(p.complete) render();
      };
    });
  }else{
    const s=steps[state.index]||{text:"(sin pasos)"};
    const done=state.completed.has(state.index);
    const imgs=imgsMap[state.index+1]||[];
    const figs=imgs.map((filename,imgIndex)=>`
      <figure class="figure">
        <img src="${IMAGE_BASE+filename}" alt="${escapeHtml(captionFor(state.index+1,imgIndex,state.lang))}">
        <figcaption>${escapeHtml(captionFor(state.index+1,imgIndex,state.lang))}</figcaption>
      </figure>`).join("");
    root.innerHTML=`
      <div class="step-head">
        <span class="step-index">${state.index+1}</span>
        <h3 class="step-title">${done?"✅ ":""}${escapeHtml(s.text)}</h3>
      </div>
      ${figs}`;
  }

  if(!prog.complete){
    const prev=document.getElementById("prevBtn"),
          done=document.getElementById("doneBtn"),
          skip=document.getElementById("skipBtn");
    if(prev) prev.style.display = isList?"none":"inline-block";
    if(done) done.style.display = isList?"none":"inline-block";
    if(skip) skip.style.display = isList?"none":"inline-block";
  }
}

/* ---------------------- Events ------------------------------------------ */
document.getElementById("toggleModeBtn").onclick=()=>{ state.mode = state.mode==="wizard"?"list":"wizard"; render(); };
document.getElementById("resetBtn").onclick=()=>{ state.index=0; state.completed=new Set(); render(); };
document.getElementById("langSelect").onchange=(e)=>{ state.lang = e.target.value==="en"?"en":"es"; render(); };

window.addEventListener("keydown",(e)=>{
  if(state.mode!=="wizard") return;
  const p=updateProgressUI(); if(p.complete) return;
  if(e.key==="Enter") document.querySelector(".nav .nav-btns #doneBtn")?.click();
  if(e.key==="Backspace"){ e.preventDefault(); document.querySelector(".nav .nav-btns #prevBtn")?.click(); }
});

/* ---------------------- Init -------------------------------------------- */
render();
