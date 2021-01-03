import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IMateria } from '../models/interfaces/IMateria';
import { Materia } from '../models/materia.entity';
import { Docente } from '../models/docente.entity';
import { ProgramaAcademico } from '../models/programaAcademico.entity';
import XSLX from 'xlsx';
import { IEstudiante } from '../models/interfaces/IEstudiante';
import { Estudiante } from '../models/estudiante.entity';
import fs from "fs";
import { INuevoEstudiante } from "models/interfaces/INuevoEstudiante";


class MateriaService {
  async getAllMaterias() {
    const httpResponse = new HttpResponse();
    const allStudents = await Materia.getAllMaterias();


    if (!_.isEmpty(allStudents)) {
      httpResponse.findAll(allStudents);
      return httpResponse;
    }
 
    httpResponse.emptyRecords();
    return httpResponse;
  }

  async getMateria(id: number) {
    const httpResponse = new HttpResponse();
    const materiaToFind = await Materia.getMateriasbyID(id);
    if(!_.isEmpty(materiaToFind)){ 

       httpResponse.findOne(materiaToFind);
       return httpResponse;
    }
    httpResponse.errorNotFoundID('Materia', id);
    return httpResponse;
  
  }

  async getMateriasByDocente(idDocente: number){

    const httpResponse = new HttpResponse();
    const materiasDocente = await Materia.getMateriasbyDocente(idDocente);
    if(!_.isEmpty(materiasDocente)){ 
      httpResponse.findOne(materiasDocente);
      return httpResponse;
   }
   httpResponse.errorNotFoundID('Materia', idDocente);
   return httpResponse;

  }

  async getAsistenciaByMateria(idMateria: number){

    const httpResponse = new HttpResponse();
    const asistenciasMateria = await Materia.getAsistenciaByMateria(idMateria);
    if(!_.isEmpty(asistenciasMateria)){ 
      httpResponse.findAll(asistenciasMateria);
      return httpResponse;
   }
   httpResponse.errorNotFoundID('Materia', idMateria);
   return httpResponse;
    

  }

  async createMateria(materia: IMateria) {
     
     const httpResponse = new HttpResponse();

     const materiaRepository = getRepository(Materia);
     const docenteRepository = getRepository(Docente);
     const programaRepository = getRepository(ProgramaAcademico);
    
     const existsMateria = await this.validateCodeMateria(materia.codigo);
     const docente = await docenteRepository.findOne({ id: materia.idDocente});
     const programaAcademico = await programaRepository.findOne(materia.idProgramaAcademico);
 
     if (!existsMateria) {
        if(docente !== undefined){
            if(programaAcademico !== undefined){

                const materiaToSave =  materiaRepository.create(materia);
                materiaToSave.docente = docente;
                materiaToSave.programaAcademico = programaAcademico;
                const materiaSaved = await materiaToSave.save();
                httpResponse.create('Materia', materiaSaved);
                return httpResponse;
            }

            httpResponse.errorNotFoundID('Programa Academico', materia.idProgramaAcademico);
            return httpResponse;
        }

        httpResponse.errorNotFoundID('Docente', materia.idDocente);
        return httpResponse;

     }

     httpResponse.errorEntityDuplicated('Materia', materia.codigo)
     return httpResponse;

  }

  async updateMateria(idMateria: number, newMateria: IMateria) {

       const httpResponse = new HttpResponse();

       const materiaRepository = getRepository(Materia);
       const docenteRepository = getRepository(Docente);
       const programaRepository = getRepository(ProgramaAcademico);

       const keyToFind = { id: idMateria }
       
       const materiaToUpdate = await materiaRepository.findOne(keyToFind);
       const docente = await docenteRepository.findOne(newMateria.idDocente); 
       const programa = await programaRepository.findOne(newMateria.idProgramaAcademico); 

       if(materiaToUpdate !== undefined){
          if(docente !== undefined){
              if(programa !== undefined){

                  const materiaToSave = await this.setDataMateria(materiaToUpdate, newMateria, docente, programa);

                  httpResponse.update('Materia', materiaToSave);
                  return httpResponse; 
              }
              httpResponse.errorNotFoundID('Programa Academico', newMateria.idProgramaAcademico);
              return httpResponse;
          }

          httpResponse.errorNotFoundID('Docente', newMateria.idDocente);
          return httpResponse;
       }

       httpResponse.errorNotFoundID('Materia', idMateria);
       return httpResponse;
  }


