import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admin')
export class Admin extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    correoAdmin: number;
    @Column({type: 'varchar', length: 45})
    nombreCompleto: string;
    @Column({type: 'varchar', length: 45})
    documento: string;
    @Column({type: 'varchar', length: 20})
    telefono: string;
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    // correoAdmin NombreCoAdmin DocumentoAdmin telefonoAdmin
}