import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sesion } from './sesion.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { SesionesController } from './sesion.controller';
import { SesionesService } from './sesion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sesion, Usuario])],
  controllers: [SesionesController],
  providers: [SesionesService],
  exports: [SesionesService],
})
export class SesionesModule {}