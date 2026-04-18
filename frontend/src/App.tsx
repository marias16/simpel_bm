import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Registro from './pages/Registro';
import Equipos from './pages/Equipos';
import CrearEquipo from './pages/CrearEquipo';
import EditarEquipo from './pages/EditarEquipo';
import DetalleEquipo from './pages/DetalleEquipo';
import Ejercicios from './pages/Ejercicios';
import DetalleEjercicio from './pages/DetalleEjercicio';
import CrearEjercicio from './pages/CrearEjercicios';
import EditarEjercicio from './pages/EditarEjercicio';
import Sesiones from './pages/Sesiones';
import CrearSesion from './pages/CrearSesion';
import EditarSesion from './pages/EditarSesion';
import DetalleSesion from './pages/DetalleSesion';
import AgendarSesion from './pages/AgendarSesion';
import DetalleAgendada from './pages/DetalleAgendada';
import Calendario from './pages/Calendario';
import Perfil from './pages/Perfil';


function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
      <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/registro" element={!token ? <Registro /> : <Navigate to="/"/>}/>
      <Route path="/equipos/crear" element={token ? <CrearEquipo /> : <Navigate to="/login" />} />
      <Route path="/equipos/editar/:id" element={token ? <EditarEquipo /> : <Navigate to="/login" />} />
      <Route path="/equipos/:id" element={token ? <DetalleEquipo /> : <Navigate to="/login" />} />
      <Route path="/equipos" element={token ? <Equipos /> : <Navigate to="/login" />} />
      <Route path="/ejercicios/editar/:id" element={token ? <EditarEjercicio /> : <Navigate to="/login" />} />
      <Route path="/ejercicios/crear" element={token ? <CrearEjercicio /> : <Navigate to="/login" />} />
      <Route path="/ejercicios/:id" element={token ? <DetalleEjercicio /> : <Navigate to="/login" />} />
      <Route path="/ejercicios" element={token ? <Ejercicios /> : <Navigate to="/login" />} />
      <Route path="/sesiones/crear" element={token ? <CrearSesion /> : <Navigate to="/login" />} />
      <Route path="/sesiones/editar/:id" element={token ? <EditarSesion /> : <Navigate to="/login" />} />
      <Route path="/sesiones/:id" element={token ? <DetalleSesion /> : <Navigate to="/login" />} />
      <Route path="/sesiones" element={token ? <Sesiones /> : <Navigate to="/login" />} />
      <Route path="/sesiones/:id/agendar" element={token ? <AgendarSesion /> : <Navigate to="/login" />} />
      <Route path="/agendada/:id" element={token ? <DetalleAgendada /> : <Navigate to="/login" />} />
      <Route path="/calendario" element={token ? <Calendario /> : <Navigate to="/login" />} />
      <Route path="/perfil" element={token ? <Perfil /> : <Navigate to="/login" />} />

      

    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;