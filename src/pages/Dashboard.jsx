import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TablaMiembros from '../components/TablaMiembros';
import ModalMiembro from '../components/ModalMiembro';
import Paginacion from '../components/Paginacion';
import { obtenerMiembros, agregarMiembro, actualizarMiembro, borrarMiembro } from '../services/api';

// Lee ?page=2&limit=20, por ejemplo.
function leerUrl() {
  const parametros = new URLSearchParams(window.location.search);
  const page = Number(parametros.get('page'));
  const limit = Number(parametros.get('limit'));
  return {
    pagina: Number.isInteger(page) && page > 0 ? page : 1,
    limite: [10, 20, 40, 50].includes(limit) ? limit : 10
  };
}

export default function Dashboard({ usuario, alSalir }) {
  const [miembros, setMiembros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [genero, setGenero] = useState('todos');
  const [seccion, setSeccion] = useState('panel');
  const [modal, setModal] = useState(null);
  const [paginacion, setPaginacion] = useState(leerUrl);
  const { pagina, limite } = paginacion;

  useEffect(() => {
    let activo = true;
    obtenerMiembros()
      .then(datos => { if (activo) setMiembros(datos); })
      .catch(() => { if (activo) setError('No fue posible cargar los miembros. Revisa tu conexión.'); })
      .finally(() => { if (activo) setCargando(false); });
    return () => { activo = false; };
  }, []);

  useEffect(() => {
    const volver = () => setPaginacion(leerUrl());
    window.addEventListener('popstate', volver);
    return () => window.removeEventListener('popstate', volver);
  }, []);

  function cambiarPagina(nueva, nuevoLimite = limite) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', String(nueva));
    url.searchParams.set('limit', String(nuevoLimite));
    window.history.pushState({}, '', url);
    setPaginacion({ pagina: nueva, limite: nuevoLimite });
  }

  const filtrados = useMemo(() => miembros.filter(m => {
    const nombre = (m.firstName + ' ' + m.lastName).toLowerCase();
    return nombre.includes(busqueda.toLowerCase()) && (genero === 'todos' || m.gender === genero);
  }), [miembros, busqueda, genero]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / limite));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = filtrados.slice((paginaActual - 1) * limite, paginaActual * limite);

  useEffect(() => {
    if (!cargando && pagina > totalPaginas) {
      cambiarPagina(totalPaginas, limite);
    }
  }, [cargando, pagina, totalPaginas, limite]);

  function cambiarSeccion(nueva) {
    setSeccion(nueva);
    if (nueva === 'miembros') document.getElementById('tabla-miembros')?.scrollIntoView({ behavior: 'smooth' });
    if (nueva === 'panel') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function editar(miembro) {
    if (window.confirm('¿Deseas editar a ' + miembro.firstName + '?')) {
      setModal({ tipo: 'editar', miembro });
    }
  }

  async function eliminar(miembro) {
    if (!window.confirm('¿Seguro que deseas eliminar a ' + miembro.firstName + '?')) return;
    setError(''); setMensaje(''); setGuardando(true);
    try {
      await borrarMiembro(miembro);
      setMiembros(anterior => anterior.filter(m => m.id !== miembro.id));
      setMensaje('Miembro eliminado de la tabla correctamente.');
    } catch {
      setError('No se pudo eliminar el miembro desde la API.');
    } finally { setGuardando(false); }
  }

  async function guardar(datos) {
    setError(''); setMensaje(''); setGuardando(true);
    try {
      if (modal.tipo === 'agregar') {
        await agregarMiembro(datos); // Primero POST real; DummyJSON no lo conserva.
        const nuevoId = Math.max(0, ...miembros.map(m => m.id)) + 1;
        setMiembros(anterior => [{ ...datos, id: nuevoId, role: 'user', temporal: true }, ...anterior]);
        setMensaje('Miembro agregado a la tabla. El cambio es temporal.');
        setBusqueda(''); setGenero('todos'); cambiarPagina(1);
      } else {
        await actualizarMiembro(modal.miembro, datos); // Primero PATCH real.
        setMiembros(anterior => anterior.map(m => m.id === modal.miembro.id ? { ...m, ...datos } : m));
        setMensaje('Datos actualizados en la tabla.');
      }
      setModal(null);
    } catch {
      setError('No se pudo guardar. Comprueba los datos y tu conexión.');
    } finally { setGuardando(false); }
  }

  return (
    <div className="sistema">
      <Sidebar seccion={seccion} cambiarSeccion={cambiarSeccion} alSalir={alSalir} />
      <main className="contenido">
        <Navbar usuario={usuario} alSalir={alSalir} />
        <div className="p-4" id="panel">
          <h1 className="fs-3 fw-bold mb-1">Panel de administración</h1>
          <p className="text-secondary mb-4">Control básico de miembros · IRON GYM</p>

          {seccion === 'ayuda' && <div className="alert alert-info">Usa la búsqueda, el filtro y los botones para administrar la tabla. Los cambios CRUD son simulados por DummyJSON.</div>}
          {error && <div role="alert" className="alert alert-danger">{error}</div>}
          {mensaje && <div role="status" className="alert alert-success">{mensaje}</div>}

          <div className="row g-3 mb-4">
            <div className="col-md-4"><div className="dato-card card p-3"><small>Miembros cargados</small><strong>{miembros.length}</strong></div></div>
            <div className="col-md-4"><div className="dato-card card p-3"><small>Resultados filtrados</small><strong>{filtrados.length}</strong></div></div>
            <div className="col-md-4"><div className="dato-card card p-3"><small>Administrador</small><strong className="fs-5">{usuario.firstName}</strong></div></div>
          </div>

          <section className="card border-0 shadow-sm p-3 p-md-4" id="tabla-miembros">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <div><h2 className="fs-5 fw-bold m-0">Miembros del gimnasio</h2><small className="text-secondary">Datos de ejemplo de DummyJSON</small></div>
              <button className="btn btn-naranja" disabled={guardando} onClick={() => setModal({ tipo: 'agregar' })}>
                <i className="bi bi-plus-lg" /> Agregar miembro
              </button>
            </div>
            <div className="row g-2 mb-3">
              <div className="col-md-8">
                <input className="form-control" placeholder="Buscar miembro por nombre..." value={busqueda}
                  onChange={e => { setBusqueda(e.target.value); cambiarPagina(1); }} />
              </div>
              <div className="col-md-4">
                <select className="form-select" value={genero} onChange={e => { setGenero(e.target.value); cambiarPagina(1); }}>
                  <option value="todos">Todos los géneros</option>
                  <option value="female">Femenino</option>
                  <option value="male">Masculino</option>
                </select>
              </div>
            </div>
            {cargando ? <div className="py-5 text-center" role="status">Cargando miembros...</div>
              : <><TablaMiembros miembros={visibles} alEditar={editar} alBorrar={eliminar} />
                <Paginacion pagina={paginaActual} limite={limite} total={filtrados.length} cambiar={cambiarPagina} /></>}
          </section>
          <p className="small text-secondary mt-3">Las operaciones POST, PATCH y DELETE se envían a DummyJSON. Esta API no guarda los cambios permanentemente.</p>
        </div>
      </main>
      {modal && <ModalMiembro key={modal.miembro?.id || 'nuevo'} miembro={modal.miembro} alGuardar={guardar}
        alCerrar={() => !guardando && setModal(null)} guardando={guardando} />}
    </div>
  );
}
