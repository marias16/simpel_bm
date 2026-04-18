import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sesion } from '../sesiones/sesion.entity';
import { Ejercicio } from '../ejercicios/ejercicio.entity';

@Entity('sesion_ejercicio') 
export class SesionEjercicio {
    @PrimaryGeneratedColumn()
    id_sesion_ejercicio: number;

    @Column()
    orden: number;

    @ManyToOne(() => Ejercicio)
    @JoinColumn({ name: 'id_ejercicio'})
    ejercicio: Ejercicio;

    @ManyToOne(() => Sesion, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_sesion' })
    sesion: Sesion;
}