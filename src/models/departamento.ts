import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('departamento')
export class Departamento extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    idDepartamento: number;
    @Column({type: 'varchar', length: 45})
    nombre: string;
    // @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    // createdAt: Date
    // @Column({type: 'datetime', name: 'updated_at', nullable: true })
    // updatedAt: Date
}