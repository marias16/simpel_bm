import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClubsModule } from './clubs/club.module';
import { EquiposModule } from './equipo/equipo.module';
import { HorariosModule } from './horarios/horario.module';
import { CategoriasModule } from './categorias/categoria.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'simpel_bm.db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  AuthModule,
  ClubsModule,
  EquiposModule,
  HorariosModule,
  CategoriasModule
],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
