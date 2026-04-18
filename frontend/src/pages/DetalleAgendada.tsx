import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import BarraAcciones from '../components/BarraAcciones';
import { getEquipoSesion, eliminarEquipoSesion, actualizarEquipoSesion } from '../services/equipoSesionService';
import { getEquiposByUsuario } from '../services/equipoService';
import { getHorariosByEquipo } from '../services/horarioService';

function DetalleAgendada() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [agendada, setAgendada] = useState<any>(null);
  const [editando, setEditando] = useState(false);
  const [equipos, setEquipos] = useState<any[]>([]);
  const [horarios, setHorarios] = useState<any[]>([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [horarioSugerido, setHorarioSugerido] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargar = async () => {
      const res = await getEquipoSesion(+id!);
      const data = res.data;
      setAgendada(data);
      setEquipoSeleccionado(data.equipo?.id_equipo?.toString() || '');
      setFecha(data.fecha?.split('T')[0] || '');
      setHoraInicio(data.hora_inicio || '');
      setHoraFin(data.hora_fin || '');

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
      } else {
        setHorarioSugerido(null);
      }
    }
  }, [fecha, horarios]);

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    const texto = date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };

  const handleEliminar = async () => {
    if (window.confirm('¿Seguro que quieres eliminar esta sesión agendada?')) {
      await eliminarEquipoSesion(+id!);
      navigate('/calendario');
    }
  };

  const handleGuardar = async () => {
    setError('');
    try {
      await actualizarEquipoSesion(+id!, {
        fecha,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        id_equipo: +equipoSeleccionado,
      });
      setEditando(false);
      const res = await getEquipoSesion(+id!);
      setAgendada(res.data);
    } catch (err) {
      setError('Error al guardar los cambios');
    }
  };

  if (!agendada) return <Layout><p>Cargando...</p></Layout>;

  return (
    <Layout>
      <div style={{ paddingBottom: '80px' }}>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 className="fw-bold">{agendada.sesion?.nombre}</h2>
            <span className="text-muted">Sesión agendada</span>
          </div>
          <div className="d-flex gap-2">
            {!editando && (
              <button
                className="btn btn-outline-dark rounded-0"
                onClick={() => setEditando(true)}
              >
                ✏️ Editar
              </button>
            )}
            <button
              className="btn btn-outline-danger rounded-0"
              onClick={handleEliminar}
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {editando ? (
          <div style={{ maxWidth: '500px' }}>
            <div className="mb-3">
              <label className="form-label">Equipo</label>
              <select
                className="form-select rounded-0"
                value={equipoSeleccionado}
                onChange={(e) => setEquipoSeleccionado(e.target.value)}
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
                />
              </div>
              <div className="flex-grow-1">
                <label className="form-label">Hora fin</label>
                <input
                  type="time"
                  className="form-control rounded-0"
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex gap-2 mt-4">
              <button
                className="btn btn-outline-dark rounded-0"
                onClick={() => setEditando(false)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-dark rounded-0"
                onClick={handleGuardar}
              >
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-3">
              <small className="text-muted">Equipo</small>
              <p className="fw-bold mb-0">
                {agendada.equipo?.club?.nombre} · {agendada.equipo?.categoria} {agendada.equipo?.genero} {agendada.equipo?.letra}
              </p>
            </div>
            <div className="mb-3">
              <small className="text-muted">Fecha</small>
              <p className="fw-bold mb-0">{formatearFecha(agendada.fecha)}</p>
            </div>
            <div className="mb-3">
              <small className="text-muted">Horario</small>
              <p className="fw-bold mb-0">{agendada.hora_inicio}h - {agendada.hora_fin}h</p>
            </div>
          </div>
        )}
      </div>

      <BarraAcciones
        onCancelar={() => navigate(-1)}
        textoCancelar="Atrás"
        textoConfirmar="Ver plantilla"
        tipoConfirmar="button"
        onConfirmar={() => navigate(`/sesiones/${agendada.sesion?.id_sesion}`)}
      />
    </Layout>
  );
}

export default DetalleAgendada;