import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Clase } from './clase.entity';
import { Hora } from './hora.entity';
// import { Horario } from './horario.entity';

@Entity('dia')
export class Dia extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type: 'varchar', length: 40 })
    dia: string
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date


    @ManyToMany(() => Hora, { cascade: true })
    @JoinTable({name: 'horario'})
    horas: Hora[];


    @OneToMany(() => Clase, clase => clase.materia)
    clases: Clase[];

    // @OneToMany(() => Horario, horario => horario.dia)
    // horarios: Horario[]

    
    
}