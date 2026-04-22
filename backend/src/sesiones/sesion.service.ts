import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sesion } from './sesion.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Injectable()
export class SesionesService {
  constructor(
    @InjectRepository(Sesion)
    private sesionRepository: Repository<Sesion>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async crear(
    nombre: string,
    descripcion: string,
    categoria_sesion: string,
    comentarios: string,
    favorita: boolean,
    prueba: boolean,
    id_usuario: number,
  ) {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const sesion = this.sesionRepository.create({
      nombre,
      descripcion,
      categoria_sesion,
      comentarios,
      favorita,
      prueba,
      usuario_creador: usuario,
    });
    return this.sesionRepository.save(sesion);
  }

  async findAll() {
    return this.sesionRepository.find({ relations: ['usuario_creador'] });
  }

  async findOne(id: number) {
    const sesion = await this.sesionRepository.findOne({
      where: { id_sesion: id },
      relations: ['usuario_creador'],
    });
    if (!sesion) throw new NotFoundException('Sesión no encontrada');
    return sesion;
  }

  async findPruebas() {
  return this.sesionRepository.find({
    where: { prueba: true },
    relations: ['usuario_creador', 'sesiones_agendadas', 'sesion_ejercicio', 'sesion_ejercicio.ejercicio'],
  });
}

async findByUsuario(id_usuario: number) {
  return this.sesionRepository.find({
    where: { usuario_creador: { id_usuario } },
    relations: ['usuario_creador', 'sesiones_agendadas', 'sesion_ejercicio', 'sesion_ejercicio.ejercicio'],
  });
}



async actualizar(id: number, data: any) {
  const sesion = await this.findOne(id);
  if (data.nombre) sesion.nombre = data.nombre;
  if (data.descripcion !== undefined) sesion.descripcion = data.descripcion;
  if (data.categoria_sesion) sesion.categoria_sesion = data.categoria_sesion;
  if (data.comentarios !== undefined) sesion.comentarios = data.comentarios;
  if (data.favorita !== undefined) sesion.favorita = data.favorita;
  if (data.prueba !== undefined) sesion.prueba = data.prueba;
  return this.sesionRepository.save(sesion);
}

async toggleFavorita(id: number) {
  const sesion = await this.findOne(id);
  sesion.favorita = !sesion.favorita;
  return this.sesionRepository.save(sesion);
}

  async eliminar(id: number) {
    const sesion = await this.findOne(id);
    return this.sesionRepository.remove(sesion);
  }
}