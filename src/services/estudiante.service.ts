
import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IEstudiante } from "../models/interfaces/IEstudiante";
import { Estudiante } from '../models/estudiante.entity';

class EstudianteService {
  async getAllEstudiantes() {
    const httpResponse = new HttpResponse();
    const cityRepository =  getRepository(Estudiante);
    const allDocentes = await cityRepository.find();
    if(!_.isEmpty(allDocentes)){
        httpResponse.findAll(allDocentes);
        return httpResponse;
    }

    httpResponse.emptyRecords();
    return httpResponse;
  }

  async getDocente(id: number) {
    
  }

  async createDocente(name: string) {
   
  }

  async disableDocente(id: number) {
    
  }

  async updateDocente(id: number, newDataEstudiante: IEstudiante) {
   
  }
}

const estudianteService = new EstudianteService();
export default estudianteService;