// import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, JoinColumn } from 'typeorm';
// import { Asistencia } from './asistencia.entity';
// import { Materia } from './materia.entity';
// import { Dia } from './dia.entity';

// @Entity('clase')
// export class Clase extends BaseEntity{
    
//     @ManyToOne(() => Materia, materia => materia.clases, { primary: true })
//     @JoinColumn({ name: "materiaId" })
//     materia: Materia;
   
//     @ManyToOne(() => Dia, dia => dia.clases, { primary: true })
//     @JoinColumn({ name: "diaId" })
//     dia: Dia;

//     @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
//     createdAt: Date
//     @Column({type: 'datetime', name: 'updated_at', nullable: true })
//     updatedAt: Date

//     @OneToMany(() => Asistencia, asistencia => asistencia.clase)
//     asistencias: Asistencia[];

//     static getAllClases(){
//         return this.createQueryBuilder()
//         .select([
//             "hora.idHora",
//             "hora.horainicio",
//             "hora.horafinal",
//             "dia.dia",
//             "materia.id",
//             "materia.nombre",
//             "materia.codigo",
//             "materia.noestudiantes",
//             "materia.nocreditos",
//             "docente.id",
//             "docente.codigo",
//             "docente.nombre",
//             "docente.correo",
//             "docente.telefono",
//         ])
//         .leftJoin("clase.Materia_id", "materia")
//         .leftJoin("clase.Dia_idDia", "dia")
//         .leftJoin("materia.docente", "docente")
//         .getMany();

//     }
// }