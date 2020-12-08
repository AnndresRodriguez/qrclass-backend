import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Materia } from './materia.entity';
import { Departamento } from './departamento.entity';
import { Asistencia } from './asistencia.entity';
import { Horario } from './horario.entity';
// import { Clase } from './clase.entity';

@Entity('docente')
export class Docente extends BaseEntity{
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;
    @Column({type: 'varchar', length: 10})
    codigo: string;
    @Column({type: 'varchar', length: 100})
    nombre: string;
    @Column({type: 'varchar', length: 45}) 
    correo: string;
    @Column({type: 'varchar', length: 10}) 
    telefono: string;
    @Column({type: 'integer', default: "1"})
    estado: number;

    @ManyToOne(() => Departamento, departamento => departamento.docentes, { primary: true })
    @JoinColumn({ name: "idDepartamento" })
    departamento: Departamento;

    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date


    @OneToMany(() => Materia, materia => materia.docente)
    materias: Materia[];

    @OneToMany(() => Asistencia, asistencia => asistencia.docente)
    asistencias: Asistencia[];
    
    @OneToMany(() => Horario, horario => horario.docente)
    horarios: Horario[];
    
    // @OneToMany(() => Clase, clase => clase.docente)
    // clases: Clase[];

    static getAllDocentes(){
        return this.createQueryBuilder("docente")
        .select([
          "docente.id",
          "docente.codigo",
          "docente.nombre",
          "docente.correo",
          "docente.telefono",
          "docente.estado",
          "departamento.nombre",
          "departamento.estado",
        ])
        .leftJoin("docente.departamento", "departamento")
        .leftJoin("docente.materias", "materia")
        .getMany();
    }

    static getInactiveDocentes(){

      return this.createQueryBuilder("docente")
        .select([
          "docente.id",
          "docente.codigo",
          "docente.nombre",
          "docente.correo",
          "docente.telefono",
          "docente.estado",
          "departamento.nombre",
          "departamento.estado",
        ])
        .leftJoin("docente.departamento", "departamento")
        .where("docente.estado = :estado", { estado: 0 })
        .getMany();

    }

    static getMattersDocente(id: number){

      return this.createQueryBuilder("docente")
        .select([
          "docente.id",
          "docente.codigo",
          "docente.nombre",
          "docente.correo",
          "docente.telefono",
          "docente.estado",
          "materia.nombre",
          "materia.codigo",
          "materia.noestudiantes",
        ])
        .leftJoin("docente.materias", "materia")
        .where("docente.id = :id", { id: id })
        .getMany();



    }

}