import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, JoinColumn } from 'typeorm';
import { Asistencia } from './asistencia.entity';
import { Materia } from './materia.entity';
import { Dia } from './dia.entity';
import { Hora } from './hora.entity';
import { Docente } from './docente.entity';

@Entity('horario')
export class Horario extends BaseEntity{

    @ManyToOne(() => Materia, materia => materia.horarios, { primary: true })
    @JoinColumn({ name: "idMateria" })
    materia: Materia;
   
    @ManyToOne(() => Docente, docente => docente.horarios, { primary: true })
    @JoinColumn({ name: "idDocente" })
    docente: Materia;
    
    @ManyToOne(() => Hora, hora => hora.horarios, { primary: true })
    @JoinColumn({ name: "idHora" })
    hora: Hora;
   
    @ManyToOne(() => Dia, dia => dia.horarios, { primary: true })
    @JoinColumn({ name: "idDia" })
    dia: Dia;

    // @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    // createdAt: Date
    // @Column({type: 'datetime', name: 'updated_at', nullable: true })
    // updatedAt: Date

}