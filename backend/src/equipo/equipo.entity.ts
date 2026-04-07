import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Club } from '../clubs/club.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Horario } from '../horarios/horario.entity';

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

    @ManyToOne(() => Club)
    @JoinColumn({ name: 'id_club'})
    club: Club;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario'})
    usuario_creador: Usuario;

    @OneToMany(() => Horario, (horario) => horario.equipo)
        horarios: Horario[];

}