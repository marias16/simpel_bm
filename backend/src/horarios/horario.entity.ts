import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Equipo } from '../equipo/equipo.entity';

@Entity('horarios') 
export class Horario {
    @PrimaryGeneratedColumn()
    id_horario: number;

    @Column()
    dia_semana: string;

    @Column()
    hora_inicio: string;

    @Column()
    hora_fin: string;

    @ManyToOne(() => Equipo, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_equipo' })
    equipo: Equipo;

}