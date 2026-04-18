import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipoSesion } from './equipo-sesion.entity';
import { Equipo } from '../equipo/equipo.entity';
import { Sesion } from '../sesiones/sesion.entity';

@Injectable()
export class EquipoSesionService {
  constructor(
    @InjectRepository(EquipoSesion)
    private equipoSesionRepository: Repository<EquipoSesion>,
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
    @InjectRepository(Sesion)
    private sesionRepository: Repository<Sesion>,
  ) {}

  async crear(fecha: string, hora_inicio: string, hora_fin: string, id_equipo: number, id_sesion: number) {
    const equipo = await this.equipoRepository.findOne({ where: { id_equipo } });
    if (!equipo) throw new NotFoundException('Equipo no encontrado');

    const sesion = await this.sesionRepository.findOne({ where: { id_sesion } });
    if (!sesion) throw new NotFoundException('Sesión no encontrada');

    const registro = this.equipoSesionRepository.create({
      fecha,
      hora_inicio,
      hora_fin,
      equipo,
      sesion,
    });
    return this.equipoSesionRepository.save(registro);
  }

  async findOne(id: number) {
    const registro = await this.equipoSesionRepository.findOne({
      where: { id_equipo_sesion: id },
      relations: ['sesion', 'equipo', 'equipo.club'],
    });
    if (!registro) throw new NotFoundException('Sesión agendada no encontrada');
    return registro;
  }

  async findByEquipo(id_equipo: number) {
    return this.equipoSesionRepository.find({
      where: { equipo: { id_equipo } },
      relations: ['sesion', 'equipo'],
    });
  }

  async findAll() {
    return this.equipoSesionRepository.find({
      relations: ['sesion', 'sesion.sesion_ejercicio', 'sesion.sesion_ejercicio.ejercicio', 'equipo', 'equipo.club'],
    });
  }

  async actualizar(id: number, data: any) {
    const registro = await this.findOne(id);
    if (data.fecha) registro.fecha = data.fecha;
    if (data.hora_inicio) registro.hora_inicio = data.hora_inicio;
    if (data.hora_fin) registro.hora_fin = data.hora_fin;

    if (data.id_equipo) {
      const equipo = await this.equipoRepository.findOne({ where: { id_equipo: data.id_equipo } });
      if (equipo) registro.equipo = equipo;
  }

  return this.equipoSesionRepository.save(registro);
  }

  async eliminar(id: number) {
    const registro = await this.equipoSesionRepository.findOne({
      where: { id_equipo_sesion: id },
    });
    if (!registro) throw new NotFoundException('Sesión agendada no encontrada');
    return this.equipoSesionRepository.remove(registro);
  }
}