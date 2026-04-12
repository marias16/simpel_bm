import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { EquipoSesionService } from './equipo-sesion.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('equipo-sesion')
@UseGuards(AuthGuard('jwt'))
export class EquipoSesionController {
  constructor(private equipoSesionService: EquipoSesionService) {}

  @Post()
  crear(@Body() body: {
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    id_equipo: number;
    id_sesion: number;
  }) {
    return this.equipoSesionService.crear(
      body.fecha,
      body.hora_inicio,
      body.hora_fin,
      body.id_equipo,
      body.id_sesion,
    );
  }

  @Get()
  findAll() {
    return this.equipoSesionService.findAll();
  }

  @Get('equipo/:id')
  findByEquipo(@Param('id') id: string) {
    return this.equipoSesionService.findByEquipo(+id);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.equipoSesionService.eliminar(+id);
  }
}