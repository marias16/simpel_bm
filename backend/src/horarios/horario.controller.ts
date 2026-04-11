import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { HorariosService } from './horario.service';

@Controller('horarios')
export class HorariosController {
  constructor(private horariosService: HorariosService) {}

  @Post()
  crear(@Body() body: {
    dia_semana: string;
    hora_inicio: string;
    hora_fin: string;
    id_equipo: number;
  }) {
    return this.horariosService.crear(
      body.dia_semana,
      body.hora_inicio,
      body.hora_fin,
      body.id_equipo,
    );
  }

  @Get('equipo/:id')
  findByEquipo(@Param('id') id: string) {
    return this.horariosService.findByEquipo(+id);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.horariosService.eliminar(+id);
  }
}