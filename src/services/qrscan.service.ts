import { Admin } from "./../models/admin.entity";
import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IAdmin } from "../models/interfaces/IAdmin";
import { IScan } from '../models/interfaces/IScan';
import { AsistenciaEstudiante } from '../models/qrscan.entity';

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


}

const qrService = new QrScanService();
export default qrService;
