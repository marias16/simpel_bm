import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import api from '../services/api';

function Perfil() {
  const { usuario, logout } = useAuth();
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [passwordRepetida, setPasswordRepetida] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setExito('');

    if (passwordNueva !== passwordRepetida) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }

    if (passwordNueva.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await api.patch(`/usuarios/${usuario!.id_usuario}/password`, {
        passwordActual,
        passwordNueva,
      });
      setExito('Contraseña cambiada correctamente');
      setPasswordActual('');
      setPasswordNueva('');
      setPasswordRepetida('');
    } catch (err) {
      setError('La contraseña actual es incorrecta');
    }
  };

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Mi perfil</h2>

      <div style={{ maxWidth: '500px' }}>
        <div className="mb-4 p-4 border">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div
              className="rounded-circle bg-dark d-flex justify-content-center align-items-center text-white"
              style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}
            >
              {usuario?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="fw-bold mb-0">{usuario?.email?.split('@')[0]}</p>
              <small className="text-muted">{usuario?.email}</small>
            </div>
          </div>
          <div className="d-flex gap-4">
            <div>
              <small className="text-muted">Rol</small>
              <p className="mb-0 fw-bold">{usuario?.rol}</p>
            </div>
          </div>
        </div>

        <h5 className="fw-bold mb-3">Cambia tu contraseña</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        {exito && <div className="alert alert-success">{exito}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Contraseña actual</label>
            <input
              type="password"
              className="form-control rounded-0"
              value={passwordActual}
              onChange={(e) => setPasswordActual(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nueva contraseña</label>
            <input
              type="password"
              className="form-control rounded-0"
              value={passwordNueva}
              onChange={(e) => setPasswordNueva(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Repite la nueva contraseña</label>
            <input
              type="password"
              className="form-control rounded-0"
              value={passwordRepetida}
              onChange={(e) => setPasswordRepetida(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark rounded-0">
            Guardar contraseña
          </button>
        </form>

        <div className="mt-5 pt-4 border-top">
          <button
            className="btn btn-outline-danger rounded-0"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Perfil;