import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './equipo.entity';
import { Club } from '../clubs/club.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { EquiposController } from './equipo.controller';
import { EquiposService } from './equipo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo, Club, Usuario])],
  controllers: [EquiposController],
  providers: [EquiposService],
  exports: [EquiposService],
})
export class EquiposModule {}