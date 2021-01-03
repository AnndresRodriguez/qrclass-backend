
import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IProgramaAcademico } from "../models/interfaces/IProgramaAcademico";
import { ProgramaAcademico } from '../models/programaAcademico.entity';
import { DirPrograma } from '../models/directorPrograma.entity';

class ProgramaAcademicoService {
  async getAllProgramaAcademicos() {
    const httpResponse = new HttpResponse();
    const allProgramaAcademicos = await ProgramaAcademico.getAllPrograms();
    if(!_.isEmpty(allProgramaAcademicos)){
        httpResponse.findAll(allProgramaAcademicos);
        return httpResponse;
    }

    httpResponse.emptyRecords();
    return httpResponse;
  }

  async getProgramaAcademico(id: number) {

      const httpResponse = new HttpResponse();
      const programaRepository = getRepository(ProgramaAcademico);
      const programa = await programaRepository.findOne(id);

      if(programa !== undefined){
         httpResponse.findOne(programa);
         return httpResponse;
      }

      httpResponse.errorNotFoundID('Programa Academico', id);
      return httpResponse;    
  }

  async createProgramaAcademico(programa: IProgramaAcademico) {

    console.log(programa);

    const programRepository = getRepository(ProgramaAcademico);
    const directorRepository = getRepository(DirPrograma);
    const httpResponse = new HttpResponse();
    const existsCodeProgram = await this.validateProgramCode(programa.codigo);
    const directorProgram = await directorRepository.findOne(programa.idDirector);

    if (!existsCodeProgram) {

      if(directorProgram !== undefined){

        //  const noRepeatCode = await this.validateCodeDirector(directorProgram.id);

        //  if(!noRepeatCode){

            const newProgram = programRepository.create(programa);
            newProgram.dirPrograma = directorProgram;
            const newProgramCreated = await newProgram.save();
            httpResponse.create('Programa Académico', newProgramCreated);
            return httpResponse; 
        //  }

        //  httpResponse.errorEntityDuplicated('Director del Programa', directorProgram.codigo);
        //  return httpResponse;
      }

      httpResponse.errorNotFoundID('Director', programa.idDirector);
      return httpResponse;
      
    }

    httpResponse.errorEntityDuplicated('Programa', programa.codigo);
    return httpResponse;
   
  }

  async disableProgramaAcademico(id: number) {

    


    
  }

  async updateProgramaAcademico(id: number, newDataProgram: IProgramaAcademico) {

    const httpResponse = new HttpResponse();
    if (_.isNumber(+id)) {
      const programRepository = getRepository(ProgramaAcademico);
      const directorRepository = getRepository(DirPrograma);
      const directorPrograma = await directorRepository.findOne(newDataProgram.idDirector);
      const programToUpdate = await programRepository.findOne(id);

      if (programToUpdate !== undefined) {
        if(directorPrograma !== undefined){
             const programToSave = await this.setDataProgram(programToUpdate, newDataProgram, directorPrograma)
             const programUpdated = await programToSave.save();
             httpResponse.update("Programa Académico", programUpdated);
             return httpResponse;
        }
        httpResponse.errorNotFoundID('Director', newDataProgram.idDirector);
        return httpResponse;
      }
      httpResponse.errorNotFoundID('Programa', id);
      return httpResponse;
    }

    httpResponse.errorFormatInvalid(id);
    return httpResponse;
   
  }

  async validateProgramCode(codigo: string): Promise<boolean> {
    const programRepository = getRepository(ProgramaAcademico);
    const programFinded = await programRepository.find({ where: { codigo: codigo } });
    return !_.isEmpty(programFinded);
  }

  async validateCodeDirector(id: number): Promise<boolean> {
    const directorRepository = getRepository(DirPrograma);
    const directorDocente = await directorRepository.find( { where: { id } });
    return !_.isEmpty(directorDocente);
  }

  async existsDirector(codigo: string): Promise<boolean> {
    const directorRepository = getRepository(DirPrograma);
    const directorDocente = await directorRepository.find( { where: { codigo } });
    return !_.isEmpty(directorDocente);
  }

  async setDataProgram(currentProgram: ProgramaAcademico, newDataProgram: IProgramaAcademico, newDirector: DirPrograma){

    currentProgram.codigo = newDataProgram.codigo;
    currentProgram.nombre = newDataProgram.nombre;
    currentProgram.correo = newDataProgram.correo;
    currentProgram.estado = newDataProgram.estado;
    currentProgram.dirPrograma = newDirector;
    currentProgram.updatedAt = new Date();
    return currentProgram;
  }

  async getStudentsByPrograma(idProgramaAcademico: number){

    const httpResponse = new HttpResponse();
    const students = await ProgramaAcademico.getStudentsByPrograma(idProgramaAcademico);

    if(!_.isEmpty(students)){
      httpResponse.findAll(students);
      return httpResponse;
    }

    httpResponse.errorNotFoundID('Programa Académico', idProgramaAcademico);
    return httpResponse;

  }

  async getProgramaByDirector(idDirector: number){

    const httpResponse = new HttpResponse();
    const programaDirector = await ProgramaAcademico.getProgramaDirector(idDirector);
    if(programaDirector !== undefined){
        httpResponse.findOne(programaDirector);
        return httpResponse;
    }

    httpResponse.errorNotFoundID('Director Programa', idDirector);
    return httpResponse;

  }

}

const programaAcademicoService = new ProgramaAcademicoService();
export default programaAcademicoService;