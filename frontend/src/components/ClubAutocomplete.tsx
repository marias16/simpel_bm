import { useState, useEffect, useRef } from 'react';

interface ClubAutocompleteProps {
  clubs: any[];
  onSelect: (id_club: number | null, nombre: string) => void;
  valorInicial?: string;
}

function ClubAutocomplete({ clubs, onSelect, valorInicial = '' }: ClubAutocompleteProps) {
  const [texto, setTexto] = useState(valorInicial);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTexto(valorInicial);
  }, [valorInicial]);

  const sugerencias = clubs.filter((club) =>
    club.nombre.toLowerCase().includes(texto.toLowerCase())
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

  const handleChange = (valor: string) => {
    setTexto(valor);
    setMostrarSugerencias(true);
    const clubExistente = clubs.find(
      (c) => c.nombre.toLowerCase() === valor.toLowerCase()
    );
    if (clubExistente) {
      onSelect(clubExistente.id_club, clubExistente.nombre);
    } else {
      onSelect(null, valor);
    }
  };

  const handleSeleccionar = (club: any) => {
    setTexto(club.nombre);
    setMostrarSugerencias(false);
    onSelect(club.id_club, club.nombre);
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <input
        type="text"
        className="form-control rounded-0"
        placeholder="Selecciona o crea uno..."
        value={texto}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setMostrarSugerencias(true)}
      />
      {mostrarSugerencias && texto && sugerencias.length > 0 && (
        <div
          className="border bg-white w-100"
          style={{ position: 'absolute', zIndex: 10, maxHeight: '150px', overflowY: 'auto' }}
        >
          {sugerencias.map((club: any) => (
            <div
              key={club.id_club}
              className="p-2"
              style={{ cursor: 'pointer' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              onClick={() => handleSeleccionar(club)}
            >
              {club.nombre}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClubAutocomplete;