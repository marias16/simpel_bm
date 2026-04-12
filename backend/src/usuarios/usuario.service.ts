import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario: id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async cambiarPassword(id: number, passwordActual: string, passwordNueva: string) {
    const usuario = await this.findOne(id);

    const coincide = await bcrypt.compare(passwordActual, usuario.password);
    if (!coincide) throw new NotFoundException('Contraseña actual incorrecta');

    usuario.password = await bcrypt.hash(passwordNueva, 10);
    return this.usuarioRepository.save(usuario);
  }

  async eliminar(id: number) {
    const usuario = await this.findOne(id);
    return this.usuarioRepository.remove(usuario);
  }
}