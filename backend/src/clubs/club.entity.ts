import {Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Equipo } from '../equipo/equipo.entity';

@Entity('clubs')
export class Club {
    @PrimaryGeneratedColumn()
    id_club: number;

    @Column()
    nombre: string;

    @OneToMany(() => Equipo, (equipo) => equipo.club)
    equipos: Equipo[];
}