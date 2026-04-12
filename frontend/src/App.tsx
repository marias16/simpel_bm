import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
      <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
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