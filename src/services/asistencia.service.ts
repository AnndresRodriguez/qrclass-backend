import { Admin } from "./../models/admin.entity";
import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IAdmin } from "../models/interfaces/IAdmin";
import { IScan } from '../models/interfaces/IScan';
import { IAsistencia } from '../models/interfaces/IAsistencia';
import { Asistencia } from '../models/asistencia.entity';


class AsistenciaService {

 
 
  async createAsistenciaEstudiante(asistencia: IAsistencia) {
    console.log(asistencia);
    const httpResponse = new HttpResponse();
    const asistenciaRepository = getRepository(Asistencia);
    const asistenciaToCreate = asistenciaRepository.create({ 
        estudiante: { id: asistencia.idEstudiante },
        materia: { id: asistencia.idMateria },
        docente: { id: asistencia.idDocente },
        asistio: asistencia.asistio
     });
    const asistenciaSaved = await asistenciaToCreate.save();
    httpResponse.create('asistencia', asistenciaSaved);
    return httpResponse;
  }

  async updateAsistenciaEstudiante(asistencia: IAsistencia){

    console.log(asistencia);
    const httpResponse = new HttpResponse();
    const asistenciaRepository = getRepository(Asistencia);
    const asistenciaToFind = await asistenciaRepository.findOne({ 
      where: { 
        estudiante: { id: +asistencia.idEstudiante },
        materia: { id: +asistencia.idMateria },
        docente: { id: +asistencia.idDocente },
        idScan: +asistencia.idScan        
      } 
    });

    console.log('asistenciaToFind', asistenciaToFind);

    if(asistenciaToFind !== undefined){

      const asistenciaUpdated = await getRepository(Asistencia)
      .createQueryBuilder()
      .update()
      .set({ idScan: asistencia.idScan, 
             estudiante: { id: asistencia.idEstudiante },
             materia: { id: asistencia.idMateria },
             docente: { id: asistencia.idDocente },
             asistio: 1,
             createdAt: asistencia.fecha,
             updatedAt: new Date()
             })

      .where("id = :id", { id: asistenciaToFind.id })
      .execute();
      
      httpResponse.update('Asistencia', asistenciaUpdated);
      return httpResponse;
    }

    httpResponse.errorNotFoundID('Asistencia', asistencia.idEstudiante);
    return httpResponse;
  }

}

const asistenciaService = new AsistenciaService();
export default asistenciaService;