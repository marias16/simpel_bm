import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import FormularioEquipo from '../components/FormularioEquipo';
import { getEquipo } from '../services/equipoService';
import { getHorariosByEquipo } from '../services/horarioService';
import api from '../services/api';

function EditarEquipo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipo, setEquipo] = useState<any>(null);
  const [horarios, setHorarios] = useState<any[]>([]);

  useEffect(() => {
    const cargar = async () => {
      const resEquipo = await getEquipo(+id!);
      setEquipo(resEquipo.data);
      const resHorarios = await getHorariosByEquipo(+id!);
      setHorarios(resHorarios.data);
    };
    cargar();
  }, [id]);

  if (!equipo) return <Layout><p>Cargando...</p></Layout>;

  return (
    <Layout>
      <div style={{ paddingBottom: '80px' }}>
        <FormularioEquipo
          titulo="Editar equipo"
          textoConfirmar="Guardar"
          equipoInicial={equipo}
          horariosIniciales={horarios}
          rutaCancelar={`/equipos/${id}`}
          onSubmit={async (data) => {
            await api.patch(`/equipos/${id}`, data);
            return +id!;
          }}
          onSuccess={() => navigate(`/equipos/${id}`)}
        />
      </div>
    </Layout>
  );
}

export default EditarEquipo;