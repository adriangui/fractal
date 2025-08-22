// steps.es.bull.js (alcista) — según tu versión más reciente + paso 10 de validación
export const STEPS_ES_BULL = [
  { text: 'Detectar movimiento de "sube, y baja" de los máximos individuales de 3 velas, y marcar el “primer máximo”.' },
  { text: 'Detectar si posteriormente hay una vela que rompa al primer máximo de abajo hacia arriba (la misma dirección del movimiento).' },
  { text: 'Marcar el vórtice en el mínimo de la vela que tenga el mínimo más bajo entre la vela del “primer máximo” y la que rompe ese máximo.' },
  { text: 'Validar que el máximo de la mecha alta del vórtice sea menor a las velas de los 2 extremos.' },
  { text: 'Validar que se forma la “N”, donde el segundo impulso supera el máximo del primer impulso.' },
  { text: 'Encontrar si hay un retroceso posterior que rompa el vórtice.' },
  { text: 'Para que se confirme tiene que haber un impulso que rompa a ese posible docking.' },
  { text: 'También hay que validar que el origen de ese impulso no esté por debajo del origen del primer impulso.' },
  { text: 'Se confirma el rocking porque rompe al docking, y queda conformado el fractal.' },
  { text: 'Validar que entre el docking y el rocking haya por lo menos 5 velas.' }
];
