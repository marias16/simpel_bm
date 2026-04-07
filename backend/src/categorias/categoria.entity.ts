import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';
import { Ejercicio } from '../ejercicios/ejercicio.entity';

@Entity('categorias') 
export class Categoria {
    @PrimaryGeneratedColumn()
    id_categoria: number;

    @Column()
    nombre: string;

}