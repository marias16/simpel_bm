import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Registro from './pages/Registro';
import Equipos from './pages/Equipos';
import CrearEquipo from './pages/CrearEquipo';
import EditarEquipo from './pages/EditarEquipo';
import DetalleEquipo from './pages/DetalleEquipo';



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