import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Materia } from './materia.entity';
import { DirPrograma } from './directorPrograma.entity';


@Entity('programaacademico')
export class ProgramaAcademico extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    idcodigo_ProgramaAcademico: number;
    @Column({type: 'varchar', length: 100})
    nombre: string;
    @Column({type: 'varchar', length: 45})
    correo: string;

    @OneToMany(() => Materia, materia => materia.programaAcademico)
    @JoinColumn()
    materias: Materia[];

    @OneToOne(() => DirPrograma)
    @JoinColumn({ name: 'DirPrograma_idCodigo_director' })
    dirPrograma: DirPrograma;

    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}