import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Clase } from './clase.entity';
import { ProgramaAcademico } from './programaAcademico.entity';
import { Matricula } from './matricula.entity';
import { Docente } from './docente.entity';

@Entity('materia')
export class Materia extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Docente, docente => docente.materias, { primary: true })
    @JoinColumn({ name: "idDocente" })
    docente: Docente;

    @ManyToOne(() => ProgramaAcademico, programaAcademico => programaAcademico.materias, { primary: true })
    @JoinColumn({ name: "idProgramaAcademico" })
    programaAcademico: ProgramaAcademico;

    @Column({type: 'varchar', length: 100})
    nombre: string;
    @Column({type: 'varchar', length: 10})
    codigo: string;
    @Column({type: 'integer'})
    noestudiantes: number;
    @Column({type: 'integer'})
    nocreditos: number;
    @Column({type: 'integer', default: "1"})
    estado: number;

    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date;

    @OneToMany(() => Clase, clase => clase.materia)
    clases: Clase[];

    @OneToMany(() => Matricula, matricula => matricula.materia)
    matriculas: Matricula[];

    static getAllMaterias(){

        return this.createQueryBuilder("materia")
        .select([
          "materia.id",
          "materia.codigo",
          "materia.nombre",
          "materia.correo",
          "materia.telefono",
          "materia.estado",
        ])
        .getMany();

    }

}