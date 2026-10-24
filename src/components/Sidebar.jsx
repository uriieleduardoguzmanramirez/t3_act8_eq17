export default function Sidebar({ seccion, cambiarSeccion, alSalir }) {
  const opciones = [
    ['panel', 'bi-speedometer2', 'Panel'],
    ['miembros', 'bi-people', 'Miembros'],
    ['ayuda', 'bi-info-circle', 'Ayuda']
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-marca">IRON <span>GYM</span></div>
      <div className="sidebar-subtitulo">ADMINISTRACIÓN</div>
      <nav className="mt-4" aria-label="Menú principal">
        {opciones.map(([id, icono, texto]) => (
          <button key={id} className={'sidebar-enlace ' + (seccion === id ? 'activo' : '')}
            onClick={() => cambiarSeccion(id)}>
            <i className={'bi ' + icono} /> {texto}
          </button>
        ))}
      </nav>
      <button className="sidebar-salir" onClick={alSalir}>
        <i className="bi bi-box-arrow-left" /> Cerrar sesión
      </button>
    </aside>
  );
}
