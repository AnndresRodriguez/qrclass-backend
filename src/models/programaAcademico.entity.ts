import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Materia } from './materia.entity';
import { DirPrograma } from './directorPrograma.entity';


@Entity('programaacademico')
export class ProgramaAcademico extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type: 'varchar', length: 10})
    codigo: string;
    @Column({type: 'varchar', length: 100})
    nombre: string;
    @Column({type: 'varchar', length: 45})
    correo: string;
    @Column({type: 'integer', default: "1"})
    estado: number;
    
    @OneToOne(() => DirPrograma)
    @JoinColumn({ name: 'idDirectorPrograma' })
    dirPrograma: DirPrograma;
    
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date
    
    @OneToMany(() => Materia, materia => materia.programaAcademico)
    @JoinColumn()
    materias: Materia[];

    static getAllPrograms(){
        return this.createQueryBuilder("programaacademico")
        .select([
          "programaacademico.id",
          "programaacademico.codigo",
          "programaacademico.nombre",
          "programaacademico.correo",
          "programaacademico.estado",
          "dirprograma.id",
          "dirprograma.codigo",
          "dirprograma.nombre",
          "dirprograma.estado",
        ])
        .leftJoin("programaacademico.dirPrograma", "dirprograma")
        .getMany();
    }

    





}