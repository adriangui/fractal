// steps.es.bull.js (alcista) — según tu versión más reciente + paso 10 de validación
export const STEPS_ES_BULL = [

 { text: 'Primero veamos como se ve este fractal alcista resuelto' },

  { text: 'Encontrar un posible docking y rocking. Buscar una forma de "V" en donde el segundo movimiento llegue o supere el máximo del primer movimiento, y marcar docking y rocking "potenciales"' },
  
 
  { text: 'Partiendo desde el docking, y yendo para atrás, ir leyendo los movimientos del máximo de cada vela, contando los que bajan, hasta que SUBA, y en la última vela que bajó, marcar un pivote temporalmente. ' },
  
  // { text: 'Partiendo desde el docking, y yendo para atrás, ir leyendo los movimientos del máximo de cada vela, de esta manera: El primero seguramente "baja". Ir a la siguiente, hasta que "suba". En la imagen de ejemplo hace: "baja", "baja", "baja","baja", "baja", "baja","SUBE" (baja 6 veces, y sube). Cuando sube, en el último que bajó, está el vórtice. Marcar el vórtice en el mínimo de esa vela.' },
  

  
  // { text: 'Ahora, para detectar el primer máximo, hay que partir de la vela de vórtice, e ir leyendo los máximos que "suben", hasta que "baje". En el ejemplo tenemos que: "Sube, sube, baja". El máximo del último "sube", es el primer máximo.' },
  

  { text: 'Marcar el "primer máximo" en el alto de la última vela que subió'},  
  
  { text: 'Para ver el origen del movimiento, alargar la línea del primer máximo hacia atras hasta que se choque con una vela. Luego localizar el mínimo más bajo entre el primer máximo y esa vela' },
  
    //////////////////////////// 
  
  
 
  { text: 'Al trazar los puntos, queda resuelto' }
];
