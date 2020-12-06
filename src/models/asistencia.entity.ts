import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, JoinColumn } from 'typeorm';
 import { Clase } from './clase.entity';
import { Materia } from './materia.entity';
import { Docente } from './docente.entity';
import { Estudiante } from './estudiante.entity';

@Entity('asistencia')
export class Asistencia extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({type: 'integer'})
    asistio: number;
      
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    @ManyToOne(() => Materia, materia => materia.asistencias, { primary: true })
    @JoinColumn({ name: "idMateria" })
    materia: Materia;

    @ManyToOne(() => Docente, docente => docente.asistencias, { primary: true })
    @JoinColumn({ name: "idDocente" })
    docente: Docente;
   
    @ManyToOne(() => Estudiante, estudiante => estudiante.asistencias)
    @JoinColumn({ name: "idEstudiante" })
    estudiante: Estudiante;

    // @ManyToOne(() => Clase, clase => clase.asistencias, { primary: true })
    // clase: Clase;

    //     @ManyToOne(() => Materia, materia => materia.matriculas, { primary: true })
//     @JoinColumn({ name: "idMateria" })
//     materia: Materia;

}

