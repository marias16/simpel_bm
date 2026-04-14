import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import BarraAcciones from '../components/BarraAcciones';
import { getSesion } from '../services/sesionService';
import { getEjerciciosBySesion } from '../services/sesionEjercicioService';

function DetalleSesion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [sesion, setSesion] = useState<any>(null);
  const [ejercicios, setEjercicios] = useState<any[]>([]);

  useEffect(() => {
    const cargar = async () => {
      const resSesion = await getSesion(+id!);
      setSesion(resSesion.data);
      const resEj = await getEjerciciosBySesion(+id!);
      setEjercicios(resEj.data);
    };
    cargar();
  }, [id]);

  if (!sesion) return <Layout><p>Cargando...</p></Layout>;

  return (
    <Layout>
      <div style={{ paddingBottom: '80px' }}>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 className="fw-bold">{sesion.nombre}</h2>
            <span className="text-muted">{sesion.categoria_sesion} · {sesion.prueba ? 'Prueba' : 'Entrenamiento'}</span>
          </div>
          <span style={{ fontSize: '2rem' }}>{sesion.favorita ? '♥' : '♡'}</span>
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
                  className="d-flex gap-3 border p-2"
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
                      {se.ejercicio?.categorias?.map((c: any) => c.nombre).join(', ')}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BarraAcciones
        onCancelar={() => navigate('/sesiones')}
        textoCancelar="Atrás"
        textoConfirmar="Agendar"
        tipoConfirmar="button"
        onConfirmar={() => navigate(`/sesiones/${id}/agendar`)}
      />
    </Layout>
  );
}

export default DetalleSesion;