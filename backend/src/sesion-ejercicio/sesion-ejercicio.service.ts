import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SesionEjercicio } from './sesion-ejercicio.entity';
import { Sesion } from '../sesiones/sesion.entity';
import { Ejercicio } from '../ejercicios/ejercicio.entity';

@Injectable()
export class SesionEjercicioService {
  constructor(
    @InjectRepository(SesionEjercicio)
    private sesionEjercicioRepository: Repository<SesionEjercicio>,
    @InjectRepository(Sesion)
    private sesionRepository: Repository<Sesion>,
    @InjectRepository(Ejercicio)
    private ejercicioRepository: Repository<Ejercicio>,
  ) {}

  async crear(id_sesion: number, id_ejercicio: number, orden: number) {
    const sesion = await this.sesionRepository.findOne({ where: { id_sesion } });
    if (!sesion) throw new NotFoundException('Sesión no encontrada');

    const ejercicio = await this.ejercicioRepository.findOne({ where: { id_ejercicio } });
    if (!ejercicio) throw new NotFoundException('Ejercicio no encontrado');

    const registro = this.sesionEjercicioRepository.create({
      sesion,
      ejercicio,
      orden,
    });
    return this.sesionEjercicioRepository.save(registro);
  }

  async findBySesion(id_sesion: number) {
    return this.sesionEjercicioRepository.find({
      where: { sesion: { id_sesion } },
      relations: ['ejercicio'],
      order: { orden: 'ASC' },
    });
  }

  async eliminar(id: number) {
    const registro = await this.sesionEjercicioRepository.findOne({
      where: { id_sesion_ejercicio: id },
    });
    if (!registro) throw new NotFoundException('Registro no encontrado');
    return this.sesionEjercicioRepository.remove(registro);
  }
}