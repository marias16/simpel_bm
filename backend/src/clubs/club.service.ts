import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './club.entity';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {}

  async crear(nombre: string) {
    const club = this.clubRepository.create({ nombre });
    return this.clubRepository.save(club);
  }

  async findAll() {
    return this.clubRepository.find();
  }

  async findOne(id: number) {
    const club = await this.clubRepository.findOne({ where: { id_club: id } });
    if (!club) throw new NotFoundException('Club no encontrado');
    return club;
  }

  async eliminar(id: number) {
    const club = await this.findOne(id);
    return this.clubRepository.remove(club);
  }
}