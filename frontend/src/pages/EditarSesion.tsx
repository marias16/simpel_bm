import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import EjerciciosGrid from '../components/EjerciciosGrid';
import BarraAcciones from '../components/BarraAcciones';
import { getSesion, actualizarSesion } from '../services/sesionService';
import { getEjerciciosBySesion, crearSesionEjercicio, eliminarSesionEjercicio } from '../services/sesionEjercicioService';

function EditarSesion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [paso, setPaso] = useState(1);
  const [seleccionados, setSeleccionados] = useState<any[]>([]);
  const [ejerciciosOriginales, setEjerciciosOriginales] = useState<any[]>([]);
  const [nombre, setNombre] = useState('');
  const [categoriaSesion, setCategoriaSesion] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [prueba, setPrueba] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargar = async () => {
      const resSesion = await getSesion(+id!);
      const sesion = resSesion.data;
      setNombre(sesion.nombre);
      setCategoriaSesion(sesion.categoria_sesion);
      setComentarios(sesion.comentarios || '');
      setPrueba(sesion.prueba);

      const resEj = await getEjerciciosBySesion(+id!);
      const ejercicios = resEj.data;
      setEjerciciosOriginales(ejercicios);
      setSeleccionados(ejercicios.map((se: any) => se.ejercicio));
    };
    cargar();
  }, [id]);

  const toggleSeleccion = (ejercicio: any) => {
    const yaSeleccionado = seleccionados.some((s) => s.id_ejercicio === ejercicio.id_ejercicio);
    if (yaSeleccionado) {
      setSeleccionados(seleccionados.filter((s) => s.id_ejercicio !== ejercicio.id_ejercicio));
    } else {
      setSeleccionados([...seleccionados, ejercicio]);
    }
  };

  const quitarSeleccionado = (idEj: number) => {
    setSeleccionados(seleccionados.filter((s) => s.id_ejercicio !== idEj));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await actualizarSesion(+id!, {
        nombre,
        categoria_sesion: categoriaSesion,
        comentarios,
        prueba,
      });

      // Eliminar todos los ejercicios originales
      for (const se of ejerciciosOriginales) {
        await eliminarSesionEjercicio(se.id_sesion_ejercicio);
      }

      // Recrear con el nuevo orden
      for (let i = 0; i < seleccionados.length; i++) {
        await crearSesionEjercicio({
          id_sesion: +id!,
          id_ejercicio: seleccionados[i].id_ejercicio,
          orden: i + 1,
        });
      }

      navigate(`/sesiones/${id}`);
    } catch (err) {
      setError('Error al guardar la sesión');
    }
  };

  if (paso === 1) {
    return (
      <Layout>
        <div style={{ paddingBottom: '80px' }}>
          <h2 className="fw-bold">Editar sesión</h2>
          <p className="text-muted mb-4">Paso 1: Seleccionar ejercicios</p>

          <EjerciciosGrid
            onClickEjercicio={toggleSeleccion}
            seleccionados={seleccionados}
          />
        </div>

        <BarraAcciones
          onCancelar={() => navigate(`/sesiones/${id}`)}
          textoConfirmar="Siguiente"
          tipoConfirmar="button"
          onConfirmar={() => {
            if (seleccionados.length > 0) {
              setPaso(2);
            } else {
              setError('Selecciona al menos un ejercicio');
            }
          }}
        />
        {error && <div className="alert alert-danger position-fixed" style={{ bottom: '70px', left: '100px' }}>{error}</div>}
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ paddingBottom: '80px' }}>
        <h2 className="fw-bold">Editar sesión</h2>
        <p className="text-muted mb-4">Paso 2: Completar campos</p>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="w-50 pe-4">
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Categoría</label>
                <select
                  className="form-select rounded-0"
                  value={categoriaSesion}
                  onChange={(e) => setCategoriaSesion(e.target.value)}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="Calentamiento">Calentamiento</option>
                  <option value="Técnica">Técnica</option>
                  <option value="Táctica">Táctica</option>
                  <option value="Físico">Físico</option>
                  <option value="Mixta">Mixta</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Comentarios</label>
                <textarea
                  className="form-control rounded-0"
                  rows={5}
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                />
              </div>

              {usuario?.rol === 'admin' && (
                <div className="form-check mt-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={prueba}
                    onChange={(e) => setPrueba(e.target.checked)}
                    id="prueba"
                  />
                  <label className="form-check-label" htmlFor="prueba">De prueba</label>
                </div>
              )}
            </div>

            <div className="w-50 ps-4">
              <label className="form-label fw-bold">Ejercicios seleccionados</label>
              <div className="d-flex flex-column gap-3">
                {seleccionados.map((ej) => (
                  <div
                    key={ej.id_ejercicio}
                    className="d-flex gap-3 border p-2"
                  >
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#e9e9e9',
                        backgroundImage: ej.imagen ? `url(${ej.imagen})` : 'none',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        flexShrink: 0,
                      }}
                    />
                    <div className="flex-grow-1">
                      <p className="fw-bold mb-1">{ej.nombre}</p>
                      <small className="text-muted">
                        {ej.categorias?.map((c: any) => c.nombre).join(', ')}
                      </small>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm rounded-0 align-self-start"
                      onClick={() => quitarSeleccionado(ej.id_ejercicio)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <BarraAcciones
            onCancelar={() => setPaso(1)}
            textoCancelar="Seleccionar ejercicios"
            textoConfirmar="Guardar"
          />
        </form>
      </div>
    </Layout>
  );
}

export default EditarSesion;