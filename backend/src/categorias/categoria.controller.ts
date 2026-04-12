import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { CategoriasService } from './categoria.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('categorias')
@UseGuards(AuthGuard('jwt'))
export class CategoriasController {
  constructor(private categoriasService: CategoriasService) {}

  @Post()
  crear(@Body() body: { nombre: string }) {
    return this.categoriasService.crear(body.nombre);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.categoriasService.eliminar(+id);
  }
}