import api from './api';

export const crearEjercicio = (data: {
  nombre: string;
  descripcion: string;
  imagen: string;
  id_usuario: number;
  ids_categorias: number[];
}) => api.post('/ejercicios', data);

export const getEjercicios = () => api.get('/ejercicios');
export const getEjercicio = (id: number) => api.get(`/ejercicios/${id}`);
export const eliminarEjercicio = (id: number) => api.delete(`/ejercicios/${id}`);