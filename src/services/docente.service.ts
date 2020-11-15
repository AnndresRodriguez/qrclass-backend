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
    const allDocentes = await getRepository(Docente)
      .createQueryBuilder("docente")
      .select([
        "docente.idDocenteCodigo",
        "docente.nombre",
        "docente.correo",
        "docente.telefono",
        "docente.estado",
        "departamento.nombre",
        "departamento.estado",
      ])
      .leftJoin("docente.departamento", "departamento")
      .where("docente.estado = :estado", { estado: 1 })
      .getMany();
    if (!_.isEmpty(allDocentes)) {
 
      httpResponse.findAll(allDocentes);
      return httpResponse;
    }

    httpResponse.emptyRecords();
    return httpResponse;
  }

  async getDocente(id: number) {}

  async createDocente(docente: IDocente) {
    const docenteRepository = getRepository(Docente);
    const departamentoRepository = getRepository(Departamento);
    const httpResponse = new HttpResponse();

    const departamentoDocente = await departamentoRepository.findOne(
      docente.idDepartamento

    );
    const existsDocente = await this.validateCodeDocente(
      docente.idDocenteCodigo
    );

    if (existsDocente) {
      if (departamentoDocente != undefined) {
          const newDocente = docenteRepository.create(docente);
          newDocente.departamento = departamentoDocente;
          const docenteCreated = await newDocente.save();
          httpResponse.create("docente", docenteCreated);
          return httpResponse;
      }
      httpResponse.errorDuplicated();
      return httpResponse;
    }else {
      httpResponse.errorNotFoundID('Docente', docente.idDocenteCodigo);
    }
    return httpResponse;
  }

  async disableDocente(idDocente: number) {
    const httpResponse = new HttpResponse();

    if (!_.isNaN(idDocente)) {

      

    }

    // doecenteToUpdate.estado = doecenteToUpdate.estado == 0 ? doecenteToUpdate.estado = 1 : doecenteToUpdate.estado = 0;
  }

  async updateDocente(idDocente: number, newDataDocente: IDocente) {
    const httpResponse = new HttpResponse();
    if (!_.isNaN(idDocente)) {
      const docenteRepository = getRepository(Docente);
      const departamentoRepository = getRepository(Departamento);
      const departamentoDocente = await departamentoRepository.findOne(
        newDataDocente.idDepartamento
      );
      const docenteToUpdate = await docenteRepository.findOne(idDocente);
      if (docenteToUpdate !== undefined) {
        docenteToUpdate.nombre = newDataDocente.nombre;
        docenteToUpdate.correo = newDataDocente.correo;
        docenteToUpdate.telefono = newDataDocente.telefono;
        if (departamentoDocente !== undefined) {
          docenteToUpdate.departamento = departamentoDocente;
        }
        docenteToUpdate.updatedAt = new Date();
        const {
          idDocenteCodigo,
          nombre,
          correo,
          telefono,
          departamento,
        } = await docenteToUpdate.save();
        httpResponse.update("Docente", {
          idDocenteCodigo,
          nombre,
          correo,
          telefono,
          departamento,
        });
        return httpResponse;
      }
      httpResponse.errorNotFoundID("Docente", idDocente);
      return httpResponse;
    }

    httpResponse.errorFormatInvalid(idDocente);
    return httpResponse;
  }

  async validateCodeDocente(idDocenteCodigo: number): Promise<boolean> {
    const docenteRepository = getRepository(Docente);
    const docenteFinded = await docenteRepository.findOne(idDocenteCodigo);
    return docenteFinded === undefined;
  }

  async existsDepartment(idDepartamento: number): Promise<boolean> {
    const departamentoRepository = getRepository(Departamento);
    const departamentoDocente = await departamentoRepository.findOne(
      idDepartamento
    );
    return departamentoDocente !== undefined;
  }
}

const docenteService = new DocenteService();
export default docenteService;
