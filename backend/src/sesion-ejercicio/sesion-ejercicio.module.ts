import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SesionEjercicio } from './sesion-ejercicio.entity';
import { Sesion } from '../sesiones/sesion.entity';
import { Ejercicio } from '../ejercicios/ejercicio.entity';
import { SesionEjercicioController } from './sesion-ejercicio.controller';
import { SesionEjercicioService } from './sesion-ejercicio.service';

@Module({
  imports: [TypeOrmModule.forFeature([SesionEjercicio, Sesion, Ejercicio])],
  controllers: [SesionEjercicioController],
  providers: [SesionEjercicioService],
  exports: [SesionEjercicioService],
})
export class SesionEjercicioModule {}