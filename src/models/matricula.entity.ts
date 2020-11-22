// import { BaseEntity, Entity, Column, ManyToOne, JoinTable, JoinColumn } from 'typeorm';
// import { Materia } from './materia.entity'
// import { Estudiante } from './estudiante.entity';


// @Entity('matricula')
// export class Matricula extends BaseEntity{

//     @ManyToOne(() => Materia, materia => materia.matriculas, { primary: true })
//     @JoinColumn({ name: "idMateria" })
//     materia: Materia;

//     @ManyToOne(() => Materia, materia => materia.matriculas, { primary: true })
//     @JoinColumn({ name: "idEstudiante" })
//     estudiante: Estudiante;

//     @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
//     createdAt: Date
//     @Column({type: 'datetime', name: 'updated_at', nullable: true })
//     updatedAt: Date
//     @Column({type: 'integer', default: "1"})
//     estado: number;
// }