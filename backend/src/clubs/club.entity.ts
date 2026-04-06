import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('clubs')
export class Club {
    @PrimaryGeneratedColumn()
    id_club: number;

    @Column()
    nombre: string;

}