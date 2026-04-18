import api from './api';

export const crearSesion = (data: {
  nombre: string;
  descripcion: string;
  categoria_sesion: string;
  comentarios: string;
  favorita: boolean;
  prueba: boolean;
  id_usuario: number;
}) => api.post('/sesiones', data);

export const getSesiones = () => api.get('/sesiones');
export const getSesion = (id: number) => api.get(`/sesiones/${id}`);
export const getSesionesByUsuario = (id_usuario: number) => api.get(`/sesiones/usuario/${id_usuario}`);
export const actualizarSesion = (id: number, data: any) => api.patch(`/sesiones/${id}`, data);
export const toggleFavorita = (id: number) => api.patch(`/sesiones/${id}/favorita`);
export const eliminarSesion = (id: number) => api.delete(`/sesiones/${id}`);