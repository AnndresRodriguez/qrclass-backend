import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('dirprograma')
export class DirPrograma extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type: 'varchar', length: 10})
    codigo: string;
    @Column({type: 'varchar', length: 100})
    nombre: string;
    @Column({type: 'varchar', length: 45}) 
    correo: string;
    @Column({type: 'varchar', length: 10}) 
    telefono: string;
    @Column({type: 'integer', default: "1"})
    estado: number;
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    static getAllDirectors(){
        return this.createQueryBuilder("dirprograma")
        .select([
          "dirprograma.id",
          "dirprograma.codigo",
          "dirprograma.nombre",
          "dirprograma.correo",
          "dirprograma.telefono",
          "dirprograma.estado",
        ])
        .getMany();
    }

   

}