import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from 'typeorm';
// import { Asistencia } from './asistencia';

@Entity('dirprograma')
export class DirPrograma extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    idCodigo_director: number;
    @Column({type: 'varchar', length: 100})
    nombre: string;
    @Column({type: 'varchar', length: 45}) 
    correo: number;
    @Column({type: 'varchar', length: 10}) 
    telefono: number;
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

}