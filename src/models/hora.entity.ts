import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Clase } from './clase.entity';


@Entity('hora')
export class Hora extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    idHora: number;
    @Column({type: 'varchar', length: 20 })
    horainicio: Date
    @Column({type: 'varchar', length: 20 })
    horafinal: Date
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    @OneToMany(() => Clase, clase => clase.hora)
    clases: Clase[];

    static getAllHours(){
        return this.createQueryBuilder("hora").
        select([
            "hora.idHora",
            "hora.horainicio",
            "hora.horafinal"
        ])
        .getMany();
    }
    
}