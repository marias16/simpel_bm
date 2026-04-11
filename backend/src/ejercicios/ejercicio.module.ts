import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ejercicio } from './ejercicio.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';
import { EjercicioController } from './ejercicio.controller';
import { EjerciciosService } from './ejercicio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ejercicio, Usuario, Categoria])],
  controllers: [EjercicioController],
  providers: [EjerciciosService],
  exports: [EjerciciosService],
})
export class EjerciciosModule {}