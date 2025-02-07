
import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IDirector } from "../models/interfaces/IDirector";
import { DirPrograma } from '../models/directorPrograma.entity'
import { INuevoEstudiante } from '../models/interfaces/INuevoEstudiante';
import { Estudiante } from '../models/estudiante.entity';
import { Materia } from '../models/materia.entity';

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

  async finishSemester(){

       const httpResponse = new HttpResponse();
       DirPrograma.finishSemester();
       httpResponse.delete('Reset Semester', { reset:true })
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

  async createStudents (estudiantesNuevos: Array<INuevoEstudiante>){
    const httpResponse = new HttpResponse();
    const estudianteRepository = getRepository(Estudiante);
    let index = 0;
    const estudiantes: Array<Estudiante> = [];
    while (estudiantes.length !== estudiantesNuevos.length){

      const estudianteToCreate = estudianteRepository.create({
        codigo: estudiantesNuevos[index].codigo,
        nombre: estudiantesNuevos[index].nombre,
        correo: estudiantesNuevos[index].correo,
        telefono: estudiantesNuevos[index].telefono,
        estado: 1
      });

      const estudianteCreated = await estudianteToCreate.save();
      estudiantes.push(estudianteCreated);
      index++;

    }
    httpResponse.create('Estudiantes', estudiantes);
    return httpResponse;
  }

  async enrollStudents(estudiantesNuevos: Array<INuevoEstudiante>){

    // console.log(estudiantesNuevos[0]);
    const httpResponse = new HttpResponse();
    const estudianteRepository = getRepository(Estudiante);
    let index = 0;
    const estudiantes: Array<Estudiante> = [];
    const alreadyEnrolledStudents: Array<INuevoEstudiante> = [];

    while (index !== estudiantesNuevos.length){
      
      const isEnrolled = await this.validateExistentStudent(estudiantesNuevos[index].correo);
      if(isEnrolled){
          alreadyEnrolledStudents.push(estudiantesNuevos[index]);
          index++;
      }else {
          
        const estudianteToCreate = estudianteRepository.create({
            codigo: estudiantesNuevos[index].codigo,
            nombre: estudiantesNuevos[index].nombre,
            correo: estudiantesNuevos[index].correo,
            telefono: estudiantesNuevos[index].telefono,
            estado: 1
        });

        const estudianteCreated = await estudianteToCreate.save();
        estudiantes.push(estudianteCreated);
        index++;
      } 
    }

    httpResponse.create('Estudiantes', { newStudents: estudiantes, existStudents: alreadyEnrolledStudents })
    return httpResponse;
        
  }

  async validateExistentStudent(email: string){

    const estudianteRepository = getRepository(Estudiante);
    const studentEnrolled = await estudianteRepository.findOne({
      where: { correo: email }
    })

    return studentEnrolled !== undefined
  }

  



}

const directorService = new DirectorService();
export default directorService;