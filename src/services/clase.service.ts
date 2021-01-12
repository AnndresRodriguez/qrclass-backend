import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IClase } from './../models/interfaces/IClase';
import { getConnection, getRepository, ObjectID } from 'typeorm';
import { Hora } from '../models/hora.entity';
import { Dia } from '../models/dia.entity';
import { Materia } from '../models/materia.entity';
import { Docente } from '../models/docente.entity';
import { IHorario } from '../models/interfaces/IHorario';
import { Horario } from '../models/horario.entity';



class ClaseService {
 
  async createClase(idMateria:number, idDocente:number, dataHorario: Array<IHorario>) {

    const horarios: Array<Horario> = [];
      
    console.log(dataHorario);
    const httpResponse = new HttpResponse();
    const materiaRepository = getRepository(Materia);
    const docenteRepository = getRepository(Docente);
    const diaRepository = getRepository(Dia);
    const horaRepository = getRepository(Hora);
    let index = 0;
    
    while(horarios.length !== dataHorario.length){
      
      const materiaHorario = await materiaRepository.findOne({ id: dataHorario[index].idMateria});
      const docenteHorario = await docenteRepository.findOne({ id: dataHorario[index].idDocente });
      const diaHorario = await diaRepository.findOne(dataHorario[index].idDia);
      const horaHorario = await horaRepository.findOne(dataHorario[index].idHora);
      
      
      if(materiaHorario !== undefined){
        if(docenteHorario !== undefined){
          if(diaHorario !== undefined){
            if(horaHorario !== undefined){

              console.log('Entre al while')
              
              const newHorario = new Horario();
              newHorario.materia = materiaHorario;
              newHorario.docente = docenteHorario;
              newHorario.dia = diaHorario;
              newHorario.hora = horaHorario;
              const newHorarioToSave = await newHorario.save();
              horarios.push(newHorarioToSave);
              index++;
            }
          }
        }
      }
      
    }


    const materiaClase = await materiaRepository.findOne({ id: idMateria });
    const docenteClase = await docenteRepository.findOne({ id: idDocente });

    if(materiaClase !== undefined){
      if(docenteClase !== undefined){
        materiaClase.horarios = horarios;
        materiaClase.updatedAt = new Date();
        const materiaToSave = materiaClase.save();
        httpResponse.create('Clase', materiaToSave);
        return httpResponse;
      
      }

      httpResponse.errorNotFoundID('Docente', idDocente);
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