import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Ejercicio } from '../ejercicios/ejercicio.entity'

@Entity('categorias') 
export class Categoria {
    @PrimaryGeneratedColumn()
    id_categoria: number;

    @Column()
    nombre: string;

    @ManyToMany(() => Ejercicio,
        (ejercicio) => ejercicio.categorias)
        ejercicios: Ejercicio[];
}