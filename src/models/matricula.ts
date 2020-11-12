import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Clase } from './clase';


@Entity('matricula')
export class Matricula extends BaseEntity{


    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    @OneToMany(() => Clase, clase => clase.hora)
    clase: Clase;
    
}