import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from 'typeorm';
import { Asistencia } from './asistencia';

@Entity('estudiante')
export class Estudiante extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    idEstudiante: number;
    @Column({type: 'varchar', length: 100})
    nombreCompleto: string;
    @Column({type: 'varchar', length: 45}) 
    correoEstudiante: number;
    @Column({type: 'varchar', length: 10}) 
    numeroEstudiante: number;
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    @OneToMany(() => Asistencia, asistencia => asistencia.estudiante)
    asistencias: Asistencia[];

}