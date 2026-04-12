import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      login(res.data.access_token);
    } catch (err) {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="vh-100 d-flex flex-column">
      <div className="p-3">
        <span className="fw-bold">simpel_bm</span>
      </div>
      <div className="flex-grow-1 d-flex">
        <div className="w-50 d-flex align-items-center p-5">
          <h1 className="fw-bold" style={{ fontSize: '3.5rem' }}>
            Entrenar<br /> balonmano <br />nunca fue<br />tan <span style={{ fontStyle: "italic", color: '#6c63ff' }}>simpel</span>
          </h1>
        </div>
        <div className="w-50 d-flex justify-content-center align-items-center">
          <div className="card p-4 rounded-0" style={{ width: '350px' }}>
            <h4 className="mb-4">Inicia sesión</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control rounded-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control rounded-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-dark w-100 mb-3 rounded-0">
                Entra
              </button>
            </form>
            <div className="text-center">
              <span
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => navigate('/registro')}
              >
                ¿No tienes cuenta? Regístrate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;