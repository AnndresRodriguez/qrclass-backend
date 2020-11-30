
import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IDirector } from "../models/interfaces/IDirector";
import { DirPrograma } from '../models/directorPrograma.entity'

class DirectorService {
  async getAllDirectors() {
    const httpResponse = new HttpResponse();
    const allDirectors = await DirPrograma.getAllDirectors();
    if(!_.isEmpty(allDirectors)){
        httpResponse.findAll(allDirectors);
        return httpResponse;
    }

    httpResponse.emptyRecords();
    return httpResponse;
  }

  async getDirector(id: number) {

    const httpResponse = new HttpResponse();
    const directorRepository = getRepository(DirPrograma);
    const director = await directorRepository.findOne(id);

    if(director !== undefined){
       httpResponse.findOne(director);
       return httpResponse;
    }

    httpResponse.errorNotFoundID('Director', id);
    return httpResponse;


    
  }

  async createDirector(director: IDirector) {

    const directorRepository = getRepository(DirPrograma);
      const httpResponse = new HttpResponse();
      const existsDirector = await this.validateDocumentDirector(director.codigo);
  
      if (!existsDirector) {
       
        const newdirector = directorRepository.create(director);
        const directorCreated = await newdirector.save();
        httpResponse.create("Director", directorCreated);
        return httpResponse;

      }
          
      httpResponse.errorDuplicated();
      return httpResponse;

  }

  async disableDirector(id: number) {

    const httpResponse = new HttpResponse();
      if (_.isNumber(+id)) {
  
        const directorRepository = getRepository(DirPrograma);
        const directorToDisable = await directorRepository.findOne(id);
        if (directorToDisable !== undefined){
  
          directorToDisable.estado = directorToDisable.estado == 0 ? directorToDisable.estado = 1 : directorToDisable.estado = 0;
  
          const directorDisabled = await directorToDisable.save();
          httpResponse.update('Director', directorDisabled);
          return httpResponse;
        }
  
        httpResponse.errorNotFoundID('Director', id);
        return httpResponse;
      }
  
      httpResponse.errorFormatInvalid(id);
      return httpResponse;


    
  }

  async updateDirector(id: number, newDataDirector: IDirector) {

    const httpResponse = new HttpResponse();
    if (_.isNumber(+id)) {
         const directorRepository = getRepository(DirPrograma);    
         const directorToUpdate = await directorRepository.findOne(id);

      if (directorToUpdate !== undefined) {
        
          const directorToSave = await this.setDataDirector(directorToUpdate, newDataDirector)
          const directorUpdated = await directorToSave.save();
          httpResponse.update("director", directorUpdated);
          return httpResponse;
      
      }
      httpResponse.errorNotFoundID('Director', id);
      return httpResponse;
    }

    httpResponse.errorFormatInvalid(id);
    return httpResponse;


   
  }

  async setDataDirector(currentDirector: DirPrograma, newDataDirector: IDirector){
  
    currentDirector.codigo = newDataDirector.codigo;
    currentDirector.nombre = newDataDirector.nombre;
    currentDirector.correo = newDataDirector.correo;
    currentDirector.telefono = newDataDirector.telefono;
    currentDirector.estado = newDataDirector.estado;
    currentDirector.updatedAt = new Date();
    return currentDirector;
  }

  async validateDocumentDirector(codigo: string): Promise<boolean> {
    const directorRepository = getRepository(DirPrograma);
    const directorFinded = await directorRepository.find({ where: { codigo: codigo } });
    return !_.isEmpty(directorFinded);
  }

  async validateEmailDirector(directorEmail: string){

    const httpResponse = new HttpResponse();
    const directorRepository = getRepository(DirPrograma);
    const directorFinded = await directorRepository.findOne({ where: { correo: directorEmail }});

    if(directorFinded !== undefined){
        httpResponse.findOne({ id: directorFinded.id });
        return httpResponse;
    }

    httpResponse.errorNotRecordFound('director', 'Email', directorEmail);
    return httpResponse;
  
  }

}

const directorService = new DirectorService();
export default directorService;