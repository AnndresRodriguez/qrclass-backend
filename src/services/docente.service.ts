
import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IDocente } from "../models/interfaces/IDocente";
import { Docente } from '../models/docente.entity'
import { Departamento } from '../models/departamento.entity';

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

  async createDocente(docente: IDocente) {

    const contactRepository = getRepository(Docente);
    const departamentoRepository = getRepository(Departamento);
    const httpResponse = new HttpResponse();

    const departamentoDocente = await departamentoRepository.findOne(docente.idDepartamento);
    
    if(departamentoDocente != undefined){
      
      const newDocente = contactRepository.create(docente);
      newDocente.departamento = departamentoDocente;
      const contactCreated = await newDocente.save();
      httpResponse.create('Contact', contactCreated);
      return httpResponse;

    }

    return httpResponse;

   
  }

  async disableDocente(id: number) {
    
  }

  async updateDocente(id: number, newDataDocente: IDocente) {
   
  }
}

const docenteService = new DocenteService();
export default docenteService;