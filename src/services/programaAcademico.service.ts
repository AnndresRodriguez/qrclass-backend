
import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IProgramaAcademico } from "../models/interfaces/IProgramaAcademico";
import { ProgramaAcademico } from '../models/programaAcademico.entity';

class ProgramaAcademicoService {
  async getAllProgramaAcademicos() {
    const httpResponse = new HttpResponse();
    // const cityRepository =  getRepository(ProgramaAcademico);
    const allProgramaAcademicos = await ProgramaAcademico.getAllPrograms();
    if(!_.isEmpty(allProgramaAcademicos)){
        httpResponse.findAll(allProgramaAcademicos);
        return httpResponse;
    }

    httpResponse.emptyRecords();
    return httpResponse;
  }

  async getProgramaAcademico(id: number) {
    
  }

  async createProgramaAcademico(name: string) {
   
  }

  async disableProgramaAcademico(id: number) {
    
  }

  async updateProgramaAcademico(id: number, newDataProgramaAcademico: IProgramaAcademico) {
   
  }
}

const programaAcademicoService = new ProgramaAcademicoService();
export default programaAcademicoService;