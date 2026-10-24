// Todas las peticiones están aquí, no mezcladas con el diseño.
const API = 'https://dummyjson.com';

async function solicitar(ruta, opciones = {}, permitir404 = false) {
  const respuesta = await fetch(API + ruta, opciones);
  if (!respuesta.ok) {
    // DummyJSON no guarda los registros creados; si luego editamos
    // uno de esos registros, el servidor puede responder 404.
    if (permitir404 && respuesta.status === 404) return {};
    throw new Error('La API no pudo completar la solicitud. Inténtalo de nuevo.');
  }
  return respuesta.json();
}

const encabezados = { 'Content-Type': 'application/json' };

export function iniciarSesion(username, password) {
  return solicitar('/auth/login', {
    method: 'POST',
    headers: encabezados,
    body: JSON.stringify({ username, password, expiresInMins: 30 })
  });
}

export async function obtenerMiembros() {
  const datos = await solicitar('/users?limit=0');
  return datos.users;
}

export function agregarMiembro(datos) {
  return solicitar('/users/add', {
    method: 'POST',
    headers: encabezados,
    body: JSON.stringify(datos)
  });
}

export function actualizarMiembro(miembro, datos) {
  return solicitar('/users/' + miembro.id, {
    method: 'PATCH',
    headers: encabezados,
    body: JSON.stringify(datos)
  }, miembro.temporal === true);
}

export function borrarMiembro(miembro) {
  return solicitar('/users/' + miembro.id, { method: 'DELETE' }, miembro.temporal === true);
}
