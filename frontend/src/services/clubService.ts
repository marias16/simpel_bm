import api from './api';

export const crearClub = (nombre: string) => api.post('/clubs', { nombre });
export const getClubs = () => api.get('/clubs');
export const getClub = (id: number) => api.get(`/clubs/${id}`);
export const eliminarClub = (id: number) => api.delete(`/clubs/${id}`);