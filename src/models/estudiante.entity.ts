import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Asistencia } from './asistencia.entity';
import { Matricula } from './matricula.entity';

@Entity('estudiante')
export class Estudiante extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    idEstudianteCodigo: number;
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

    @Column({type: 'integer', length: 1})
    estado: number;

    @OneToMany(() => Matricula, matricula => matricula.estudiante)
    matriculas: Matricula[];

}