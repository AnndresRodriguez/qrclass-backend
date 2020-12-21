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
    const dateScan = new Date();
    scanToCreate.createdAt = dateScan;
    const scanSaved = await scanToCreate.save();
    this.createAsistenciaEstudiante(scan.idMateria, scan.idDocente, dateScan, scanSaved.id)
    httpResponse.create('Scan', scanSaved);
    return httpResponse;
  }

  async createAsistencia(idEstudiante: number, idMateria: number, idDocente: number, fecha:Date, idScan: number) {
    
    const asistenciaRepository = getRepository(Asistencia);
    const asistenciaToCreate = asistenciaRepository.create({
        idScan: idScan, 
        estudiante: { id: idEstudiante },
        materia: { id: idMateria },
        docente: { id: idDocente },
        asistio: 0,
        createdAt: new Date(fecha)
     });
     asistenciaToCreate.save();
    
  }

  async createAsistenciaEstudiante(idMateria: number, idDocente: number, fecha: Date, idScan: number) {
    
    let estudiantes : Array<Estudiante> = [];

    console.log('Create Asistencia Estudiante')
    console.log('idMateria', idMateria)
    console.log('idDocente', idDocente)
    console.log('idScan', idScan)

    const materiaToFind = await Materia.getMateria(idMateria);
    console.log('materiaToFind', materiaToFind);
    if(materiaToFind !== undefined){ 
        estudiantes = materiaToFind.estudiantes;

        estudiantes.map( estudiante => {
          this.createAsistencia(estudiante.id, idMateria, idDocente, fecha, idScan)
        });
    }
  }


}

const qrService = new QrScanService();
export default qrService;
