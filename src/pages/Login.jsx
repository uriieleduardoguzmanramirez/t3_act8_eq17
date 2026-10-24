import { useState } from 'react';
import { iniciarSesion } from '../services/api';

export default function Login({ alIngresar }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  async function entrar(evento) {
    evento.preventDefault();
    setError('');

    if (!usuario.trim() || !password.trim()) {
      setError('Escribe tu usuario y contraseña.');
      return;
    }

    try {
      setCargando(true);
      const datos = await iniciarSesion(usuario.trim(), password);
      alIngresar(datos);
    } catch (e) {
      setError('Usuario o contraseña incorrectos, o no hay conexión.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="login-fondo">
      <div className="login-tarjeta shadow-lg">
        <div className="login-izquierda">
          <div className="marca-login">
            <div className="marca-icono">✦</div>
            <h1>IRON <span>GYM</span></h1>
            <small>FUERZA SIN LÍMITES</small>
          </div>
          <h2 className="fs-5 mb-4 text-white">Iniciar sesión</h2>
          <form onSubmit={entrar}>
            <label className="form-label text-white">Usuario</label>
            <input className="form-control mb-3" value={usuario}
              onChange={e => setUsuario(e.target.value)} placeholder="Ejemplo: emilys" />
            <label className="form-label text-white">Contraseña</label>
            <input type="password" className="form-control mb-3" value={password}
              onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
            {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
            <button className="btn btn-naranja w-100" disabled={cargando}>
              {cargando ? 'Validando...' : 'Iniciar sesión'}
            </button>
          </form>
          <small className="text-white-50 d-block mt-4">Prueba: emilys / emilyspass</small>
        </div>
        <div className="login-derecha">
          <div className="pesas-simbolo"><i className="bi bi-lightning-charge-fill" /></div>
          <div className="frase-gym">DISCIPLINA<br />CONSTANCIA<br /><strong>RESULTADOS</strong></div>
          <p>TRAIN HARD · STAY STRONG</p>
        </div>
      </div>
    </div>
  );
}
