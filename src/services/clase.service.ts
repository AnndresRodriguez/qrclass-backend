import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IClase } from './../models/interfaces/IClase';
import { getConnection, getRepository, ObjectID } from 'typeorm';
import { Hora } from '../models/hora.entity';
import { Dia } from '../models/dia.entity';
import { Materia } from '../models/materia.entity';
import { Clase } from '../models/clase.entity';


class ClaseService {
 

  async getAllClases() {

    const httpResponse = new HttpResponse();

    const allClases = await Clase.getAllClases() ;

    if(!_.isEmpty(allClases)){

      httpResponse.findOne(allClases);
      return httpResponse;

    }
   
    return httpResponse;
    
  }

 

  async createClase(idMateria: number, dataHorario: any) {
      
    console.log(dataHorario);
    // console.log(idMateria)
    const httpResponse = new HttpResponse();
    const materiaRepository = getRepository(Materia);
    const materiaClase = await materiaRepository.findOne({ id: idMateria })
 
    if(materiaClase !== undefined){ 
       
        
        // dataHorario > { "0": [0,1], "1": [2,3], "2": [3,4], "3": [4,5], "4": [4,5] }
        const daysCreated: Array<Dia> = [];

        

        console.log('dataHorario', dataHorario);

        const days = Object.keys(dataHorario);

        console.log('days', days);

        let indexDay = 0;
        //> ['0', '1', '2', '3', '4']

//         [ { dia: '1', horas: [ 2 ] }, { dia: '2', horas: [ 2, 3 ] } ]
// dataHorario [ { dia: '1', horas: [ 2 ] }, { dia: '2', horas: [ 2, 3 ] } ]
// days [ '0', '1' ]

        

        while(days.length !== daysCreated.length){
        
          console.log('days.length', days.length)
          console.log('daysCreated.length', daysCreated.length)
          console.log('Entre Al While')
          console.log('parseInt(days[indexDay])', parseInt(days[indexDay]))
          const day = await this.createDay(parseInt(dataHorario[parseInt(days[indexDay])].dia));
          // console.log(day);
          const hoursDay = await this.createHours(dataHorario[parseInt(days[indexDay])].horas);
          // console.log(hoursDay);
  
          day.horas = hoursDay;
          const daySaved = await day.save()
          daysCreated.push(day);
          indexDay++

        }

        console.log('Finalice el While')

        console.log(materiaClase);

        indexDay = 0;

       
        materiaClase.dias = daysCreated;
        materiaClase.updatedAt = new Date();
        const materiaCreated = await materiaClase.save();
        httpResponse.create('Materia', materiaCreated);
        return httpResponse;
          
                        
    }

    httpResponse.errorNotFoundID('Materia', idMateria);
    return httpResponse;
   
  }

  async disableClase(id: number) {
    
  }

  async updateClase(id: number, newClase: IClase) {
   
  }

  

  async createHours(hours: Array<number>){

      console.log('createHours', hours);
  
      const horaRepository = getRepository(Hora);
      const hoursCreated: Array<Hora> = [];
      let index = 0;

      while(hours.length !== hoursCreated.length){
        console.log('while createHours')
        console.log('index createHours',hours[index])
        const hourToFind = await horaRepository.findOne(hours[index])
        console.log(hourToFind);
        if(hourToFind !== undefined){
          hoursCreated.push(hourToFind);
          index++;
        }
      }

      return hoursCreated;     
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