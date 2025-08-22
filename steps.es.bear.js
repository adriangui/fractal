// steps.es.bear.js (bajista) — vector propio equivalente
export const STEPS_ES_BEAR = [
  { text: 'Detectar movimiento de "baja, y sube" de los mínimos individuales de 3 velas, y marcar el “primer mínimo”.' },
  { text: 'Detectar si posteriormente hay una vela que rompa el primer mínimo de arriba hacia abajo (misma dirección del movimiento).' },
  { text: 'Marcar el vórtice en el máximo de la vela que tenga el máximo más alto entre la vela del “primer mínimo” y la que rompe ese mínimo.' },
  { text: 'Validar que el mínimo de la mecha baja del vórtice sea mayor (más alto) que las velas de los 2 extremos.' },
  { text: 'Validar la forma bajista (inversa), donde el segundo impulso marca un mínimo más bajo que el primer impulso.' },
  { text: 'Encontrar si hay un retroceso posterior que rompa el vórtice por arriba.' },
  { text: 'Para que se confirme tiene que haber un impulso bajista que rompa ese posible docking hacia abajo.' },
  { text: 'También hay que validar que el origen de ese impulso no esté por encima del origen del primer impulso.' },
  { text: 'Se confirma el rocking bajista porque rompe al docking, y queda conformado el fractal bajista.' },
  { text: 'Validar que entre el docking y el rocking haya por lo menos 5 velas.' }
];
