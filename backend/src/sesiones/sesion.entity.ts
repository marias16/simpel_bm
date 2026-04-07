import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

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

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario'})
    usuario_creador: Usuario;

}