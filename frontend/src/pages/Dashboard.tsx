import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { usuario, logout } = useAuth();

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Hola, {usuario?.email}</h2>
        <button className="btn btn-outline-dark" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
      <p>Dashboard en construcción</p>
    </div>
  );
}

export default Dashboard;