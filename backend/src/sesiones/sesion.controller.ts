import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { SesionesService } from './sesion.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('sesiones')
@UseGuards(AuthGuard('jwt'))
export class SesionesController {
  constructor(private sesionesService: SesionesService) {}

  @Post()
  crear(@Body() body: {
    nombre: string;
    descripcion: string;
    categoria_sesion: string;
    comentarios: string;
    favorita: boolean;
    prueba: boolean;
    id_usuario: number;
  }) {
    return this.sesionesService.crear(
      body.nombre,
      body.descripcion,
      body.categoria_sesion,
      body.comentarios,
      body.favorita,
      body.prueba,
      body.id_usuario,
    );
  }

  @Get()
  findAll() {
    return this.sesionesService.findAll();
  }

  @Get('usuario/:id')
  findByUsuario(@Param('id') id: string) {
  return this.sesionesService.findByUsuario(+id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sesionesService.findOne(+id);
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() body: any) {
  return this.sesionesService.actualizar(+id, body);
  }

  @Patch(':id/favorita')
  toggleFavorita(@Param('id') id: string) {
    return this.sesionesService.toggleFavorita(+id);
}

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.sesionesService.eliminar(+id);
  }
}