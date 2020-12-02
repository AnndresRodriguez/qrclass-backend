import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('asistenciaestudiante')
export class AsistenciaEstudiante extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type: 'integer'})
    idEstudiante: number;
    @Column({type: 'integer'})
    idMateria: number;
    @Column({type: 'integer'})
    idDia: number;
    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    // static getAllAdmins(){
    //     return this.createQueryBuilder("admin")
    //     .select([
    //       "admin.id",
    //       "admin.nombrecompleto",
    //       "admin.documento",
    //       "admin.correo",
    //       "admin.telefono",
    //       "admin.estado",
    //     ])
    //     .getMany();
    // }


    // correoAdmin NombreCoAdmin DocumentoAdmin telefonoAdmin
}