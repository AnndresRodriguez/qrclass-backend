import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IMateria } from '../models/interfaces/IMateria';
import { Materia } from '../models/materia.entity';
import { Docente } from '../models/docente.entity';
import { ProgramaAcademico } from '../models/programaAcademico.entity';

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

  async createMateria(materia: IMateria) {
     
     const httpResponse = new HttpResponse();

     const materiaRepository = getRepository(Materia);
     const docenteRepository = getRepository(Docente);
     const programaRepository = getRepository(ProgramaAcademico);
    
     const existsMateria = await this.validateCodeMateria(materia.codigo);
     const docente = await docenteRepository.findOne(materia.idDocente);
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

    async validateCodeMateria(materiaCodigo: string): Promise<boolean> {
        const materiaRepository = getRepository(Materia);
        const materiaFinded = await materiaRepository.find({ where: { codigo: materiaCodigo } });
        return !_.isEmpty(materiaFinded);
    }
}

const materiaService = new MateriaService();
export default materiaService;