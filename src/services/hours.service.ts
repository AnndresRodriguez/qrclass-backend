import { Admin } from "./../models/admin.entity";
import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IAdmin } from "../models/interfaces/IAdmin";

class HoraService {
  async getAllHours() {
    const httpResponse = new HttpResponse();
    const allAdmins = await Admin.getAllAdmins();

    if (!_.isEmpty(allAdmins)) {
      httpResponse.findAll(allAdmins);
      return httpResponse;
    }

    httpResponse.emptyRecords();
    return httpResponse;
  }

  async getAdmin(id: number) {
    const httpResponse = new HttpResponse();
    const adminRepository = getRepository(Admin);
    const admin = await adminRepository.findOne(id);

    if (admin !== undefined) {
      httpResponse.findOne(admin);
      return httpResponse;
    }

    httpResponse.errorNotFoundID("Admin", id);
    return httpResponse;
  }

  async createAdmin(admin: IAdmin) {
    const adminRepository = getRepository(Admin);
    const httpResponse = new HttpResponse();
    const existsAdmin = await this.validateDocumentAdmin(admin.documento);

    if (!existsAdmin) {
      const newAdmin = adminRepository.create(admin);
      const adminCreated = await newAdmin.save();
      httpResponse.create("Admin", adminCreated);
      return httpResponse;
    }

    httpResponse.errorDuplicated();
    return httpResponse;
  }

  async updateAdmin(idAdmin: number, newDataAdmin: IAdmin) {
    const httpResponse = new HttpResponse();
    if (_.isNumber(+idAdmin)) {
      const adminRepository = getRepository(Admin);
      const adminToUpdate = await adminRepository.findOne(idAdmin);

      if (adminToUpdate !== undefined) {
        const adminToSave = await this.setDataAdmin(adminToUpdate, newDataAdmin);
        const adminUpdated = await adminToSave.save();
        httpResponse.update("Admin", adminUpdated);
        return httpResponse;
      }
      httpResponse.errorNotFoundID("Docente", idAdmin);
      return httpResponse;
    }

    httpResponse.errorFormatInvalid(idAdmin);
    return httpResponse;
  }

  async desactivateAdmin(idAdmin: number) {
    const httpResponse = new HttpResponse();
    if (_.isNumber(+idAdmin)) {
      const adminRepository = getRepository(Admin);
      const adminToDisable = await adminRepository.findOne(idAdmin);
      if (adminToDisable !== undefined) {
        adminToDisable.estado =
          adminToDisable.estado == 0
            ? (adminToDisable.estado = 1)
            : (adminToDisable.estado = 0);

        const adminDisabled = await adminToDisable.save();
        httpResponse.update("admin", adminDisabled);
        return httpResponse;
      }

      httpResponse.errorNotFoundID("admin", idAdmin);
      return httpResponse;
    }

    httpResponse.errorFormatInvalid(idAdmin);
    return httpResponse;
  }

  async setDataAdmin(currentAdmin: Admin, newDataAdmin: IAdmin) {
    currentAdmin.documento = newDataAdmin.documento;
    currentAdmin.nombrecompleto = newDataAdmin.nombrecompleto;
    currentAdmin.correo = newDataAdmin.correo;
    currentAdmin.telefono = newDataAdmin.telefono;
    currentAdmin.estado = newDataAdmin.estado;
    currentAdmin.updatedAt = new Date();
    return currentAdmin;
  }

  async validateDocumentAdmin(documento: string): Promise<boolean> {
    const docenteRepository = getRepository(Admin);
    const docenteFinded = await docenteRepository.find({
      where: { documento: documento },
    });
    return !_.isEmpty(docenteFinded);
  }
}

const adminService = new HoraService();
export default adminService;
