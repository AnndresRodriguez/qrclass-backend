import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import { Dia } from './dia.entity';
import { Horario } from './horario.entity';

@Entity('hora')
export class Hora extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idHora: number;
    @Column({type: 'varchar', length: 20 })
    horainicio: Date
    @Column({type: 'varchar', length: 20 })
    horafinal: Date
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    // @ManyToMany(() => Dia, dia => dia.horas)
    // dias: Dia[];

    @OneToMany(() => Horario, horario => horario.hora)
    horarios: Horario[];

    // @ManyToOne(() => Dia, dia => dia.horas )
    // @JoinColumn({ name: "idDia" })
    // dia: Dia

    static getAllHours(){
        return this.createQueryBuilder("hora").
        select([
            "hora.idHora",
            "hora.horainicio",
            "hora.horafinal"
        ])
        .getMany();
    }
    
}