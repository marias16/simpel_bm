import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { getEquiposByUsuario, eliminarEquipo } from '../services/equipoService';
import EquipoCard from '../components/EquipoCard';

function Equipos() {
  const [equipos, setEquipos] = useState<any[]>([]);
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const cargarEquipos = async () => {
        try {
            const res = await getEquiposByUsuario(usuario!.id_usuario);
            setEquipos(res.data);
        } catch (err) {
            console.error('Error al cargar equipos', err);
        }
    };

  useEffect(() => {
    cargarEquipos();
  }, []);

  const equiposPorClub = equipos.reduce((acc: any, equipo: any) => {
    const clubNombre = equipo.club?.nombre || 'Sin club';
    if (!acc[clubNombre]) acc[clubNombre] = [];
    acc[clubNombre].push(equipo);
    return acc;
  }, {});

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Mis equipos</h2>
        <button
          className="btn btn-dark rounded-0"
          onClick={() => navigate('/equipos/crear')}
        >
          Crea un equipo
        </button>
      </div>

      {equipos.length === 0 ? (
        <p className="text-muted">No tienes equipos todavía.</p>
      ) : (
        Object.entries(equiposPorClub).map(([clubNombre, clubEquipos]: [string, any]) => (
          <div key={clubNombre} className="mb-4">
            <h4 className="fw-bold mb-1">{clubNombre}</h4>
            <hr className="mt-0 mb-3" />
            <div className="d-flex flex-wrap gap-3">
              {clubEquipos.map((equipo: any) => (
                <EquipoCard
                  key={equipo.id_equipo}
                  equipo={equipo}
                  onClick={() => navigate(`/equipos/${equipo.id_equipo}`)}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </Layout>
  );
}

export default Equipos;