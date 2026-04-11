import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { EquiposService } from './equipo.service';

@Controller('equipos')
export class EquiposController {
  constructor(private equiposService: EquiposService) {}

  @Post()
  crear(@Body() body: {
    categoria: string;
    letra: string;
    genero: string;
    color: string;
    id_club: number;
    id_usuario: number;
  }) {
    return this.equiposService.crear(
    body.categoria,
    body.letra,
    body.genero,
    body.color,
    body.id_club,
    body.id_usuario,
    );
  }

  @Get()
  findAll() {
    return this.equiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equiposService.findOne(+id);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.equiposService.eliminar(+id);
  }
}