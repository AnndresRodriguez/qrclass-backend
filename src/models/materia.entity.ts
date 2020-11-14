

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
// import { Asistencia } from './asistencia';
 import { Clase } from './clase.entity';
 import { ProgramaAcademico } from './programaAcademico.entity';
 import { Matricula } from './matricula.entity';
 import { Docente } from './docente.entity';



@Entity('materia')
export class Materia extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    idMateriaCodigo: number;

    @ManyToOne(() => Docente, docente => docente.materias, { primary: true })
    @JoinColumn({ name: "Docente_idDocenteCodigo" })
    docente: Docente;

    @ManyToOne(() => ProgramaAcademico, programaAcademico => programaAcademico.materias, { primary: true })
    @JoinColumn({ name: "ProgramaAcademico_idProgramaAcademico" })
    programaAcademico: ProgramaAcademico;

    @Column({type: 'varchar', length: 100})
    nombre: string;
    @Column({type: 'integer'})
    noestudiantes: number;
    @Column({type: 'integer'})
    nocreditos: number;

    

    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @Column({type: 'integer', default: 1})
    estado: number;


    @OneToMany(() => Clase, clase => clase.materia)
    clases: Clase[];

    @OneToMany(() => Matricula, matricula => matricula.materia)
    matriculas: Matricula[];

}