import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { SesionEjercicio } from 'src/sesion-ejercicio/sesion-ejercicio.entity';


@Entity('sesiones') 
export class Sesion {
    @PrimaryGeneratedColumn()
    id_sesion: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    categoria_sesion: string;

    @Column()
    comentarios: string;

    @Column()
    favorita: boolean;

    @Column()
    prueba: boolean;

    @OneToMany(() => SesionEjercicio, (sesion_ejercicio) => sesion_ejercicio.sesion)
    sesion_ejercicio: SesionEjercicio[];
    
    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario'})
    usuario_creador: Usuario;

    
}