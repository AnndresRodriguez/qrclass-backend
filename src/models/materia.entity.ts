import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Clase } from './clase.entity';
import { ProgramaAcademico } from './programaAcademico.entity';
// import { Matricula } from './matricula.entity';
import { Docente } from './docente.entity';
import { Estudiante } from './estudiante.entity';
import { Dia } from './dia.entity';

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

    @ManyToMany(() => Estudiante, { cascade: true })
    @JoinTable({ name: 'matricula' })
    estudiantes: Estudiante[];

    @ManyToMany(() => Dia, { cascade: true })
    @JoinTable({ name: 'clase' })
    dias: Dia[];

    static getAllMaterias(){

        return this.createQueryBuilder("materia")
        .select([
          "materia.id",
          "materia.nombre",
          "materia.codigo",
          "materia.noestudiantes",
          "materia.nocreditos",
          "materia.estado",
          "docente.nombre",
          "docente.codigo",
          "docente.correo",
          "docente.telefono",
          "programaacademico.nombre",
          "programaacademico.codigo",
          "programaacademico.correo",
          "dirprograma.codigo",
          "dirprograma.nombre",
          "dirprograma.correo",
          "dirprograma.telefono",

        ])
        .leftJoin("materia.docente", "docente")
        .leftJoin("materia.programaAcademico", "programaacademico")
        .leftJoin("programaacademico.dirPrograma", "dirprograma")
        .getMany();
    }

    static getMateria(idMateria: number){

      return this.createQueryBuilder("materia")
        .select([
          "materia.id",
          "materia.nombre",
          "materia.codigo",
          "materia.noestudiantes",
          "materia.nocreditos",
          "materia.estado",
          "docente.nombre",
          "docente.codigo",
          "docente.correo",
          "docente.telefono",
          "programaacademico.nombre",
          "programaacademico.codigo",
          "programaacademico.correo",

        ])
        .leftJoin("materia.docente", "docente")
        .leftJoin("materia.programaAcademico", "programaacademico")
        .where("materia.id = :id", { id: idMateria })
        .getMany();



    }


    

}