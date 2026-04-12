import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { EjerciciosService } from './ejercicio.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('ejercicios')
@UseGuards(AuthGuard('jwt'))
export class EjercicioController {
  constructor(private ejercicioService: EjerciciosService) {}

  @Post()
  crear(@Body() body: {
    nombre: string;
    descripcion: string;
    imagen: string;
    id_usuario: number;
    ids_categorias: number[];
  }) {
    return this.ejercicioService.crear(
      body.nombre,
      body.descripcion,
      body.imagen,
      body.id_usuario,
      body.ids_categorias,
    );
  }

  @Get()
  findAll() {
    return this.ejercicioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ejercicioService.findOne(+id);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.ejercicioService.eliminar(+id);
  }
}