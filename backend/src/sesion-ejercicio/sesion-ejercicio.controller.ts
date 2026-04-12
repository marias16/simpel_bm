import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { SesionEjercicioService } from './sesion-ejercicio.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('sesion-ejercicio')
@UseGuards(AuthGuard('jwt'))
export class SesionEjercicioController {
  constructor(private sesionEjercicioService: SesionEjercicioService) {}

  @Post()
  crear(@Body() body: {
    id_sesion: number;
    id_ejercicio: number;
    orden: number;
  }) {
    return this.sesionEjercicioService.crear(
      body.id_sesion,
      body.id_ejercicio,
      body.orden,
    );
  }

  @Get('sesion/:id')
  findBySesion(@Param('id') id: string) {
    return this.sesionEjercicioService.findBySesion(+id);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.sesionEjercicioService.eliminar(+id);
  }
}