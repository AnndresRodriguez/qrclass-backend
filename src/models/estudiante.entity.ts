import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
// import { Matricula } from './matricula.entity';
import { Asistencia } from './asistencia.entity';

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

}