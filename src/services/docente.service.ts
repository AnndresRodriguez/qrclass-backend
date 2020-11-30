import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IDocente } from "../models/interfaces/IDocente";
import { Docente } from "../models/docente.entity";
import { Departamento } from "../models/departamento.entity";

class DocenteService {
  async getAllDocentes() {
    const httpResponse = new HttpResponse();
    const allDocentes = await Docente.getAllDocentes();

    if (!_.isEmpty(allDocentes)) {
        httpResponse.findAll(allDocentes);
        return httpResponse;
    }

    httpResponse.emptyRecords();
    return httpResponse;
  }

  async getDocente(id: number) {

    const httpResponse = new HttpResponse();

      const docente = await Docente.getMattersDocente(id);
      if(docente !== undefined){

         httpResponse.findOne(docente);
         return httpResponse;
      }

      httpResponse.errorNotFoundID('Docente', id);
      return httpResponse;

  }

  async createDocente(docente: IDocente) {

    const docenteRepository = getRepository(Docente);
    const departamentoRepository = getRepository(Departamento);
    const httpResponse = new HttpResponse();

    const departamentoDocente = await departamentoRepository.findOne(docente.idDepartamento);
    const existsDocente = await this.validateCodeDocente(docente.codigo);

    if (!existsDocente) {
      if (departamentoDocente !== undefined) {

          const noRepeatCode = await this.validateCodeDocente(docente.codigo);

          if(!noRepeatCode){
             const newDocente = docenteRepository.create(docente);
             newDocente.departamento = departamentoDocente;
             const docenteCreated = await newDocente.save();
             httpResponse.create("docente", docenteCreated);
             return httpResponse;
          }

          httpResponse.errorDuplicated();
          return httpResponse;

      }
      httpResponse.errorNotFoundID('Departamento', docente.idDepartamento);
      return httpResponse;
    }
      
    httpResponse.errorDuplicated();
    return httpResponse;
  }

  async changeStatusDocente(idDocente: number) {
    const httpResponse = new HttpResponse();
    if (_.isNumber(+idDocente)) {

      const docenteRepository = getRepository(Docente);
      const docenteToDisable = await docenteRepository.findOne(idDocente);
      if (docenteToDisable !== undefined){

        docenteToDisable.estado = docenteToDisable.estado == 0 ? docenteToDisable.estado = 1 : docenteToDisable.estado = 0;

        const docenteDisabled = await docenteToDisable.save();
        httpResponse.update('Docente', docenteDisabled);
        return httpResponse;
      }

      httpResponse.errorNotFoundID('Docente', idDocente);
      return httpResponse;
    }

    httpResponse.errorFormatInvalid(idDocente);
    return httpResponse;

  }

  async updateDocente(idDocente: number, newDataDocente: IDocente) {

    const httpResponse = new HttpResponse();
    if (_.isNumber(+idDocente)) {
      const docenteRepository = getRepository(Docente);
      const departamentoRepository = getRepository(Departamento);
      const departamentoDocente = await departamentoRepository.findOne(newDataDocente.idDepartamento);
      const docenteToUpdate = await docenteRepository.findOne(idDocente);

      if (docenteToUpdate !== undefined) {
        if(departamentoDocente !== undefined){
             const docenteToSave = await this.setDataDocente(docenteToUpdate, newDataDocente, departamentoDocente)
             const docenteUpdated = await docenteToSave.save();
             httpResponse.update("Docente", docenteUpdated);
             return httpResponse;
        }
        httpResponse.errorNotFoundID('Departamento', newDataDocente.idDepartamento);
        return httpResponse;
      }
      httpResponse.errorNotFoundID('Docente', idDocente);
      return httpResponse;
    }

    httpResponse.errorFormatInvalid(idDocente);
    return httpResponse;
  }

  async setDataDocente(currentDocente: Docente, newDataDocente: IDocente, newDepartamento: Departamento){

        currentDocente.codigo = newDataDocente.codigo;
        currentDocente.nombre = newDataDocente.nombre;
        currentDocente.correo = newDataDocente.correo;
        currentDocente.telefono = newDataDocente.telefono;
        currentDocente.departamento = newDepartamento;
        currentDocente.estado = newDataDocente.estado;
        currentDocente.updatedAt = new Date();
        return currentDocente;
  }

  async validateCodeDocente(docenteCodigo: string): Promise<boolean> {
    const docenteRepository = getRepository(Docente);
    const docenteFinded = await docenteRepository.find({ where: { codigo: docenteCodigo } });
    return !_.isEmpty(docenteFinded);
  }

  async existsDepartment(codigoDepartamento: string): Promise<boolean> {
    const departamentoRepository = getRepository(Departamento);
    const departamentoDocente = await departamentoRepository.find( { where: { codigo: codigoDepartamento } }
      
    );
    return !_.isEmpty(departamentoDocente);
  }

  async validateEmailDocente(docenteEmail: string){

    const httpResponse = new HttpResponse();
    const docenteRepository = getRepository(Docente);
    const docenteFinded = await docenteRepository.findOne({ where: { correo: docenteEmail }});

    if(docenteFinded !== undefined){
        httpResponse.findOne({ id: docenteFinded.id });
        return httpResponse;
    }

    httpResponse.errorNotRecordFound('Docente', 'Email', docenteEmail);
    return httpResponse;
  
  }
}

const docenteService = new DocenteService();
export default docenteService;
