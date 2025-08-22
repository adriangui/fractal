// rangos.js — Ejemplo "Rangos operativos" reutilizando el wizard
import { renderWizard } from "./wizard.js";

// Datos de ejemplo (ajústalos a tu método)
const RANGOS_STEPS = [
  { text: "Paso 1" },
  { text: "Paso 2" },
  { text: "Paso 3." },
  { text: "Paso 4" },
  { text: "Paso 5" }
];

const RANGOS_IMAGES = {
  1: ["rangos 1.png"],
  2: ["rangos 2.png"],
  3: ["rangos 3.png", "rangos 3 b.png"],
  4: ["rangos 4.png"],
  5: ["rangos 5.png"]
};

const RANGOS_CAPTIONS = {
  1: ["Ejemplo de rango identificado"],
  2: ["Límites marcados"],
  3: ["Validación de toques", "Variante de validación"],
  4: ["Chequeo de liquidez/volumen"],
  5: ["Escenario de ruptura"]
};

export async function render(host) {
  const getSteps    = () => RANGOS_STEPS;
  const getImages   = () => RANGOS_IMAGES;
  const getCaptions = () => RANGOS_CAPTIONS;

  renderWizard(host, {
    getSteps, getImages, getCaptions,
    title: "Rangos operativos"
  });
}
