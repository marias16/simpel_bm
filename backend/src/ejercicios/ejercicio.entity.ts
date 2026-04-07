import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';
import { SesionEjercicio } from '../sesion-ejercicio/sesion-ejercicio.entity'

@Entity('ejercicios') 
export class Ejercicio {
    @PrimaryGeneratedColumn()
    id_ejercicio: number;

    @Column()
    nombre: string;

    @Column()
    imagen: string;

    @Column()
    descripcion: string;

    @OneToMany(() => SesionEjercicio, (sesion_ejercicio) => sesion_ejercicio.sesion)
    sesion_ejercicio: SesionEjercicio[];

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario'})
    usuario_creador: Usuario;

    @ManyToMany(() => Categoria,
    (categoria) => categoria.ejercicios)
    @JoinTable({
        name: 'ejercicio_categoria',
        joinColumn: { name: 'id_ejercicio' },
        inverseJoinColumn: { name: 'id_categoria' },
    })
    categorias: Categoria[];
}