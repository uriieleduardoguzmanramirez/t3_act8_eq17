import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [usuario, setUsuario] = useState(null);

  // Si no hay usuario, el dashboard no se muestra.
  if (!usuario) {
    return <Login alIngresar={setUsuario} />;
  }

  return <Dashboard usuario={usuario} alSalir={() => setUsuario(null)} />;
}

export default App;
