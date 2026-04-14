import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getEquipo, eliminarEquipo } from '../services/equipoService';
import { getHorariosByEquipo, crearHorario, eliminarHorario } from '../services/horarioService';

function DetalleEquipo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipo, setEquipo] = useState<any>(null);
  const [horarios, setHorarios] = useState<any[]>([]);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const cargar = async () => {
    const resEquipo = await getEquipo(+id!);
    setEquipo(resEquipo.data);
    const resHorarios = await getHorariosByEquipo(+id!);
    setHorarios(resHorarios.data);
  };

  useEffect(() => {
    cargar();
  }, [id]);

  const handleEliminar = async () => {
    if (window.confirm('¿Seguro que quieres eliminar este equipo?')) {
      await eliminarEquipo(+id!);
      navigate('/equipos');
    }
  };

  const handleEliminarHorario = async (id_horario: number) => {
    await eliminarHorario(id_horario);
    cargar();
  };

  if (!equipo) return <Layout><p>Cargando...</p></Layout>;

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <h2 className="fw-bold">Ver equipo</h2>
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
                onClick={() => { setMostrarOpciones(false); navigate(`/equipos/editar/${id}`); }}
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

      <div className="d-flex">
        <div className="w-50">
          <div className="mb-3">
            <small className="text-muted">Club</small>
            <p className="fw-bold mb-0">{equipo.club?.nombre}</p>
          </div>
          <div className="mb-3">
            <small className="text-muted">Categoría</small>
            <p className="fw-bold mb-0">{equipo.categoria}</p>
          </div>
          <div className="mb-3">
            <small className="text-muted">Género</small>
            <p className="fw-bold mb-0">{equipo.genero}</p>
          </div>
          <div className="mb-3">
            <small className="text-muted">Letra</small>
            <p className="fw-bold mb-0">{equipo.letra}</p>
          </div>
          <div className="mb-3">
            <small className="text-muted">Horario</small>
            {horarios.length === 0 ? (
              <p className="text-muted">Sin horarios</p>
            ) : (
              horarios.map((h: any) => (
                <div key={h.id_horario} className="d-flex align-items-center gap-4 mb-1">
                  <span style={{ width: '100px' }}>{h.dia_semana}</span>
                  <span>{h.hora_inicio}h</span>
                  <span>{h.hora_fin}h</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="w-50 d-flex justify-content-center pt-2">
          <div>
            <div
              style={{
                width: '200px',
                height: '150px',
                backgroundColor: equipo.color,
                border: '1px solid #ccc',
                marginBottom: '8px',
              }}
            />
            <span className="fw-bold">Color del equipo</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DetalleEquipo;