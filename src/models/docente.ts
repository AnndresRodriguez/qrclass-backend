import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from 'typeorm';
// import { Asistencia } from './asistencia';

@Entity('docente')
export class Docente extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    idDocenteCodigo: number;
    @Column({type: 'varchar', length: 100})
    nombre: string;
    @Column({type: 'varchar', length: 45}) 
    correo: number;
    @Column({type: 'varchar', length: 10}) 
    telefono: number;
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    // @OneToMany(() => Asistencia, asistencia => asistencia.estudiante)
    // asistencias: Asistencia[];

}