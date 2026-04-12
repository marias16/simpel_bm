interface EquipoCardProps {
  equipo: any;
  onClick: () => void;
}

function EquipoCard({ equipo, onClick }: EquipoCardProps) {
  return (
    <div
      className="card rounded-0"
      style={{ width: '200px', cursor: 'pointer' }}
      onClick={onClick}
    >
      <div
        style={{
          height: '150px',
          backgroundColor: equipo.color || '#ccc',
        }}
      />
      <div className="card-body text-center py-2">
        <p className="mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>
          {equipo.genero} {equipo.categoria} {equipo.letra}
        </p>
      </div>
    </div>
  );
}

export default EquipoCard;