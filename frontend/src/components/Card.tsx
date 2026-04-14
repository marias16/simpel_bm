interface CardProps {
  titulo: string;
  subtitulo?: string;
  imagen?: string;
  imagenes?: string[];
  color?: string;
  onClick?: () => void;
  seleccionada?: boolean;
  favorita?: boolean;
  onFavorita?: (e: React.MouseEvent) => void;
}

function Card({ titulo, subtitulo, imagen, imagenes, color, onClick, seleccionada, favorita, onFavorita }: CardProps) {

    const renderImagen = () => {
    if (imagenes && imagenes.length > 0) {
        return (
        <div style={{
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '10%',
            padding: '10%',
            backgroundColor: '#e9e9e9',
        }}>
            {[0, 1, 2, 3].map((i) => (
            <div
                key={i}
                style={{
                backgroundImage: imagenes[i] ? `url(${imagenes[i]})` : 'none',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundColor: imagenes[i] ? 'white' : '#d0d0d0',
                }}
            />
            ))}
        </div>
        );
    }

    return (
        <div
        style={{
            height: '100%',
            backgroundColor: color || '#e9e9e9',
            backgroundImage: imagen ? `url(${imagen})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        />
    );
    };
  return (
    <div
      className={`card ${seleccionada ? 'rounded' : 'rounded-0'}`}
      style={{
        width: '400px',
        height: '500px',
        cursor: onClick ? 'pointer' : 'default',
        border: seleccionada ? '2px solid #6c63ff' : undefined,
        boxShadow: seleccionada ? '0 4px 12px rgba(108, 99, 255, 0.3)' : undefined,
      }}
      onClick={onClick}
    >
      <div style={{ height: '70%', position: 'relative' }}>
        {renderImagen()}
        {onFavorita && (
          <span
            onClick={(e) => { e.stopPropagation(); onFavorita(e); }}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              cursor: 'pointer',
              fontSize: '3rem',
            }}
          >
            {favorita ? '♥' : '♡'}
          </span>
        )}
      </div>
      <div className="card-body py-2"
        style={{ borderTop: '0.5px solid rgba(0, 0, 0, 0.125)' }}>
        <p className="fw-bold mb-1" style={{ fontSize: '1.3rem', paddingTop: '5%' }}>{titulo}</p>
        {subtitulo && (
          <small className="text-muted" style={{ fontSize: '1rem' }}>{subtitulo}</small>
        )}
      </div>
    </div>
  );
}

export default Card;