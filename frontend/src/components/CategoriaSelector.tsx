import { useState, useEffect, useRef } from 'react';

interface CategoriaSelectorProps {
  categorias: any[];
  seleccionadas: any[];
  onChange: (seleccionadas: any[]) => void;
  onCrear: (nombre: string) => Promise<any>;
}

function CategoriaSelector({ categorias, seleccionadas, onChange, onCrear }: CategoriaSelectorProps) {
  const [texto, setTexto] = useState('');
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const sugerencias = categorias.filter(
    (cat) =>
      cat.nombre.toLowerCase().includes(texto.toLowerCase()) &&
      !seleccionadas.some((s) => s.id_categoria === cat.id_categoria)
  );

  const esNueva = texto && !categorias.some(
    (c) => c.nombre.toLowerCase() === texto.toLowerCase()
  );

  useEffect(() => {
    const handleClickFuera = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMostrarSugerencias(false);
      }
    };
    document.addEventListener('mousedown', handleClickFuera);
    return () => document.removeEventListener('mousedown', handleClickFuera);
  }, []);

  const handleSeleccionar = (cat: any) => {
    onChange([...seleccionadas, cat]);
    setTexto('');
    setMostrarSugerencias(false);
  };

  const handleCrear = async () => {
    const nueva = await onCrear(texto);
    onChange([...seleccionadas, nueva]);
    setTexto('');
    setMostrarSugerencias(false);
  };

  const handleEliminar = (id: number) => {
    onChange(seleccionadas.filter((s) => s.id_categoria !== id));
  };

  return (
    <div ref={ref}>
      <div className="d-flex flex-wrap gap-1 mb-2">
        {seleccionadas.map((cat) => (
          <span
            key={cat.id_categoria}
            className="badge bg-dark d-flex align-items-center gap-1"
            style={{ fontSize: '0.85rem' }}
          >
            {cat.nombre}
            <span
              style={{ cursor: 'pointer', marginLeft: '4px' }}
              onClick={() => handleEliminar(cat.id_categoria)}
            >
              ✕
            </span>
          </span>
        ))}
      </div>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          className="form-control rounded-0"
          placeholder="Selecciona o crea una..."
          value={texto}
          onChange={(e) => { setTexto(e.target.value); setMostrarSugerencias(true); }}
          onFocus={() => setMostrarSugerencias(true)}
        />
        {mostrarSugerencias && texto && (
          <div
            className="border bg-white w-100"
            style={{ position: 'absolute', zIndex: 10, maxHeight: '150px', overflowY: 'auto' }}
          >
            {sugerencias.map((cat) => (
              <div
                key={cat.id_categoria}
                className="p-2"
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                onClick={() => handleSeleccionar(cat)}
              >
                {cat.nombre}
              </div>
            ))}
            {esNueva && (
              <div
                className="p-2 fw-bold"
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                onClick={handleCrear}
              >
                + Crear "{texto}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriaSelector;