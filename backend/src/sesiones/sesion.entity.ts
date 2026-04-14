import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { SesionEjercicio } from '../sesion-ejercicio/sesion-ejercicio.entity';
import { EquipoSesion } from '../equipo-sesion/equipo-sesion.entity';

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


    @OneToMany(() => SesionEjercicio, (se) => se.sesion)
    sesion_ejercicio: SesionEjercicio[];

    @OneToMany(() => EquipoSesion, (es) => es.sesion)
    sesiones_agendadas: EquipoSesion[];

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario'})
    usuario_creador: Usuario;

    
}