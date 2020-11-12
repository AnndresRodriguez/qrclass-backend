import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { Hora } from './hora.entity';
import { Asistencia } from './asistencia.entity';
import { Materia } from './materia.entity';
import { Dia } from './dia.entity';


@Entity('clase')
export class Clase extends BaseEntity{
    
    @ManyToOne(() => Hora, hora => hora.idHora)
    @JoinTable({ name: "Hora_idHora" })
    hora: Hora;

    @ManyToOne(() => Materia, materia => materia.clases)
    @JoinTable({ name: "Materia_idMateriaCodigo" })
    materia: Materia;
   
    @ManyToOne(() => Dia, dia => dia.clases)
    @JoinTable({ name: "Dia_idDia" })
    dia: Dia;

    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    @OneToMany(() => Asistencia, asistencia => asistencia.clase)
    asistencias: Asistencia[];

}