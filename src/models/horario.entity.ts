// import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, JoinColumn } from 'typeorm';
// import { Asistencia } from './asistencia.entity';
// import { Materia } from './materia.entity';
// import { Dia } from './dia.entity';
// import { Hora } from './hora.entity';

// @Entity('horario')
// export class Horario extends BaseEntity{

//     @PrimaryGeneratedColumn('increment')
//     idHorario: number;
    
//     // @ManyToOne(() => Hora, hora => hora.horarios, { primary: true })
//     // @JoinColumn({ name: "Hora_idHora" })
//     // hora: Hora;
   
//     // @ManyToOne(() => Dia, dia => dia.horarios, { primary: true })
//     // @JoinColumn({ name: "Dia_idDia" })
//     // dia: Dia;

//     @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
//     createdAt: Date
//     @Column({type: 'datetime', name: 'updated_at', nullable: true })
//     updatedAt: Date

// }