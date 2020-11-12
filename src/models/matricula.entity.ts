import { BaseEntity, Entity, Column, ManyToOne, JoinTable} from 'typeorm';
import { Materia } from './materia.entity'
import { Estudiante } from './estudiante.entity';


@Entity('matricula')
export class Matricula extends BaseEntity{

    @ManyToOne(() => Materia, materia => materia.matriculas)
    @JoinTable({ name: "Materia_idMateriaCodigo" })
    materia: Materia;

    @ManyToOne(() => Materia, materia => materia.matriculas)
    @JoinTable({ name: "Estudiante_idEstudianteCodigo" })
    estudiante: Estudiante;

    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date


    
}