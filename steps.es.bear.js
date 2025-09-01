// steps.es.bear.js (bajista)
export const STEPS_ES_BEAR = [
  { text: 'Primero veamos como se ve este fractal bajista resuelto' }, //1
  { text: 'Encontrar un posible docking y rocking. Buscar una forma de "/\" en donde el segundo movimiento llegue o supere el mínimo del primer movimiento, y marcar docking y rocking "potenciales"' }, //2
  { text: 'Partiendo desde el docking, y yendo para atrás, ir leyendo los movimientos del mínimo de cada vela, contando los que suben, hasta que BAJE, para marcar un pivote temporal' }, //3
   { text: 'En la última vela que subió, marcar un pivote temporal' }, //4
  { text: 'Desde el pivote, yendo para atrás, contamos las velas que bajen en sus mínimos, hasta que una SUBA, para buscar el primer mínimo' }, //5
  { text: 'Marcar el "primer mínimo" en el bajo de la última vela que bajó. Atención: Es válido solo si es más alto que el docking' }, //6
  { text: 'Trazamos una línea desde el primer mínimo hasta la primer vela posterior que lo rompa de arriba hacia abajo, para buscar el vórtice.' }, //7
  { text: 'Marcamos el vórtice en el máximo más alto de las velas que estén entre estos 2 puntos. Muchas veces el pivote temporal se convierte en el vórtice.' }, //8
  { text: 'Localizar origen del impulso y validar que sea más alto que el vórtice y el rocking.' }, //9
  { text: 'Al trazar los puntos, queda resuelto' } //10
];

