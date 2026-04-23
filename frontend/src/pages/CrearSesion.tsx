import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import EjerciciosGrid from '../components/EjerciciosGrid';
import BarraAcciones from '../components/BarraAcciones';
import PaginaExito from '../components/PaginaExito';
import { crearSesion } from '../services/sesionService';
import { crearSesionEjercicio } from '../services/sesionEjercicioService';
import { getSesionesByUsuario } from '../services/sesionService';


function CrearSesion() {
  const [paso, setPaso] = useState(1);
  const [seleccionados, setSeleccionados] = useState<any[]>([]);
  const [idSesionCreada, setIdSesionCreada] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [categoriaSesion, setCategoriaSesion] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [prueba, setPrueba] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarNumero = async () => {
        const res = await getSesionesByUsuario(usuario!.id_usuario);
        setNombre(`Mi sesión #${res.data.length + 1}`);
    };
    cargarNumero();
    }, [usuario]);

  const toggleSeleccion = (ejercicio: any) => {
    const yaSeleccionado = seleccionados.some((s) => s.id_ejercicio === ejercicio.id_ejercicio);
    if (yaSeleccionado) {
      setSeleccionados(seleccionados.filter((s) => s.id_ejercicio !== ejercicio.id_ejercicio));
    } else {
      setSeleccionados([...seleccionados, ejercicio]);
    }
  };

  const quitarSeleccionado = (id: number) => {
    setSeleccionados(seleccionados.filter((s) => s.id_ejercicio !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await crearSesion({
        nombre,
        descripcion: '',
        categoria_sesion: categoriaSesion,
        comentarios,
        favorita:false,
        prueba,
        id_usuario: usuario!.id_usuario,
      });

      for (let i = 0; i < seleccionados.length; i++) {
        await crearSesionEjercicio({
          id_sesion: res.data.id_sesion,
          id_ejercicio: seleccionados[i].id_ejercicio,
          orden: i + 1,
        });
      }

      setIdSesionCreada(res.data.id_sesion);
      setExito(true);
    } catch (err) {
      setError('Error al crear la sesión');
    }
  };

  if (exito) {
    return (
      <PaginaExito
        titulo="¡Plantilla creada!"
        mensaje={`Ya tienes "${nombre}" disponible en mis sesiones.`}
        botones={[
          { texto: 'Agenda la sesión', ruta: `/sesiones/${idSesionCreada}/agendar`, estilo: 'primario' },
          { texto: 'Ve a plantillas', ruta: '/sesiones', estilo: 'secundario' },
        ]}
      />
    );
  }

  if (paso === 1) {
    return (
      <Layout>
        <div style={{ paddingBottom: '80px' }}>
          <h2 className="fw-bold">Crea una plantilla</h2>
          <p className="text-muted mb-4">Paso 1: Seleccionar ejercicios</p>

          <EjerciciosGrid
            onClickEjercicio={toggleSeleccion}
            seleccionados={seleccionados}
          />
        </div>

        <BarraAcciones
          onCancelar={() => navigate(-1)}
          textoConfirmar="Siguiente"
          tipoConfirmar="button"
          onConfirmar={() => {
            if (seleccionados.length > 0) {
              setError('');
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
        <h2 className="fw-bold">Crea una plantilla</h2>
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
                  <option value="Ataque">Ataque</option>
                  <option value="Defensa">Defensa</option>
                  <option value="Contrataque">Contrataque</option>
                  <option value="Mixto">Mixto</option>
                  <option value="Otra">Otra</option>
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

              <div className="d-flex gap-4">
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
            </div>

            <div className="w-50 ps-4">
              <label className="form-label fw-bold">Ejercicios</label>
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
                        backgroundSize: 'cover',
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
          />
        </form>
      </div>
    </Layout>
  );
}

export default CrearSesion;