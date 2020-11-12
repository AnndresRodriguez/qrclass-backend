import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from 'typeorm';
import { Estudiante } from './estudiante';
import { Clase } from './clase';

@Entity('asistencia')
export class Asistencia extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    idAsistencia: number;
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    @ManyToOne(() => Estudiante, estudiante => estudiante.asistencias)
    estudiante: Estudiante;

    @ManyToOne(() => Clase, clase => clase.asistencias)
    clase: Clase;
    
}

