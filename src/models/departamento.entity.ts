import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Docente } from './docente.entity';

@Entity('departamento')
export class Departamento extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type: 'varchar', length: 10})
    codigo: string;
    @Column({type: 'varchar', length: 100})
    nombre: string;
    @Column({type: 'integer', default: "1"})
    estado: number;
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date
    @OneToMany(() => Docente, docente => docente.departamento)
    docentes: Docente[];

    static getAllDepartments(){
        return this.createQueryBuilder("departamento")
        .select([
          "departamento.id",
          "departamento.codigo",
          "departamento.nombre",
          "departamento.estado",
        ])
        .getMany();
    }

}