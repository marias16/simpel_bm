interface CardProps {
  titulo: string;
  subtitulo?: string;
  imagen?: string;
  color?: string;
  onClick?: () => void;
}

function Card({ titulo, subtitulo, imagen, color, onClick }: CardProps) {
  return (
    <div
      className="card rounded-0"
      style={{ width: '400px', height:'500px', cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <div
        style={{
          height: '70%',
          backgroundColor: color || '#e9e9e9',
          backgroundImage: imagen ? `url(${imagen})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="card-body py-2"
        style={{ borderTop: '0.5px solid rgba(0, 0, 0, 0.125)'}}>
        <p className="fw-bold mb-1" style={{ fontSize: '2rem', paddingTop: '5%'}}>{titulo}</p>
        {subtitulo && (
          <small className="text-muted" style={{ fontSize: '1.2rem'}} >{subtitulo}</small>
        )}
      </div>
    </div>
  );
}

export default Card;