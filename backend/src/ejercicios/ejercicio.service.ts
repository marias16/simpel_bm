import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Ejercicio } from './ejercicio.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';

@Injectable()
export class EjerciciosService {
  constructor(
    @InjectRepository(Ejercicio)
    private ejercicioRepository: Repository<Ejercicio>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async crear(nombre: string, descripcion: string, imagen: string, id_usuario: number, ids_categorias: number[]) {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const categorias = await this.categoriaRepository.find({
      where: { id_categoria: In(ids_categorias) },
    });

    const ejercicio = this.ejercicioRepository.create({
      nombre,
      descripcion,
      imagen,
      usuario_creador: usuario,
      categorias,
    });
    return this.ejercicioRepository.save(ejercicio);
  }

  async findAll() {
    return this.ejercicioRepository.find({ relations: ['categorias', 'usuario_creador'] });
  }

  async findOne(id: number) {
    const ejercicio = await this.ejercicioRepository.findOne({
      where: { id_ejercicio: id },
      relations: ['categorias', 'usuario_creador'],
    });
    if (!ejercicio) throw new NotFoundException('Ejercicio no encontrado');
    return ejercicio;
  }

  async eliminar(id: number) {
    const ejercicio = await this.findOne(id);
    return this.ejercicioRepository.remove(ejercicio);
  }
}