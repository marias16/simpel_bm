import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoSesion } from './equipo-sesion.entity';
import { Equipo } from '../equipo/equipo.entity';
import { Sesion } from '../sesiones/sesion.entity';
import { EquipoSesionController } from './equipo-sesion.controller';
import { EquipoSesionService } from './equipo-sesion.service';

@Module({
  imports: [TypeOrmModule.forFeature([EquipoSesion, Equipo, Sesion])],
  controllers: [EquipoSesionController],
  providers: [EquipoSesionService],
  exports: [EquipoSesionService],
})
export class EquipoSesionModule {}