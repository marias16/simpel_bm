import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sesion } from '../sesiones/sesion.entity';
import { Equipo } from '../equipo/equipo.entity';

@Entity('equipo_sesion') 
export class EquipoSesion {
    @PrimaryGeneratedColumn()
    id_equipo_sesion: number;

    @Column()
    fecha: Date;

    @Column()
    hora_inicio: string;

    @Column()
    hora_fin: string;

    @ManyToOne(() => Sesion)
    @JoinColumn({ name: 'id_sesion'})
    sesion: Sesion;

    @ManyToOne(() => Equipo, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_equipo' })
    equipo: Equipo;
}