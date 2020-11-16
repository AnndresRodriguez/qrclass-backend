import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Materia } from './materia.entity';
import { Departamento } from './departamento.entity';

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

    @ManyToOne(() => Departamento, departamento => departamento.docentes)
    @JoinColumn({ name: "idDepartamento" })
    departamento: Departamento;

    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date


    @OneToMany(() => Materia, materia => materia.docente)
    materias: Materia[];

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
        .where("docente.estado = :estado", { estado: 1 })
        .getMany();
    }

}