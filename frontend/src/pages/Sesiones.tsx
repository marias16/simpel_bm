import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { getSesionesByUsuario } from '../services/sesionService';
import { toggleFavorita } from '../services/sesionService';

function Sesiones() {
  const [sesiones, setSesiones] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('todas');
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      const res = await getSesionesByUsuario(usuario!.id_usuario);
      setSesiones(res.data);
    };
    cargar();
  }, [usuario]);

const sesionesFiltradas = sesiones.filter((s) => {
  const coincideBusqueda = s.nombre.toLowerCase().includes(busqueda.toLowerCase());


  if (filtro === 'prueba') return coincideBusqueda && s.prueba;
  if (filtro === 'favoritas') return coincideBusqueda && s.favorita;
  if (filtro === 'asignadas') return coincideBusqueda && s.sesiones_agendadas?.length > 0;
  if (filtro === 'no_asignadas') return coincideBusqueda && (!s.sesiones_agendadas || s.sesiones_agendadas.length === 0);
  return coincideBusqueda;
});

const tabs = [
  { label: 'Todas', valor: 'todas' },
  { label: 'Asignadas', valor: 'asignadas' },
  { label: 'De prueba', valor: 'prueba' },
  { label: 'Favoritas', valor: 'favoritas' },
  { label: 'No asignadas', valor: 'no_asignadas' },
];

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Mis sesiones</h2>
        <button
          className="btn btn-dark rounded-0"
          onClick={() => navigate('/sesiones/crear')}
        >
          Crea una plantilla
        </button>
      </div>

      <div className="d-flex gap-3 mb-3">
        <input
          type="text"
          className="form-control rounded-0"
          placeholder="Busca por título..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ maxWidth: '300px' }}
        />
      </div>

      <div className="d-flex gap-2 mb-4">
        {tabs.map((tab) => (
          <span
            key={tab.valor}
            className={`px-3 py-1 ${filtro === tab.valor ? 'border-bottom border-dark fw-bold' : 'text-muted'}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setFiltro(tab.valor)}
          >
            {tab.label}
          </span>
        ))}
      </div>

      {sesionesFiltradas.length === 0 ? (
        <p className="text-muted">No tienes sesiones todavía.</p>
      ) : (
        <div className="d-flex flex-wrap gap-3">
          {sesionesFiltradas.map((s: any) => (
            <Card
                key={s.id_sesion}
                titulo={s.nombre}
                subtitulo={`${s.categoria_sesion} · ${s.prueba ? 'Prueba' : 'Entrenamiento'}`}
                imagenes={s.sesion_ejercicio
                ?.sort((a: any, b: any) => a.orden - b.orden)
                .slice(0, 4)
                .map((se: any) => se.ejercicio?.imagen)
                }
                favorita={s.favorita}
                onFavorita={async () => {
                await toggleFavorita(s.id_sesion);
                const res = await getSesionesByUsuario(usuario!.id_usuario);
                setSesiones(res.data);
                }}
                onClick={() => navigate(`/sesiones/${s.id_sesion}`)}
            />
            ))}
        </div>
      )}
    </Layout>
  );
}

export default Sesiones;