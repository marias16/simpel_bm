import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Horario } from './horario.entity';
import { Equipo } from '../equipo/equipo.entity';
import { HorariosController } from './horario.controller';
import { HorariosService } from './horario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Horario, Equipo])],
  controllers: [HorariosController],
  providers: [HorariosService],
  exports: [HorariosService],
})
export class HorariosModule {}