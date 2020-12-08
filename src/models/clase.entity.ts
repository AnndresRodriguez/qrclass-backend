// import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, JoinColumn } from 'typeorm';
// import { Asistencia } from './asistencia.entity';
// import { Materia } from './materia.entity';
// import { Dia } from './dia.entity';
// import { Docente } from './docente.entity';
// import { Horario } from './horario.entity';

// @Entity('clase')
// export class Clase extends BaseEntity{
    
//     @ManyToOne(() => Materia, materia => materia.clases, { primary: true })
//     @JoinColumn({ name: "idMateria" })
//     materia: Materia;

//     @ManyToOne(() => Docente, docente => docente.clases, { primary: true })
//     @JoinColumn({ name: "idDocente" })
//     docente: Docente;

//     @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
//     createdAt: Date
//     @Column({type: 'datetime', name: 'updated_at', nullable: true })
//     updatedAt: Date

//     // @OneToMany(() => Horario, horario => horario.clase)
//     // horarios: Horario[];
// }