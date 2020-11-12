import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from 'typeorm';
import { Estudiante } from './estudiante.entity';
import { Clase } from './clase.entity';

@Entity('asistencia')
export class Asistencia extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    idAsistencia: number;
    @Column({type: 'integer'})
    asistio: number;
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    @ManyToOne(() => Clase, clase => clase.asistencias)
    clase: Clase;
    
}

