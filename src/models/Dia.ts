import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { Clase } from './clase';


@Entity('dia')
export class Dia extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idDia: number;
    @Column({type: 'varchar', length: 10 })
    dia: Date
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    @OneToMany(() => Clase, clase => clase.hora)
    clases: Clase[];
    
}