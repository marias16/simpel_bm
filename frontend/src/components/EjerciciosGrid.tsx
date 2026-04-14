import { useState, useEffect } from 'react';
import Card from './Card';
import { getEjercicios } from '../services/ejercicioService';
import { getCategorias } from '../services/categoriaService';

interface EjerciciosGridProps {
  onClickEjercicio: (ejercicio: any) => void;
  seleccionados?: any[];
}

function EjerciciosGrid({ onClickEjercicio, seleccionados }: EjerciciosGridProps) {
  const [ejercicios, setEjercicios] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  useEffect(() => {
    const cargar = async () => {
      const resEj = await getEjercicios();
      setEjercicios(resEj.data);
      const resCat = await getCategorias();
      setCategorias(resCat.data);
    };
    cargar();
  }, []);

  const ejerciciosFiltrados = ejercicios.filter((ej) => {
    const coincideNombre = ej.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = !categoriaFiltro || ej.categorias?.some(
      (cat: any) => cat.id_categoria === parseInt(categoriaFiltro)
    );
    return coincideNombre && coincideCategoria;
  });

  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <input
          type="text"
          className="form-control rounded-0"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
        <select
          className="form-select rounded-0"
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          <option value="">Categoría</option>
          {categorias.map((cat: any) => (
            <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre}</option>
          ))}
        </select>
      </div>

      {ejerciciosFiltrados.length === 0 ? (
        <p className="text-muted">No hay ejercicios.</p>
      ) : (
        <div className="d-flex flex-wrap gap-5">
          {ejerciciosFiltrados.map((ej: any) => (
            <Card
              key={ej.id_ejercicio}
              titulo={ej.nombre}
              subtitulo={ej.categorias?.map((c: any) => c.nombre).join(', ')}
              imagen={ej.imagen}
              seleccionada={seleccionados?.some((s) => s.id_ejercicio === ej.id_ejercicio)}
              onClick={() => onClickEjercicio(ej)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default EjerciciosGrid;