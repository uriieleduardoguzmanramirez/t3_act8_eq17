import { useState } from 'react';

export default function ModalMiembro({ miembro, alGuardar, alCerrar, guardando }) {
  const [datos, setDatos] = useState({
    firstName: miembro?.firstName || '',
    lastName: miembro?.lastName || '',
    email: miembro?.email || '',
    gender: miembro?.gender || 'male',
    age: miembro?.age || 18
  });

  function cambiar(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value });
  }

  function enviar(evento) {
    evento.preventDefault();
    alGuardar({ ...datos, age: Number(datos.age) });
  }

  return (
    <div className="fondo-modal" onClick={alCerrar}>
      <div className="modal-contenido shadow-lg" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={miembro ? 'Editar miembro' : 'Agregar miembro'}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fs-5 m-0">{miembro ? 'Editar miembro' : 'Agregar miembro'}</h3>
          <button type="button" className="btn-close" onClick={alCerrar} aria-label="Cerrar" />
        </div>
        <form onSubmit={enviar}>
          <label className="form-label">Nombre</label>
          <input className="form-control mb-2" name="firstName" value={datos.firstName} onChange={cambiar} required minLength="2" />
          <label className="form-label">Apellido</label>
          <input className="form-control mb-2" name="lastName" value={datos.lastName} onChange={cambiar} required minLength="2" />
          <label className="form-label">Correo</label>
          <input className="form-control mb-2" name="email" type="email" value={datos.email} onChange={cambiar} required />
          <div className="row g-2">
            <div className="col-6">
              <label className="form-label">Género</label>
              <select className="form-select" name="gender" value={datos.gender} onChange={cambiar}>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label">Edad</label>
              <input className="form-control" type="number" name="age" min="18" max="100" value={datos.age} onChange={cambiar} required />
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-outline-secondary" onClick={alCerrar}>Cancelar</button>
            <button type="submit" className="btn btn-naranja" disabled={guardando}>{guardando ? 'Guardando...' : 'Guardar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
