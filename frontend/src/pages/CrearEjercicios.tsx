import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import BarraAcciones from '../components/BarraAcciones';
import CategoriaSelector from '../components/CategoriaSelector';
import PaginaExito from '../components/PaginaExito';
import { crearEjercicio } from '../services/ejercicioService';
import { getCategorias, crearCategoria } from '../services/categoriaService';

function CrearEjercicio() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [categorias, setCategorias] = useState<any[]>([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      const res = await getCategorias();
      setCategorias(res.data);
    };
    cargar();
  }, []);

  const handleCrearCategoria = async (nombre: string) => {
    const res = await crearCategoria(nombre);
    setCategorias([...categorias, res.data]);
    return res.data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (categoriasSeleccionadas.length === 0) {
      setError('Selecciona al menos una categoría');
      return;
    }

    try {
      await crearEjercicio({
        nombre,
        descripcion,
        imagen,
        id_usuario: usuario!.id_usuario,
        ids_categorias: categoriasSeleccionadas.map((c) => c.id_categoria),
      });
      setExito(true);
    } catch (err) {
      setError('Error al crear el ejercicio');
    }
  };

  if (exito) {
    return (
      <PaginaExito
        titulo="¡Ejercicio creado!"
        mensaje={`Ya tienes "${nombre}" disponible en Mis ejercicios.`}
        botones={[
          { texto: 'Crear otro ejercicio', ruta: '/ejercicios/crear', estilo: 'primario' },
          { texto: 'Ver ejercicios', ruta: '/ejercicios', estilo: 'secundario' },
        ]}
      />
    );
  }

  return (
    <Layout>
      <div style={{ paddingBottom: '80px' }}>
        <h2 className="fw-bold mb-4">Crea un ejercicio</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="w-50 pe-4">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control rounded-0"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Categorías</label>
                <CategoriaSelector
                  categorias={categorias}
                  seleccionadas={categoriasSeleccionadas}
                  onChange={setCategoriasSeleccionadas}
                  onCrear={handleCrearCategoria}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control rounded-0"
                  rows={5}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="w-50 d-flex justify-content-center pt-4">
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{
                  width: '250px',
                  height: '200px',
                  backgroundColor: '#e9e9e9',
                  border: '1px solid #ccc',
                }}
              >
                <p className="text-muted mb-1">Sube una imagen</p>
                <p className="text-muted">o arrástrala</p>
                <input
                  type="text"
                  className="form-control rounded-0 mt-2"
                  placeholder="Ruta de imagen..."
                  value={imagen}
                  onChange={(e) => setImagen(e.target.value)}
                  style={{ width: '200px', fontSize: '0.8rem' }}
                />
              </div>
            </div>
          </div>

          <BarraAcciones
            onCancelar={() => navigate('/ejercicios')}
          />
        </form>
      </div>
    </Layout>
  );
}

export default CrearEjercicio;