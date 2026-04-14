import { useState } from 'react';
import Layout from '../components/Layout';
import FormularioEquipo from '../components/FormularioEquipo';
import PaginaExito from '../components/PaginaExito';
import { crearEquipo } from '../services/equipoService';

function CrearEquipo() {
  const [exito, setExito] = useState(false);

  if (exito) {
    return (
      <PaginaExito
        titulo="¡Equipo creado!"
        mensaje='Tu equipo está disponible en "Mis equipos". Empieza a planificar.'
        botones={[
          { texto: 'Explora sesiones', ruta: '/sesiones', estilo: 'primario' },
          { texto: 'Ve a Mis Equipos', ruta: '/equipos', estilo: 'secundario' },
        ]}
      />
    );
  }

  return (
    <Layout>
      <div style={{ paddingBottom: '80px' }}>
        <FormularioEquipo
            titulo="Crea un equipo"
            textoConfirmar="Crear"
            rutaCancelar="/equipos"
            onSubmit={async (data) => {
                const res = await crearEquipo(data);
                return res.data.id_equipo;
            }}
            onSuccess={() => setExito(true)}
        />
      </div>
    </Layout>
  );
}

export default CrearEquipo;