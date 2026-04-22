import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { getSesionesByUsuario, getSesionesPrueba } from '../services/sesionService';
import { toggleFavorita } from '../services/sesionService';

function Sesiones() {
  const [sesiones, setSesiones] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('todas');
  const [categoriaSesion, setCategoriaSesion] = useState('')
  const [sesionesPrueba, setSesionesPrueba] = useState<any[]>([]);
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      const res = await getSesionesByUsuario(usuario!.id_usuario);
      setSesiones(res.data);
      const resPrueba = await getSesionesPrueba();
      setSesionesPrueba(resPrueba.data);
    };
    cargar();
  }, [usuario]);

const sesionesFiltradas = (() => {
  let fuente;
  if (filtro === 'prueba') {
    fuente = sesionesPrueba;
  } else if (filtro === 'todas') {
    const ids = sesiones.map((s: any) => s.id_sesion);
    const pruebasExternas = sesionesPrueba.filter((s: any) => !ids.includes(s.id_sesion));
    fuente = [...sesiones, ...pruebasExternas];
  } else {
    fuente = sesiones;
  }

  return fuente.filter((s) => {
    const coincideBusqueda = s.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSesion ? s.categoria_sesion == categoriaSesion : true;

    if (filtro === 'prueba') return coincideBusqueda && coincideCategoria;
    if (filtro === 'favoritas') return coincideBusqueda && coincideCategoria && s.favorita;
    if (filtro === 'asignadas') return coincideBusqueda && coincideCategoria && s.sesiones_agendadas?.length > 0;
    if (filtro === 'no_asignadas') return coincideBusqueda && coincideCategoria && (!s.sesiones_agendadas || s.sesiones_agendadas.length === 0);
    return coincideBusqueda && coincideCategoria;
  });
})();

const tabs = [
  { label: 'Todas', valor: 'todas' },
  { label: 'Agendadas', valor: 'asignadas' },
  { label: 'De prueba', valor: 'prueba' },
  { label: 'Favoritas', valor: 'favoritas' },
  { label: 'No agendadas', valor: 'no_asignadas' },
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

      <div className="d-flex gap-3 mb-3 w-50">
        <input
          type="text"
          className="form-control rounded-0"
          placeholder="Busca por título..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{width:"70%"}}
        />
        <select
          className="form-select rounded-0"
          value={categoriaSesion}
          onChange={(e) => setCategoriaSesion(e.target.value)}
          style={{width:"30%"}}
          required
          >
          <option value="">Categoría</option>
          <option value="Ataque">Ataque</option>
          <option value="Defensa">Defensa</option>
          <option value="Contrataque">Contrataque</option>
          <option value="Mixto">Mixto</option>
          <option value="Otra">Otra</option>
        </select>
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
                favorita={s.prueba ? undefined : s.favorita}
                  onFavorita={s.prueba ? undefined : async () => {
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