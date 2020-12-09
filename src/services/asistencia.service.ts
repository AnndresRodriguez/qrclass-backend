import { Admin } from "./../models/admin.entity";
import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IAdmin } from "../models/interfaces/IAdmin";
import { IScan } from '../models/interfaces/IScan';
import { IAsistencia } from '../models/interfaces/IAsistencia';
import { Asistencia } from '../models/asistencia.entity';
import { clouddebugger } from "googleapis/build/src/apis/clouddebugger";

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

}

const asistenciaService = new AsistenciaService();
export default asistenciaService;