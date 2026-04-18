import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

    async registro(nombre: string, email: string, password: string) {
    const existente = await this.usuarioRepository.findOne({ where: { email } });
    if (existente) {
        throw new ConflictException('Este email ya está registrado');
    }

    const hash = await bcrypt.hash(password, 10);

    const usuario = this.usuarioRepository.create({
        nombre,
        email,
        password: hash,
    });
    await this.usuarioRepository.save(usuario);

    return { mensaje: 'Usuario registrado correctamente' };
    }

    async login(email: string, password: string) {
        const usuario = await this.usuarioRepository.findOne({ where: { email } });
        if (!usuario) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        const coincide = await bcrypt.compare(password, usuario.password);
        if (!coincide) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        const payload = {
            id_usuario: usuario.id_usuario,
            email: usuario.email,
            rol: usuario.rol,
            nombre: usuario.nombre
        };

        const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}        

