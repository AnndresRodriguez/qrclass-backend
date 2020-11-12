import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { Hora } from './Hora';
import { Asistencia } from './asistencia';
import { Materia } from './Materia';
import { Dia } from './Dia';


@Entity('clase')
export class Clase extends BaseEntity{
    
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    @ManyToOne(() => Hora, hora => hora.idHora)
    @JoinTable({ name: "Hora_idHora" })
    hora: Hora;
    
    @ManyToOne(() => Dia, dia => dia.clases)
    @JoinTable({ name: "Dia_idDia" })
    dia: Dia;
    
    @ManyToOne(() => Materia, materia => materia.clases)
    @JoinTable({ name: "Materia_idMateriaCodigo" })
    materia: Materia;
    
    @OneToMany(() => Asistencia, asistencia => asistencia.clase)
    asistencias: Asistencia[];

}