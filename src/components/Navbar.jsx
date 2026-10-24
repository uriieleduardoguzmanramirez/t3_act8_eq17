export default function Navbar({ usuario, alSalir }) {
  return (
    <header className="barra-superior">
      <div>
        <strong>Bienvenido a IRON GYM</strong>
        <div className="text-secondary small">Panel de administración</div>
      </div>
      <div className="d-flex align-items-center gap-2">
        {usuario.image ? <img className="foto-usuario" src={usuario.image} alt="Foto de perfil" />
          : <div className="foto-alternativa">👤</div>}
        <span className="nombre-usuario">{usuario.firstName} {usuario.lastName}</span>
        <button className="btn btn-sm btn-outline-secondary" onClick={alSalir}>Salir</button>
      </div>
    </header>
  );
}
