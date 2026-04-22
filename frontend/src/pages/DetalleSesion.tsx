import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BarraAcciones from '../components/BarraAcciones';
import { getSesion, toggleFavorita, eliminarSesion } from '../services/sesionService';
import { getEjerciciosBySesion } from '../services/sesionEjercicioService';

function DetalleSesion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sesion, setSesion] = useState<any>(null);
  const [ejercicios, setEjercicios] = useState<any[]>([]);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [favorita, setFavorita] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const resSesion = await getSesion(+id!);
      setSesion(resSesion.data);
      setFavorita(resSesion.data.favorita);
      const resEj = await getEjerciciosBySesion(+id!);
      setEjercicios(resEj.data);
    };
    cargar();
  }, [id]);

  

  if (!sesion) return <Layout><p>Cargando...</p></Layout>;
  const handleEliminar = async () => {
    if (window.confirm('¿Seguro que quieres eliminar esta sesión? Se eliminarán también sus sesiones agendadas.')) {
      await eliminarSesion(+id!);
      navigate('/sesiones');
    }
  };

  return (
    <Layout>
      <div style={{ paddingBottom: '80px' }}>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 className="fw-bold">{sesion.nombre}</h2>
            <span className="text-muted">{sesion.categoria_sesion} · {sesion.prueba ? 'Prueba' : 'Entrenamiento'}</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span
              style={{ fontSize: '1rem', cursor: 'pointer' }}
              onClick={async () => {
                await toggleFavorita(+id!);
                setFavorita(!favorita);
              }}
            >
              {favorita ? 'Quitar de favoritas ♥' : 'Marcar como favorita ♡'}
            </span>
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
                    onClick={() => { setMostrarOpciones(false); navigate(`/sesiones/editar/${id}`); }}
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
          </div>
        </div>

        <div className="d-flex">
          <div className="w-50 pe-4">
            <div className="mb-3">
              <small className="text-muted">Categoría</small>
              <p className="fw-bold mb-0">{sesion.categoria_sesion}</p>
            </div>
            <div className="mb-3">
              <small className="text-muted">Comentarios</small>
              <p className="mb-0">{sesion.comentarios || 'Sin comentarios'}</p>
            </div>
          </div>

          <div className="w-50 ps-4">
            <label className="form-label fw-bold">Ejercicios</label>
            <div className="d-flex flex-column gap-3">
              {ejercicios.map((se: any) => (
                <div
                  key={se.id_sesion_ejercicio}
                  className="d-flex gap-3 border p-2 w-80"
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#e9e9e9',
                      backgroundImage: se.ejercicio?.imagen ? `url(${se.ejercicio.imagen})` : 'none',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p className="fw-bold mb-1">{se.ejercicio?.nombre}</p>
                    <small className="text-muted">
                      {se.ejercicio?.descripcion}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BarraAcciones
        onCancelar={() => navigate(-1)}
        textoCancelar="Atrás"
        textoConfirmar="Agendar"
        tipoConfirmar="button"
        onConfirmar={() => navigate(`/sesiones/${id}/agendar`)}
      />
    </Layout>
  );
}

export default DetalleSesion;