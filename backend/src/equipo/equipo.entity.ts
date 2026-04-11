import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Club } from '../clubs/club.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Horario } from '../horarios/horario.entity';
import { EquipoSesion } from '../equipo-sesion/equipo-sesion.entity';

@Entity('equipos') 
export class Equipo {
    @PrimaryGeneratedColumn()
    id_equipo: number;

    @Column()
    categoria: string;

    @Column()
    genero: string;

    @Column()
    letra: string;

    @Column()
    color: string;

    @OneToMany(() => Horario, (horario) => horario.equipo)
    horarios: Horario[];

    @OneToMany(() => EquipoSesion, (equipo_sesion) => equipo_sesion.sesion)
    equipo_sesion: EquipoSesion[];

    @ManyToOne(() => Club)
    @JoinColumn({ name: 'id_club'})
    club: Club;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario'})
    usuario_creador: Usuario;

    

}