import { Admin } from "./../models/admin.entity";
import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IAdmin } from "../models/interfaces/IAdmin";
import { IScan } from '../models/interfaces/IScan';
import { AsistenciaEstudiante } from '../models/qrscan.entity';
import { IAsistencia } from '../models/interfaces/IAsistencia';
import { Asistencia } from '../models/asistencia.entity';
import { Materia } from '../models/materia.entity';
import { Estudiante } from "models/estudiante.entity";

class QrScanService {
 

  async getScan() {
    const httpResponse = new HttpResponse();
    const scanRepository = getRepository(AsistenciaEstudiante);
    const allscans = await scanRepository.find();
    httpResponse.findAll(allscans[allscans.length-1]);
    return httpResponse;
    
   
  }

  async createDataQR(scan: IScan) {
    const httpResponse = new HttpResponse();
    const scanRepository = getRepository(AsistenciaEstudiante);
    const scanToCreate = scanRepository.create(scan);
    const scanSaved = await scanToCreate.save()
    httpResponse.create('Scan', scanSaved);
    return httpResponse;
  }

  async createAsistenciaEstudiante(asistencia: IAsistencia) {
    
    const asistenciaRepository = getRepository(Asistencia);
    const asistenciaToCreate = asistenciaRepository.create({ 
        estudiante: { id: asistencia.idEstudiante },
        materia: { id: asistencia.idMateria },
        docente: { id: asistencia.idDocente },
        asistio: asistencia.asistio
     });
    const asistenciaSaved = await asistenciaToCreate.save();
    
  }

  async getEstudiantesMateria(id: number) {
    
    let estudiantes : Array<Estudiante> = [];

    const materiaToFind = await Materia.getMateria(id);
    if(materiaToFind !== undefined){ 
        estudiantes = materiaToFind.estudiantes;
        return estudiantes;
    }

    return estudiantes;
  
  }


}

const qrService = new QrScanService();
export default qrService;
