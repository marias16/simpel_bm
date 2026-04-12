import api from './api';

export const crearHorario = (data: {
  dia_semana: string;
  hora_inicio: string;
  hora_fin: string;
  id_equipo: number;
}) => api.post('/horarios', data);

export const getHorariosByEquipo = (id_equipo: number) => api.get(`/horarios/equipo/${id_equipo}`);
export const eliminarHorario = (id: number) => api.delete(`/horarios/${id}`);