import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { ClubsService } from './club.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('clubs')
@UseGuards(AuthGuard('jwt'))
export class ClubsController {
  constructor(private clubsService: ClubsService) {}

  @Post()
  crear(@Body() body: { nombre: string }) {
    return this.clubsService.crear(body.nombre);
  }

  @Get()
  findAll() {
    return this.clubsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubsService.findOne(+id);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.clubsService.eliminar(+id);
  }
}