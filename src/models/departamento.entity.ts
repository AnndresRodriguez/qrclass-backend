import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Docente } from './docente.entity';

@Entity('departamento')
export class Departamento extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    idDepartamento: number;
    @Column({type: 'varchar', length: 100})
    nombre: string;
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date
    @Column({type: 'integer', length: 1, default: 1})
    estado: number;

    @OneToMany(() => Docente, docente => docente.departamento)
    docentes: Docente[];

}