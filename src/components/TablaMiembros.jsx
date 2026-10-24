export default function TablaMiembros({ miembros, alEditar, alBorrar }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead><tr>
          <th>FOTO</th><th>NOMBRE</th><th>CORREO</th><th>GÉNERO</th><th>ROL</th><th>ACCIONES</th>
        </tr></thead>
        <tbody>
          {miembros.length === 0 && <tr><td colSpan="6" className="text-center py-4">No se encontraron miembros.</td></tr>}
          {miembros.map(miembro => (
            <tr key={miembro.id}>
              <td>{miembro.image
                ? <img className="foto-tabla" src={miembro.image} alt="Perfil" />
                : <span className="foto-tabla sin-foto">👤</span>}</td>
              <td className="fw-medium">{miembro.firstName} {miembro.lastName}</td>
              <td>{miembro.email}</td>
              <td>{miembro.gender === 'female' ? 'Femenino' : 'Masculino'}</td>
              <td><span className="badge text-bg-light border">{miembro.role || 'user'}</span></td>
              <td className="text-nowrap">
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => alEditar(miembro)}>Editar</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => alBorrar(miembro)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
