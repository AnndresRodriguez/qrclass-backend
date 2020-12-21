import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('qrscan')
export class AsistenciaEstudiante extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type: 'varchar', length: 100})
    docente: string;
    @Column({type: 'varchar', length: 100})
    materia: string;
    @Column({type: 'integer'})
    idMateria: number;
    @Column({type: 'integer'})
    idDocente: number;

    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

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