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

  async getClase(idMateria: number) {

    const httpResponse = new HttpResponse();
    

    return httpResponse;
    
  }

  async createClase(nuevaClase: IClase, dataHorario: {}) {
      
    const httpResponse = new HttpResponse();
    const horaRepository = getRepository(Hora);
    const diaRepository = getRepository(Dia);
    const materiaRepository = getRepository(Materia);
    const claseRepository = getRepository(Clase);

    const materiaClase = await materiaRepository.findOne(nuevaClase.idMateria);
    // const diaClase = await diaRepository.findOne(nuevaClase.idDia);
    // const horaClase = await horaRepository.findOne(nuevaClase.idHora);

    if(materiaClase !== undefined){
        // if(diaClase !== undefined){
            

           
          
        // dataHorario>   { "0": [0,1], "1": [2,3], "2": [3,4], "3": [4,5], "4": [4,5] }

                const days = Object.keys(dataHorario);
                
            

               //> ['0', '1', '2', '3', '4']

               /**
                * for (let key in dataHorario){
                *    const hours = dataHorario[key]
                *    hours.map( hour => {
                *      
                *    const horaClase = await horaRepository.findOne(hour);
                *    if (horaClase != undefined){
                * 
                *         const diaClase = await diaRepository.findOne(key);
                *         if(diaClase != undefined){
                *         
                *         }
                * 
                *           
                * 
                * 
                *    }
                * 
                *         
                * } )
                *     
                    
                  }
                
                 */

          
    }

    httpResponse.errorNotFoundID('Materia', nuevaClase.idMateria);
    return httpResponse;
   
  }

  async disableClase(id: number) {
    
  }

  async updateClase(id: number, newClase: IClase) {
   
  }

  async getInfoHours(hours: Array<number>){

      hours.map( hour => {

        

      })

  }

}

const claseService = new ClaseService();
export default claseService;