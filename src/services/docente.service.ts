
import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IDocente } from "../models/interfaces/IDocente";
import { Docente } from '../models/docente.entity'

class DocenteService {
  async getAllDocentes() {
    const httpResponse = new HttpResponse();
    const cityRepository =  getRepository(Docente);
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

  async updateDocente(id: number, newDataDocente: IDocente) {
   
  }
}

const docenteService = new DocenteService();
export default docenteService;