import api from './api';

export const crearEquipo = (data: {
  categoria: string;
  letra: string;
  genero: string;
  color: string;
  id_club: number;
  id_usuario: number;
}) => api.post('/equipos', data);

export const getEquipos = () => api.get('/equipos');
export const getEquipo = (id: number) => api.get(`/equipos/${id}`);
export const getEquiposByUsuario = (id_usuario: number) => api.get(`/equipos/usuario/${id_usuario}`);
export const eliminarEquipo = (id: number) => api.delete(`/equipos/${id}`);