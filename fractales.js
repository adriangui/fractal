// fractales.js — Vista Fractales (ES-only)
import { state } from "./app.js";
import { renderWizard } from "./wizard.js";

// Datos (actualizados según tu última versión)
import { STEPS_ES_BULL }    from "./steps.es.bull.js";
import { STEPS_ES_BEAR }    from "./steps.es.bear.js";
import { STEP_IMAGES_BULL } from "./images.bull.js";
import { STEP_IMAGES_BEAR } from "./images.bear.js";
import { CAPTIONS_ES_BULL } from "./captions.es.bull.js";
import { CAPTIONS_ES_BEAR } from "./captions.es.bear.js";

export async function render(host) {
  const getSteps    = () => state.trend === "bajista" ? STEPS_ES_BEAR    : STEPS_ES_BULL;
  const getImages   = () => state.trend === "bajista" ? STEP_IMAGES_BEAR : STEP_IMAGES_BULL;
  const getCaptions = () => state.trend === "bajista" ? CAPTIONS_ES_BEAR : CAPTIONS_ES_BULL;

  renderWizard(host, {
    getSteps, getImages, getCaptions,
    title: "Fractales"
  });
}
