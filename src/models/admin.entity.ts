import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admin')
export class Admin extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    idAdmin: number;
    @Column({type: 'varchar', length: 100})
    nombrecompleto: string;
    @Column({type: 'varchar', length: 10})
    documento: string;
    @Column({type: 'varchar', length: 45})
    correo: string;
    @Column({type: 'varchar', length: 10})
    telefono: string;
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date
    @Column({type: 'integer', default: 1})
    estado: number;


    // correoAdmin NombreCoAdmin DocumentoAdmin telefonoAdmin
}