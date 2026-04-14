import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import BarraAcciones from '../components/BarraAcciones';
import CategoriaSelector from '../components/CategoriaSelector';
import { getEjercicio } from '../services/ejercicioService';
import { getCategorias, crearCategoria } from '../services/categoriaService';
import api from '../services/api';

function EditarEjercicio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [categorias, setCategorias] = useState<any[]>([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargar = async () => {
      const resEj = await getEjercicio(+id!);
      const ej = resEj.data;
      setNombre(ej.nombre);
      setDescripcion(ej.descripcion);
      setImagen(ej.imagen || '');
      setCategoriasSeleccionadas(ej.categorias || []);

      const resCat = await getCategorias();
      setCategorias(resCat.data);
    };
    cargar();
  }, [id]);

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
      await api.patch(`/ejercicios/${id}`, {
        nombre,
        descripcion,
        imagen,
        ids_categorias: categoriasSeleccionadas.map((c) => c.id_categoria),
      });
      navigate(`/ejercicios/${id}`);
    } catch (err) {
      setError('Error al guardar el ejercicio');
    }
  };

  return (
    <Layout>
      <div style={{ paddingBottom: '80px' }}>
        <h2 className="fw-bold mb-4">Editar ejercicio</h2>
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
              <div>
                <div
                  style={{
                    width: '250px',
                    height: '200px',
                    backgroundColor: '#e9e9e9',
                    backgroundImage: imagen ? `url(${imagen})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid #ccc',
                    marginBottom: '8px',
                  }}
                />
                <input
                  type="text"
                  className="form-control rounded-0"
                  placeholder="Ruta de imagen..."
                  value={imagen}
                  onChange={(e) => setImagen(e.target.value)}
                  style={{ width: '250px', fontSize: '0.8rem' }}
                />
              </div>
            </div>
          </div>

          <BarraAcciones
            onCancelar={() => navigate(`/ejercicios/${id}`)}
            textoConfirmar="Guardar"
          />
        </form>
      </div>
    </Layout>
  );
}

export default EditarEjercicio;