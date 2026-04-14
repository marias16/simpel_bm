import Card from './Card';

interface EquipoCardProps {
  equipo: any;
  onClick: () => void;
}

function EquipoCard({ equipo, onClick }: EquipoCardProps) {
  return (
    <Card
      titulo={`${equipo.genero} ${equipo.categoria} ${equipo.letra}`}
      color={equipo.color}
      onClick={onClick}
    />
  );
}

export default EquipoCard;