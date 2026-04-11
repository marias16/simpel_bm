import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async crear(nombre: string) {
    const categoria = this.categoriaRepository.create({ nombre });
    return this.categoriaRepository.save(categoria);
  }

  async findAll() {
    return this.categoriaRepository.find();
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOne({ where: { id_categoria: id } });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    return categoria;
  }

  async eliminar(id: number) {
    const categoria = await this.findOne(id);
    return this.categoriaRepository.remove(categoria);
  }
}