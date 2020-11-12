
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinTable } from 'typeorm';
// import { Asistencia } from './asistencia';
 import { Clase } from './clase';
 import { ProgramaAcademico } from './programaAcademico';


@Entity('materia')
export class Materia extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    idMateriaCodigo: number;
    @Column({type: 'varchar', length: 100})
    nombre: string;
    @Column({type: 'integer'})
    noestudiantes: number;
    @Column({type: 'integer'})
    nocreditos: number;

    @ManyToOne(() => ProgramaAcademico, programaAcademico => programaAcademico.materias)
    @JoinTable({ name: "Materia_idMateriaCodigo" })
    programaAcademico: ProgramaAcademico;

    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @OneToMany(() => Clase, clase => clase.materia)
    clases: Clase[];

}