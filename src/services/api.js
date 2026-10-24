const API = 'https://dummyjson.com';
const encabezados = { 'Content-Type': 'application/json' };

async function solicitar(ruta, opciones = {}) {
  const respuesta = await fetch(API + ruta, opciones);
  if (!respuesta.ok) {
    throw new Error('La API no pudo completar la solicitud. Inténtalo de nuevo.');
  }
  return respuesta.json();
}

export function iniciarSesion(username, password) {
  return solicitar('/auth/login', {
    method: 'POST',
    headers: encabezados,
    body: JSON.stringify({ username, password, expiresInMins: 30 })
  });
}