import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IDepartamento } from './../models/interfaces/IDepartamento';
import { Departamento } from '../models/departamento.entity'

class DepartamentoService {
  async getAllDepartamentos() {
    const httpResponse = new HttpResponse();
    const allDepartamentos = await Departamento.getAllDepartments();
    if(!_.isEmpty(allDepartamentos)){
        httpResponse.findAll(allDepartamentos);
        return httpResponse;
    }

    httpResponse.emptyRecords();
    return httpResponse;
  }

  async getDepartamento(id: number) {
    
  }

  async createDepartamento(name: string) {
   
  }

  async disableDepartamento(id: number) {
    
  }

  async updateDepartamento(id: number, newDataDepartamento: IDepartamento) {
   
  }
}

const departamentoService = new DepartamentoService();
export default departamentoService;