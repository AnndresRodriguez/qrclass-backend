import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, JoinColumn } from 'typeorm';
import { Estudiante } from './estudiante.entity';
import { Clase } from './clase.entity';

@Entity('asistencia')
export class Asistencia extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    idAsistencia: number;
    @Column({type: 'integer'})
    asistio: number;
    
    @ManyToOne(() => Clase, clase => clase.asistencias)
    @JoinColumn({ name: "Clase_Materia_idMateriaCodigo" })
    clase: Clase;
    
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}

