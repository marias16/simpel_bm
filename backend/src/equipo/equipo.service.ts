import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from './equipo.entity';
import { Club } from '../clubs/club.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>,
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async crear(categoria: string, letra: string, genero: string, color:string, id_club: number, id_usuario: number) {
    
    const club = await this.clubRepository.findOne({ where: { id_club } });
    if (!club) throw new NotFoundException('Club no encontrado');

    
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const equipo = this.equipoRepository.create({
      categoria,
      letra,
      genero,
      color,
      club,
      usuario_creador: usuario,
    });
    return this.equipoRepository.save(equipo);
  }

  async findAll() {
    return this.equipoRepository.find({ relations: ['club', 'usuario_creador'] });
  }

  async findOne(id: number) {
    const equipo = await this.equipoRepository.findOne({
      where: { id_equipo: id },
      relations: ['club', 'usuario_creador'],
    });
    if (!equipo) throw new NotFoundException('Equipo no encontrado');
    return equipo;
  }

  async findByUsuario(id_usuario: number) {
  return this.equipoRepository.find({
    where: { usuario_creador: { id_usuario } },
    relations: ['club', 'usuario_creador'],
  });
}

  async eliminar(id: number) {
    const equipo = await this.findOne(id);
    return this.equipoRepository.remove(equipo);
  }
}