  async setDataMateria(currentMateria: Materia, newDataMateria: IMateria, docente: Docente,
    programa: ProgramaAcademico) {

      const materiaRepository = await getRepository(Materia)
      .createQueryBuilder()
      .update()
      .set(
            { 
              nombre: newDataMateria.nombre,
              codigo: newDataMateria.codigo,
              noestudiantes: newDataMateria.noestudiantes, 
              nocreditos: newDataMateria.nocreditos, 
              docente: docente,
              programaAcademico: programa
            }
        )
        .where("id = :id", { id: currentMateria.id })
        .execute();

     return materiaRepository;
 
  }

  async getEstudiantesMateria(idMateria: number){

      const httpResponse = new HttpResponse();
      const materias = await Materia.getAsistenciaByMateria(idMateria);

      if(!_.isEmpty(materias)){

         httpResponse.findAll(materias);
         return httpResponse;

      }

      httpResponse.errorNotFoundID('Materia',idMateria)
      return httpResponse;

  }

  async validateCodeMateria(materiaCodigo: string): Promise<boolean> {
        const materiaRepository = getRepository(Materia);
        const materiaFinded = await materiaRepository.find({ where: { codigo: materiaCodigo } });
        return !_.isEmpty(materiaFinded);
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

  async enrollStudents(estudiantesNuevos: Array<INuevoEstudiante>, idMateria: number){

    const httpResponse = new HttpResponse();
    const materiaRepository = getRepository(Materia);
    const estudianteRepository = getRepository(Estudiante);
    const materiaClase = await materiaRepository.findOne({ id: idMateria });
    let index = 0;
    if(materiaClase != undefined){

      const estudiantes: Array<Estudiante> = [];
      const notEnrolledStudents: Array<INuevoEstudiante> = [];

      estudiantesNuevos.map( async estudiante => {
        
          const isEnrolled = await this.validateExistentStudent(estudiante.correo);
          if(!isEnrolled){
             notEnrolledStudents.push(estudiante);
          }


      })

    }
    
  }

  async createDinamicStudents(estudiantesNuevos: Array<INuevoEstudiante>, idMateria: number){

    const httpResponse = new HttpResponse();
    const materiaRepository = getRepository(Materia);

    const materiaClase = await materiaRepository.findOne({ id: idMateria });
    let index = 0;

    if(materiaClase != undefined){

      const estudiantes: Array<Estudiante> = [];
      const notFoundEmails: Array<String> = [];

      while (index !== estudiantesNuevos.length){

        const studentToFind = await this.findStudent(estudiantesNuevos[index].correo);

        if(studentToFind !== undefined){

          estudiantes.push(studentToFind);
          index++;

        }else {
          notFoundEmails.push(estudiantesNuevos[index].correo);
          index++;

        }
  
      }

      materiaClase.estudiantes = estudiantes;
      materiaClase.updatedAt = new Date();
      const materiaToSave = await materiaClase.save();
      httpResponse.create('Matricula', { materia: materiaToSave, notFoundEmails: notFoundEmails });
      index = 0;
      return httpResponse;
     
    }
    return httpResponse;
  }


  async createStudent(estudiante: object){

    const studentRepository = getRepository(Estudiante);
    // const httpResponse = new HttpResponse();
    // const existsstudent = await this.validateCodeEstudiante(estudiante.codigo);

    // if (!existsstudent) {
    const newstudent = studentRepository.create(estudiante);
    const studentCreated = await newstudent.save();
    return studentCreated;
    // }
        
    // httpResponse.errorDuplicated();
    // return httpResponse;
    
  }

  async validateExistentStudent(email: string){

    const estudianteRepository = getRepository(Estudiante);
    const studentEnrolled = await estudianteRepository.findOne({
      where: { correo: email }
    })

    return studentEnrolled !== undefined
  }

  async findStudent(email: string){

    const estudianteRepository = getRepository(Estudiante);
    const studentEnrolled = await estudianteRepository.findOne({
      where: { correo: email }
    })

    return studentEnrolled;
  }

}

const materiaService = new MateriaService();
export default materiaService;