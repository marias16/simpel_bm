import api from './api';

export const crearSesionEjercicio = (data: {
  id_sesion: number;
  id_ejercicio: number;
  orden: number;
}) => api.post('/sesion-ejercicio', data);

export const getEjerciciosBySesion = (id_sesion: number) => api.get(`/sesion-ejercicio/sesion/${id_sesion}`);
export const eliminarSesionEjercicio = (id: number) => api.delete(`/sesion-ejercicio/${id}`);