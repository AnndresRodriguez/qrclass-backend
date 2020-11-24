import { Clase } from './../models/clase.entity';
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IClase } from './../models/interfaces/IClase';
import { getRepository } from 'typeorm';
import { Hora } from '../models/hora.entity';
import { Dia } from '../models/dia.entity';
import { Materia } from '../models/materia.entity';


class ClaseService {
  async getAllClases() {
    const httpResponse = new HttpResponse();
    const allClases = await Clase.getAllClases();
    if(!_.isEmpty(allClases)){
        httpResponse.findAll(allClases);
        return httpResponse;
    }

    httpResponse.emptyRecords();
    return httpResponse;
  }

  async getClase(id: number) {
    
  }

  async createClase(nuevaClase: IClase) {
      
    const httpResponse = new HttpResponse();
    const horaRepository = getRepository(Hora);
    const diaRepository = getRepository(Dia);
    const materiaRepository = getRepository(Materia);
    const claseRepository = getRepository(Clase);

    const materiaClase = await materiaRepository.findOne(nuevaClase.idMateria);
    const diaClase = await diaRepository.findOne(nuevaClase.idDia);
    const horaClase = await horaRepository.findOne(nuevaClase.idHora);

    if(materiaClase !== undefined){
        if(diaClase !== undefined){
            if(horaClase !== undefined){
                
                 const materiaToCreate = claseRepository.create({ materia: materiaClase, dia: diaClase, hora: horaClase });

                 const materiaCreated = await materiaToCreate.save();
                 httpResponse.create('Clase', materiaCreated);
                 return httpResponse;
            }

            httpResponse.errorNotFoundID('Hora', nuevaClase.idHora);
            return httpResponse;
        }

        httpResponse.errorNotFoundID('Día', nuevaClase.idDia);
        return httpResponse;
    }

    httpResponse.errorNotFoundID('Materia', nuevaClase.idMateria);
    return httpResponse;
   
  }

  async disableClase(id: number) {
    
  }

  async updateClase(id: number, newClase: IClase) {
   
  }
}

const claseService = new ClaseService();
export default claseService;