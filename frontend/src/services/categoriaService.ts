import api from './api';

export const crearCategoria = (nombre: string) => api.post('/categorias', { nombre });
export const getCategorias = () => api.get('/categorias');
export const eliminarCategoria = (id: number) => api.delete(`/categorias/${id}`);