
import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IEstudiante } from "../models/interfaces/IEstudiante";
import { Estudiante } from '../models/estudiante.entity';

class EstudianteService {

  async getAllEstudiantes() {
    const httpResponse = new HttpResponse();
    const allEstudiantes = await Estudiante.getAllStudents();
    if(!_.isEmpty(allEstudiantes)){
        httpResponse.findAll(allEstudiantes);
        return httpResponse;
    }

    httpResponse.emptyRecords();
    return httpResponse;
  }

  async getEstudiante(id: number) {

    const httpResponse = new HttpResponse();
      const estudianteRepository = getRepository(Estudiante);
      const estudiante = await estudianteRepository.findOne(id);

      if(estudiante !== undefined){

         httpResponse.findOne(estudiante);
         return httpResponse;
      }

      httpResponse.errorNotFoundID('Estudiante', id);
      return httpResponse;
    
  }

  async createEstudiante(estudiante: IEstudiante) {

      const studentRepository = getRepository(Estudiante);
      const httpResponse = new HttpResponse();
      const existsstudent = await this.validateCodeEstudiante(estudiante.codigo);
  
      if (!existsstudent) {
        const newstudent = studentRepository.create(estudiante);
        const studentCreated = await newstudent.save();
        httpResponse.create("Estudiante", studentCreated);
        return httpResponse;
      }
          
      httpResponse.errorDuplicated();
      return httpResponse;
  
  }

  async disableEstudiante(id: number) {

    const httpResponse = new HttpResponse();
    if (_.isNumber(+id)) {

      const studentRepository = getRepository(Estudiante);
      const studentToDisable = await studentRepository.findOne(id);
      if (studentToDisable !== undefined){

        studentToDisable.estado = studentToDisable.estado == 0 ? studentToDisable.estado = 1 : studentToDisable.estado = 0;

        const studentDisabled = await studentToDisable.save();
        httpResponse.update('Estudiante', studentDisabled);
        return httpResponse;
      }

      httpResponse.errorNotFoundID('Estudiante', id);
      return httpResponse;
    }

    httpResponse.errorFormatInvalid(id);
    return httpResponse;
    
  }

  async updateEstudiante(id: number, newDataEstudiante: IEstudiante) {

    const httpResponse = new HttpResponse();
    if (_.isNumber(+id)) {
      const studentRepository = getRepository(Estudiante);
      const studentToUpdate = await studentRepository.findOne(id);

      if (studentToUpdate !== undefined) {
        const studentToSave = await this.setDataEstudiante(studentToUpdate, newDataEstudiante);
        const studentUpdated = await studentToSave.save();
        httpResponse.update("Student", studentUpdated);
        return httpResponse;
      }
      httpResponse.errorNotFoundID("Docente", id);
      return httpResponse;
    }

    httpResponse.errorFormatInvalid(id);
    return httpResponse;
   
  }

  async setDataEstudiante(currentEstudiante: Estudiante, newDataEstudiante: IEstudiante){
    currentEstudiante.codigo = newDataEstudiante.codigo;
    currentEstudiante.nombre = newDataEstudiante.nombre;
    currentEstudiante.correo = newDataEstudiante.correo;
    currentEstudiante.telefono = newDataEstudiante.telefono;
    currentEstudiante.estado = newDataEstudiante.estado;
    currentEstudiante.updatedAt = new Date();
    return currentEstudiante;
  }

  async validateCodeEstudiante(codigo: string): Promise<boolean> {
    const EstudianteRepository = getRepository(Estudiante);
    const EstudianteFinded = await EstudianteRepository.find({ where: { codigo: codigo } });
    return !_.isEmpty(EstudianteFinded);
  }
}

const estudianteService = new EstudianteService();
export default estudianteService;