import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import EjerciciosGrid from '../components/EjerciciosGrid';

function Ejercicios() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Ejercicios</h2>
        {usuario?.rol === 'admin' && (
          <button
            className="btn btn-dark rounded-0"
            onClick={() => navigate('/ejercicios/crear')}
          >
            Crea un ejercicio
          </button>
        )}
      </div>

      <EjerciciosGrid
        onClickEjercicio={(ej) => navigate(`/ejercicios/${ej.id_ejercicio}`)}
      />
    </Layout>
  );
}

export default Ejercicios;