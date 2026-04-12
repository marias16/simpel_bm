import { Controller, Get, Delete, Patch, Body, Param } from '@nestjs/common';
import { UsuariosService } from './usuario.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuarios')
@UseGuards(AuthGuard('jwt'))
export class UsuarioController {
  constructor(private usuariosService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id/password')
  cambiarPassword(@Body() body: {
    passwordActual: string;
    passwordNueva: string;
  }, @Param('id') id: string) {
    return this.usuariosService.cambiarPassword(+id, body.passwordActual, body.passwordNueva);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.usuariosService.eliminar(+id);
  }
}