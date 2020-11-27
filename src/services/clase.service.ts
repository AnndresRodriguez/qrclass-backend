import { Clase } from './../models/clase.entity';
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IClase } from './../models/interfaces/IClase';
import { getRepository, ObjectID } from 'typeorm';
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

  async createClase(nuevaClase: IClase, dataHorario: any) {
      
    const httpResponse = new HttpResponse();
    
    const horaRepository = getRepository(Hora);
    const diaRepository = getRepository(Dia);
    const claseRepository = getRepository(Clase);
    const materiaRepository = getRepository(Materia);

    const materiaClase = await materiaRepository.findOne(nuevaClase.idMateria);
    // const diaClase = await diaRepository.findOne(nuevaClase.idDia);
    // const horaClase = await horaRepository.findOne(nuevaClase.idHora);

    if(materiaClase !== undefined){ 
       
        // dataHorario > { "0": [0,1], "1": [2,3], "2": [3,4], "3": [4,5], "4": [4,5] }


        const days = Object.keys(dataHorario);
        //> ['0', '1', '2', '3', '4']



        const classesInfo = days.map( day => { return { dia: day, horas: dataHorario[day] } } ) 



        
        classesInfo.map( async info => {

            const day = await this.createDay(info.dia);


            info.horas.forEach(async (idhora: number) => {

              const hour = await this.createHour(idhora);
              const claseToCreate = claseRepository.create({ materia: materiaClase, dia: day });

              const claseCreated = await claseToCreate.save();

            });

        });

        httpResponse.create('Clase', materiaClase);
                 
    }

    httpResponse.errorNotFoundID('Materia', nuevaClase.idMateria);
    return httpResponse;
   
  }

  async disableClase(id: number) {
    
  }

  async updateClase(id: number, newClase: IClase) {
   
  }

  async createInfoClass(materia: Materia, dataInfo: {}[]){

      


  }


  async assignHourToDay(hours: Array<number>, dia: Dia){
  
      const horaRepository = getRepository(Hora);

      const hoursCreated = [];

      const allHours = hours.map( async hour => {
         const hourToFind = await horaRepository.findOne(hour);
         if(hourToFind !== undefined){
              dia.horas.push(hourToFind);
           if(dia.horas.length == hours.length){
              return dia;
           }
         }
         return dia;
      })

      const day = await Promise.all(allHours);
      return day


  }


  async createHour(hour: number){

    const horaRepository = getRepository(Hora);
    const newHour = await horaRepository.findOne(hour);

    if(newHour !== undefined){
         return newHour;
    }

    return new Hora();
  }

  async createDay(day: number | string){

  
    const diaRepository = getRepository(Dia);
    const newday = await diaRepository.findOne(day);

    if(newday !== undefined){
         return newday;
    }
    return new Dia();
  }

}

const claseService = new ClaseService();
export default claseService;