import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

@Entity('clubs')
export class Club {
    @PrimaryGeneratedColumn()
    id_club: number;

    @Column()
    nombre: string;

}