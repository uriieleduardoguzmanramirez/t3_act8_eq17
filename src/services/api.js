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

// NUEVA FUNCIÓN AGREGADA EN ESTE COMMIT
export async function obtenerMiembros() {
  const datos = await solicitar('/users?limit=0');
  return datos.users;
}

// NUEVAS FUNCIONES Y SOPORTE 404 AGREGADOS EN ESTE COMMIT
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