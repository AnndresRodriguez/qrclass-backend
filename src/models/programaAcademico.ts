import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('programaacademico')
export class ProgramaAcademico extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    idcodifoAcademico: number;
    @Column({type: 'varchar', length: 100})
    nombreProgramaAca: string;
    @Column({type: 'varchar', length: 50})
    correoProgramaAca: string;
    // @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    // createdAt: Date
    // @Column({type: 'datetime', name: 'updated_at', nullable: true })
    // updatedAt: Date
}