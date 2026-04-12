import api from './api';

export const crearEquipoSesion = (data: {
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  id_equipo: number;
  id_sesion: number;
}) => api.post('/equipo-sesion', data);

export const getEquipoSesiones = () => api.get('/equipo-sesion');
export const getEquipoSesionesByEquipo = (id_equipo: number) => api.get(`/equipo-sesion/equipo/${id_equipo}`);
export const eliminarEquipoSesion = (id: number) => api.delete(`/equipo-sesion/${id}`);