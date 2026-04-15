import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import BarraAcciones from '../components/BarraAcciones';
import PaginaExito from '../components/PaginaExito';
import { getSesion } from '../services/sesionService';
import { getEjerciciosBySesion } from '../services/sesionEjercicioService';
import { getEquiposByUsuario } from '../services/equipoService';
import { getHorariosByEquipo } from '../services/horarioService';
import { crearEquipoSesion } from '../services/equipoSesionService';

function AgendarSesion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [sesion, setSesion] = useState<any>(null);
  const [ejercicios, setEjercicios] = useState<any[]>([]);
  const [equipos, setEquipos] = useState<any[]>([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState('');
  const [horarios, setHorarios] = useState<any[]>([]);
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [horarioSugerido, setHorarioSugerido] = useState<any>(null);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const resSesion = await getSesion(+id!);
      setSesion(resSesion.data);
      const resEj = await getEjerciciosBySesion(+id!);
      setEjercicios(resEj.data);
      const resEquipos = await getEquiposByUsuario(usuario!.id_usuario);
      setEquipos(resEquipos.data);
    };
    cargar();
  }, [id, usuario]);

  useEffect(() => {
    const cargarHorarios = async () => {
      if (equipoSeleccionado) {
        const res = await getHorariosByEquipo(+equipoSeleccionado);
        setHorarios(res.data);
      } else {
        setHorarios([]);
      }
      setHorarioSugerido(null);
    };
    cargarHorarios();
  }, [equipoSeleccionado]);

  useEffect(() => {
    if (fecha && horarios.length > 0) {
      const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const diaSemana = diasSemana[new Date(fecha).getDay()];
      const horario = horarios.find((h: any) => h.dia_semana === diaSemana);
      if (horario) {
        setHorarioSugerido(horario);
        setHoraInicio(horario.hora_inicio);
        setHoraFin(horario.hora_fin);
      } else {
        setHorarioSugerido(null);
        setHoraInicio('');
        setHoraFin('');
      }
    }
  }, [fecha, horarios]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!equipoSeleccionado || !fecha || !horaInicio || !horaFin) {
      setError('Completa todos los campos');
      return;
    }

    try {
      await crearEquipoSesion({
        fecha,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        id_equipo: +equipoSeleccionado,
        id_sesion: +id!,
      });
      setExito(true);
    } catch (err) {
      setError('Error al agendar la sesión');
    }
  };

  if (!sesion) return <Layout><p>Cargando...</p></Layout>;

  if (exito) {
    return (
      <PaginaExito
        titulo="¡Sesión agendada!"
        mensaje={`Ya tienes "${sesion.nombre}" agendada en el calendario.`}
        botones={[
          { texto: 'Ve al Calendario', ruta: '/calendario', estilo: 'primario' },
          { texto: 'Ve a Mis Sesiones', ruta: '/sesiones', estilo: 'secundario' },
        ]}
      />
    );
  }

  const equipoActual = equipos.find((e: any) => e.id_equipo === +equipoSeleccionado);

  return (
    <Layout>
      <div style={{ paddingBottom: '80px' }}>
        <h2 className="fw-bold">Agenda la sesión</h2>
        <p className="fw-bold text-muted mb-4">{sesion.nombre}</p>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="w-50 pe-4">
              <div className="mb-3">
                <label className="form-label">Equipo</label>
                <select
                  className="form-select rounded-0"
                  value={equipoSeleccionado}
                  onChange={(e) => setEquipoSeleccionado(e.target.value)}
                  required
                >
                  <option value="">Selecciona un equipo</option>
                  {equipos.map((eq: any) => (
                    <option key={eq.id_equipo} value={eq.id_equipo}>
                      {eq.club?.nombre} · {eq.categoria} · {eq.genero}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Día</label>
                <input
                  type="date"
                  className="form-control rounded-0"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </div>

              {horarioSugerido && (
                <div className="mb-3 p-3 border" style={{ backgroundColor: '#f8f8f8' }}>
                  <small className="text-muted d-block mb-1">Horario sugerido para el equipo</small>
                  <span className="fw-bold">
                    {horarioSugerido.dia_semana} {horarioSugerido.hora_inicio}h - {horarioSugerido.hora_fin}h
                  </span>
                </div>
              )}

              <div className="d-flex gap-3">
                <div className="flex-grow-1">
                  <label className="form-label">Hora inicio</label>
                  <input
                    type="time"
                    className="form-control rounded-0"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-grow-1">
                  <label className="form-label">Hora fin</label>
                  <input
                    type="time"
                    className="form-control rounded-0"
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)}
                    required
                  />
                </div>
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

          <BarraAcciones
            onCancelar={() => navigate(`/sesiones/${id}`)}
            textoConfirmar="Agendar"
          />
        </form>
      </div>
    </Layout>
  );
}

export default AgendarSesion;