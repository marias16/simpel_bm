import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getEquipoSesiones } from '../services/equipoSesionService';
import { getEquiposByUsuario } from '../services/equipoService';

function Calendario() {
  const [eventos, setEventos] = useState<any[]>([]);
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      const resEquipos = await getEquiposByUsuario(usuario!.id_usuario);
      const equiposUsuario = resEquipos.data;

      const resTodas = await getEquipoSesiones();
      const sesionesUsuario = resTodas.data.filter((es: any) =>
        equiposUsuario.some((eq: any) => eq.id_equipo === es.equipo?.id_equipo)
      );

      const eventosCalendario = sesionesUsuario.map((es: any) => {
        const soloFecha = es.fecha.split('T')[0];
        return {
            id: es.id_equipo_sesion.toString(),
            title: `${es.sesion?.nombre} - ${es.equipo?.categoria} ${es.equipo?.genero} ${es.equipo?.letra}`,
            start: `${soloFecha}T${es.hora_inicio}`,
            end: `${soloFecha}T${es.hora_fin}`,
            backgroundColor: es.equipo?.color || '#6c63ff',
            borderColor: es.equipo?.color || '#6c63ff',
            extendedProps: {
            id_sesion: es.sesion?.id_sesion,
            },
        };
      });

      console.log('Sesiones usuario:', sesionesUsuario);
      console.log('Eventos:', eventosCalendario);

      setEventos(eventosCalendario);
    };
    cargar();
  }, [usuario]);

  const handleEventClick = (info: any) => {
    const id_agendada = info.event.id;
    navigate(`/agendada/${id_agendada}`);
  };

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Calendario</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
        locale="es"
        firstDay={1}
        events={eventos}
        eventClick={handleEventClick}
        height="80vh"
        eventDisplay="block"

        buttonText={{
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
      }}
      />
    </Layout>
  );
}

export default Calendario;