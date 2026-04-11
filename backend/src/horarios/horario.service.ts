import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Horario } from './horario.entity';
import { Equipo } from '../equipo/equipo.entity';

@Injectable()
export class HorariosService {
  constructor(
    @InjectRepository(Horario)
    private horarioRepository: Repository<Horario>,
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
  ) {}

  async crear(dia_semana: string, hora_inicio: string, hora_fin: string, id_equipo: number) {
    const equipo = await this.equipoRepository.findOne({ where: { id_equipo } });
    if (!equipo) throw new NotFoundException('Equipo no encontrado');

    const horario = this.horarioRepository.create({
      dia_semana,
      hora_inicio,
      hora_fin,
      equipo,
    });
    return this.horarioRepository.save(horario);
  }

  async findByEquipo(id_equipo: number) {
    return this.horarioRepository.find({
      where: { equipo: { id_equipo } },
      relations: ['equipo'],
    });
  }

  async eliminar(id: number) {
    const horario = await this.horarioRepository.findOne({ where: { id_horario: id } });
    if (!horario) throw new NotFoundException('Horario no encontrado');
    return this.horarioRepository.remove(horario);
  }
}