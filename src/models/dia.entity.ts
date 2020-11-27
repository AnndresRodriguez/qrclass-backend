import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Clase } from './clase.entity';
import { Hora } from './hora.entity';

@Entity('dia')
export class Dia extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idDia: number;
    @Column({type: 'varchar', length: 40 })
    dia: string
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    @OneToMany(() => Hora, hora => hora.dia)
    horas: Hora[];

    @ManyToOne(() => Clase, clase => clase.dia )
    clase: Clase;
    
}