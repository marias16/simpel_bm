import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { getEquipoSesiones } from '../services/equipoSesionService';
import { getEquiposByUsuario } from '../services/equipoService';

function Dashboard() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [sesionesProximas, setSesionesProximas] = useState<any[]>([]);

  useEffect(() => {
    const cargar = async () => {
      const resEquipos = await getEquiposByUsuario(usuario!.id_usuario);
      const equiposUsuario = resEquipos.data;

      const resTodas = await getEquipoSesiones();
      const sesionesUsuario = resTodas.data
        .filter((es: any) =>
          equiposUsuario.some((eq: any) => eq.id_equipo === es.equipo?.id_equipo) &&
          new Date(es.fecha) >= new Date(new Date().toDateString())
        )
        .sort((a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
        .slice(0, 5);

      setSesionesProximas(sesionesUsuario);
    };
    cargar();
  }, [usuario]);

  const formatearFechaCorta = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
  };

  const acciones = [
    {
      titulo: 'Agenda una sesión.',
      icono: '○',
      ruta: '/sesiones',
    },
    {
      titulo: 'Crea una plantilla de sesión.',
      icono: '▷',
      ruta: '/sesiones/crear',
    },
    {
      titulo: 'Explora ejercicios.',
      icono: '◇',
      ruta: '/ejercicios',
    },
  ];

  return (
    <Layout>
      <div className="mb-5">
        <h2 className="fw-bold">Hola, {usuario?.email?.split('@')[0]}</h2>
        <p className="text-muted">¿Qué quieres gestionar hoy?</p>
      </div>

      <div className="mb-5">
        <h5 className="fw-bold mb-3">Sesiones agendadas</h5>
        {sesionesProximas.length === 0 ? (
          <p className="text-muted">No tienes sesiones próximas.</p>
        ) : (
          <div className="d-flex gap-3" style={{ overflowX: 'auto', paddingBottom: '8px' }}>
            {sesionesProximas.map((es: any) => (
              <div
                key={es.id_equipo_sesion}
                className="card rounded-0"
                style={{
                  minWidth: '180px',
                  height: '200px',
                  cursor: 'pointer',
                  borderTop: `4px solid ${es.equipo?.color || '#6c63ff'}`,
                }}
                onClick={() => navigate(`/sesiones/${es.sesion?.id_sesion}`)}
              >
                <div className="card-body py-2">
                  <p className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>{es.sesion?.nombre}</p>
                  <small className="text-muted d-block">{es.equipo?.categoria} {es.equipo?.genero} {es.equipo?.letra}</small>
                  <small className="text-muted">{formatearFechaCorta(es.fecha)} · {es.hora_inicio}h</small>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-end mt-2">
          <span
            style={{ cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}
            onClick={() => navigate('/calendario')}
          >
            Ver calendario →
          </span>
        </div>
      </div>

      <div className="mb-5">
        <h5 className="fw-bold mb-3">Organiza</h5>
        <div className="d-flex gap-3">
          {acciones.map((accion) => (
            <div
              key={accion.titulo}
              className="card rounded-0 text-center p-4"
              style={{ width: '200px', cursor: 'pointer' }}
              onClick={() => navigate(accion.ruta)}
            >
              <span style={{ fontSize: '2rem', marginBottom: '8px' }}>{accion.icono}</span>
              <p className="mb-0" style={{ fontSize: '0.9rem' }}>{accion.titulo}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h5 className="fw-bold mb-3">¿Necesitas ayuda?</h5>
        <div className="card rounded-0 p-4" style={{ backgroundColor: '#f8f8f8' }}>
          <h5 className="fw-bold mb-1">Organiza y entrena. Simpel.</h5>
          <p className="text-muted mb-0">Asesoramiento personalizado al alcance de tu mano. Contáctanos.</p>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;