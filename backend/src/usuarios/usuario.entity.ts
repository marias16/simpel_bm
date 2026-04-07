import {Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Equipo} from '../equipo/equipo.entity'
@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    nombre: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 'entrenador' })
    rol: string;


    @OneToMany(() => Equipo, (equipo) => equipo.usuario_creador)
    equipos_creados: Equipo[];
}