import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, logout } = useAuth();

  const menuItems = [
    { label: 'Inicio', path: '/', icon: '⌂' },
    { label: 'Calendario', path: '/calendario', icon: '▦' },
    { label: 'Mis sesiones', path: '/sesiones', icon: '◎' },
    { label: 'Ejercicios', path: '/ejercicios', icon: '⬡' },
    { label: 'Mis equipos', path: '/equipos', icon: '◑' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className="d-flex flex-column align-items-center bg-white border-end py-3"
      style={{ width: '90px', minHeight: '100vh' }}
    >
      <span className="fw-bold mb-4" style={{ fontSize: '0.7rem' }}>Menú</span>

      <nav className="flex-grow-1 d-flex flex-column align-items-center gap-4 w-100">
        {menuItems.map((item) => (
          <div
            key={item.path}
            className="d-flex flex-column align-items-center py-2 w-100 sidebar-item"
            style={{
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: isActive(item.path) ? 'bold' : 'normal',
              backgroundColor: isActive(item.path) ? '#f0f0f0' : 'transparent',
              borderLeft: isActive(item.path) ? '3px solid #6c63ff' : '3px solid transparent',
            }}
            onClick={() => navigate(item.path)}
          >
            <span style={{ fontSize: '1.4rem', marginBottom: '2px' }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      <div
        className="d-flex flex-column align-items-center mt-auto py-2 w-100 sidebar-item"
        style={{ cursor: 'pointer', fontSize: '0.75rem' }}
        onClick={() => navigate('/perfil')}
      >
        <div
          className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white mb-1"
          style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}
        >
          {usuario?.email?.charAt(0).toUpperCase()}
        </div>
        {usuario?.email?.split('@')[0]}
      </div>

      <div
        className="text-muted mt-2 sidebar-item"
        style={{ cursor: 'pointer', fontSize: '0.7rem' }}
        onClick={logout}
      >
        Cerrar sesión
      </div>
    </div>
  );
}

export default Sidebar;