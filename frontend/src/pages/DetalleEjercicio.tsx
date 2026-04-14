import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import BarraAcciones from '../components/BarraAcciones';
import { getEjercicio, eliminarEjercicio } from '../services/ejercicioService';

function DetalleEjercicio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [ejercicio, setEjercicio] = useState<any>(null);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const res = await getEjercicio(+id!);
      setEjercicio(res.data);
    };
    cargar();
  }, [id]);

  const handleEliminar = async () => {
    if (window.confirm('¿Seguro que quieres eliminar este ejercicio?')) {
      await eliminarEjercicio(+id!);
      navigate('/ejercicios');
    }
  };

  if (!ejercicio) return <Layout><p>Cargando...</p></Layout>;

  return (
    <Layout>
      <div style={{ paddingBottom: '80px' }}>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <h2 className="fw-bold">{ejercicio.nombre}</h2>
          {usuario?.rol === 'admin' && (
            <div style={{ position: 'relative' }}>
              <button
                className="btn btn-outline-dark rounded-0"
                onClick={() => setMostrarOpciones(!mostrarOpciones)}
              >
                Opciones
              </button>
              {mostrarOpciones && (
                <div
                  className="border bg-white"
                  style={{ position: 'absolute', right: 0, top: '100%', zIndex: 10, minWidth: '150px' }}
                >
                  <div
                    className="p-2 d-flex align-items-center gap-2"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                    onClick={() => { setMostrarOpciones(false); navigate(`/ejercicios/editar/${id}`); }}
                  >
                    ✏️ Editar
                  </div>
                  <div
                    className="p-2 d-flex align-items-center gap-2 text-danger"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                    onClick={handleEliminar}
                  >
                    🗑️ Eliminar
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="d-flex">
          <div className="w-50">
            <div className="mb-3">
              <small className="text-muted">Categorías</small>
              <p className="fw-bold mb-0">
                {ejercicio.categorias?.map((c: any) => c.nombre).join(', ')}
              </p>
            </div>
            <div className="mb-3">
              <small className="text-muted">Descripción</small>
              <p className="mb-0">{ejercicio.descripcion}</p>
            </div>
          </div>

          <div className="w-50 d-flex justify-content-center">
            <div
              style={{
                width: '500px',
                height: '400px',
                backgroundColor: '#e9e9e9',
                backgroundImage: ejercicio.imagen ? `url(${ejercicio.imagen})` : 'none',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                border: '1px solid #ccc',
                }}
            />
          </div>
        </div>
      </div>

      <BarraAcciones
        onCancelar={() => navigate('/ejercicios')}
        textoCancelar="Atrás"
        textoConfirmar="Agendar"
        tipoConfirmar="button"
        onConfirmar={() => navigate('/sesiones/crear')}
      />
    </Layout>
  );
}

export default DetalleEjercicio;