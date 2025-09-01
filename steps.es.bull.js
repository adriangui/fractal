/// steps.es.bull.js
export const STEPS_ES_BULL = [
  { text: 'Mira el video de explicación del algoritmo <a href="https://youtu.be/IHsGLuw6XHI" target="_blank">aquí</a>.' }, //1
  { text: 'Buscar una forma de "V" en donde el segundo movimiento llegue o supere el máximo del primer movimiento. Marcar docking y rocking "potenciales", validando que haya al menos 5 velas entre el docking y el rocking' }, //2
  { text: 'Partiendo desde el docking, y yendo para atrás, ir leyendo los movimientos del máximo de cada vela, contando los que bajen, hasta que SUBA, para marcar un pivote temporal' }, //3
   { text: 'En la última vela que bajó, marcar un pivote temporal' }, //4
  { text: 'Desde el pivote, yendo para atrás, contamos las velas que suban en sus máximos, hasta que una BAJE, para buscar el primer máximo' }, //5
  { text: 'Marcar el "primer máximo" en el alto de la última vela que subió. Atención: Es válido solo si es más bajo que el docking' }, //6
  { text: 'Trazamos una línea desde el primer máximo hasta la primer vela posterior que lo rompa de abajo hacia arriba, para buscar el vórtice.' }, //7
  { text: 'Marcamos el vórtice en el mínimo más bajo de las velas que estén entre estos 2 puntos. Muchas veces el pivote temporal se convierte en el vórtice.' }, //8
  { text: 'Localizar origen del impulso y validar que sea más bajo que el vórtice y el rocking.' }, //9
  { text: 'Al trazar los puntos, queda resuelto' } //10
];

