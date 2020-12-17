import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
// import { Matricula } from './matricula.entity';
import { Asistencia } from './asistencia.entity';
import { Materia } from './materia.entity';

@Entity('estudiante')
export class Estudiante extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
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

    @OneToMany(() => Asistencia, asistencia => asistencia.estudiante)
    asistencias: Asistencia[];

    @ManyToMany(() => Materia, { cascade: false })
    @JoinTable({ name: 'matricula' })
    materias: Materia[];
    
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date


    static getAllStudents(){
        return this.createQueryBuilder("estudiante")
        .select([
          "estudiante.id",
          "estudiante.codigo",
          "estudiante.nombre",
          "estudiante.correo",
          "estudiante.telefono",
          "estudiante.estado"
        ])
        .getMany();
    }


    static getAsistenciaByMateria(idEstudiante: number){

      return this.createQueryBuilder("estudiante")
      .leftJoinAndSelect("estudiante.materias", "materia")
      .leftJoinAndSelect("materia.asistencias", "asistencia")
      .where("estudiante.id = :id", { id: idEstudiante })
      .andWhere("asistencia.idEstudiante = :id", { id: idEstudiante })
      .getMany();

    }

}