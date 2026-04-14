import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getClubs, crearClub } from '../services/clubService';
import { crearHorario, eliminarHorario, getHorariosByEquipo } from '../services/horarioService';
import ColorPicker from './ColorPicker';
import ClubAutocomplete from './ClubAutocomplete';
import BarraAcciones from './BarraAcciones';

interface FormularioEquipoProps {
  titulo: string;
  textoConfirmar: string;
  equipoInicial?: any;
  horariosIniciales?: any[];
  onSubmit: (data: {
    categoria: string;
    letra: string;
    genero: string;
    color: string;
    id_club: number;
    id_usuario: number;
  }) => Promise<number>;
  rutaCancelar: string;
  onSuccess?: () => void;
}


function FormularioEquipo({
  titulo,
  textoConfirmar,
  equipoInicial,
  horariosIniciales,
  onSubmit,
  rutaCancelar,
  onSuccess,
}: FormularioEquipoProps) {
  const [clubs, setClubs] = useState<any[]>([]);
  const [clubId, setClubId] = useState<number | null>(equipoInicial?.club?.id_club || null);
  const [clubNombre, setClubNombre] = useState(equipoInicial?.club?.nombre || '');
  const [categoria, setCategoria] = useState(equipoInicial?.categoria || '');
  const [genero, setGenero] = useState(equipoInicial?.genero || '');
  const [letra, setLetra] = useState(equipoInicial?.letra || '');
  const [color, setColor] = useState(equipoInicial?.color || '#4A90D9');
  const [horarios, setHorarios] = useState<{ id?: number; dia_semana: string; hora_inicio: string; hora_fin: string }[]>(
    horariosIniciales?.map((h: any) => ({
      id: h.id_horario,
      dia_semana: h.dia_semana,
      hora_inicio: h.hora_inicio,
      hora_fin: h.hora_fin,
    })) || []
  );
  const [horariosEliminados, setHorariosEliminados] = useState<number[]>([]);
  const [error, setError] = useState('');
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const cargarClubs = async () => {
      const res = await getClubs();
      setClubs(res.data);
    };
    cargarClubs();
  }, []);

  useEffect(() => {
  if (horariosIniciales) {
    setHorarios(
      horariosIniciales.map((h: any) => ({
        id: h.id_horario,
        dia_semana: h.dia_semana,
        hora_inicio: h.hora_inicio,
        hora_fin: h.hora_fin,
      }))
    );
  }
}, [horariosIniciales]);

  const addHorario = () => {
    setHorarios([...horarios, { dia_semana: 'Lunes', hora_inicio: '18:00', hora_fin: '19:00' }]);
  };

  const updateHorario = (index: number, field: string, value: string) => {
    const nuevos = [...horarios];
    nuevos[index] = { ...nuevos[index], [field]: value };
    setHorarios(nuevos);
  };

  const removeHorario = (index: number) => {
    const horario = horarios[index];
    if (horario.id) {
      setHorariosEliminados([...horariosEliminados, horario.id]);
    }
    setHorarios(horarios.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let id_club: number;
      if (clubId) {
        id_club = clubId;
      } else if (clubNombre) {
        const resClub = await crearClub(clubNombre);
        id_club = resClub.data.id_club;
      } else {
        setError('Selecciona o escribe un club');
        return;
      }

      const id_equipo = await onSubmit({
        categoria,
        letra,
        genero,
        color,
        id_club,
        id_usuario: usuario!.id_usuario,
      });

      
      //eliminar un horario
      for (const id of horariosEliminados) {
        await eliminarHorario(id);
      }

      //eliminar todos los horarios
      for (const horario of horarios) {
        if (horario.id) {
          await eliminarHorario(horario.id);
        }
      }

      //crear horario
      for (const horario of horarios) {
        await crearHorario({
          dia_semana: horario.dia_semana,
          hora_inicio: horario.hora_inicio,
          hora_fin: horario.hora_fin,
          id_equipo,
        });
      }

    
    if (onSuccess) onSuccess();


      return id_equipo;
    } catch (err) {
      setError('Error al guardar el equipo');
      return 0;
    }
  };

  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const categorias = ['Prebenjamín', 'Benjamín', 'Alevín', 'Infantil', 'Cadete', 'Juvenil', 'Sénior'];

  return (
    <>
      <h2 className="fw-bold mb-4">{titulo}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <div className="w-50 pe-4">
            <div className="mb-3">
              <label className="form-label">Club</label>
              <ClubAutocomplete
                clubs={clubs}
                onSelect={(id, nombre) => { setClubId(id); setClubNombre(nombre); }}
                valorInicial={equipoInicial?.club?.nombre || ''}
                />
            </div>

            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select
                className="form-select rounded-0"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Género</label>
              <select
                className="form-select rounded-0"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                required
              >
                <option value="">Selecciona género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Mixto">Mixto</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Letra</label>
              <input
                type="text"
                className="form-control rounded-0"
                placeholder="A, B, C..."
                value={letra}
                onChange={(e) => setLetra(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Horario</label>
              {horarios.map((h, i) => (
                <div key={i} className="d-flex gap-2 mb-2 align-items-center">
                  <select
                    className="form-select rounded-0"
                    value={h.dia_semana}
                    onChange={(e) => updateHorario(i, 'dia_semana', e.target.value)}
                  >
                    {dias.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <input
                    type="time"
                    className="form-control rounded-0"
                    value={h.hora_inicio}
                    onChange={(e) => updateHorario(i, 'hora_inicio', e.target.value)}
                  />
                  <input
                    type="time"
                    className="form-control rounded-0"
                    value={h.hora_fin}
                    onChange={(e) => updateHorario(i, 'hora_fin', e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm rounded-0"
                    onClick={() => removeHorario(i)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-dark btn-sm rounded-0"
                onClick={addHorario}
              >
                + Añadir horario
              </button>
            </div>
          </div>

          <div className="w-50 d-flex justify-content-center pt-4">
            <div style={{ width: '250px' }}>
              <ColorPicker color={color} onChange={setColor} />
            </div>
          </div>
        </div>

        <BarraAcciones
          onCancelar={() => navigate(rutaCancelar)}
          textoConfirmar={textoConfirmar}
        />
      </form>
    </>
  );
}

export default FormularioEquipo;