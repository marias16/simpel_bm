import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { CategoriasService } from './categoria.service';

@Controller('categorias')
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