import { Admin } from "./../models/admin.entity";
import { getRepository } from "typeorm";
import fp from "lodash/fp";
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { IAdmin } from "../models/interfaces/IAdmin";

class AdminService {
  async getAllAdmins() {
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
    const existEmailAdmin = await this.validateEmailExistsAdmin(admin.correo);

    if (!existsAdmin) {
      if(!existEmailAdmin){
        const newAdmin = adminRepository.create(admin);
        const adminCreated = await newAdmin.save();
        httpResponse.create("Admin", adminCreated);
        return httpResponse;
      }

      httpResponse.errorFieldDuplicated('Email', admin.correo);
      return httpResponse;
    }

    httpResponse.errorFieldDuplicated('Document', admin.documento);
    return httpResponse;
  }

  async updateAdmin(idAdmin: number, newDataAdmin: IAdmin) {
    const httpResponse = new HttpResponse();
    const adminRepository = getRepository(Admin);
    const adminToUpdate = await adminRepository.findOne(idAdmin);
      

    if (adminToUpdate !== undefined) {

        const modifyDocumentAdmin = await this.validateModifyAdminDocument(newDataAdmin.documento, adminToUpdate.documento);
        const modifyEmailAdmin = await this.validateModifyAdminEmail(newDataAdmin.correo, adminToUpdate.correo);
        
        console.log(`${modifyDocumentAdmin} && ${modifyEmailAdmin}`, modifyDocumentAdmin && modifyEmailAdmin)

        if(modifyDocumentAdmin && modifyEmailAdmin){
          
          const existDocumentAdmin = await this.validateDocumentAdmin(newDataAdmin.documento);
          const existEmailAdmin = await this.validateDocumentAdmin(newDataAdmin.correo);

          if(!existDocumentAdmin){
            if(!existEmailAdmin){

              const adminToSave = await this.setDataAdmin(adminToUpdate, newDataAdmin);
              const adminUpdated = await adminToSave.save();
              httpResponse.update("Admin", adminUpdated);
              return httpResponse;

            }

            httpResponse.errorFieldDuplicated('Email', adminToUpdate.documento);
            return httpResponse;

          }

          httpResponse.errorFieldDuplicated('Document', adminToUpdate.documento);
          return httpResponse;

        }

        else if(modifyDocumentAdmin){
            
            const existDocumentAdmin = await this.validateDocumentAdmin(newDataAdmin.documento);

            console.log('existDocumentAdmin', existDocumentAdmin )
    
            if(!existDocumentAdmin){
              const adminToSave = await this.setDataAdmin(adminToUpdate, newDataAdmin);
              const adminUpdated = await adminToSave.save();
              httpResponse.update("Admin", adminUpdated);
              return httpResponse;
            }

            httpResponse.errorFieldDuplicated('Document', adminToUpdate.documento);
            return httpResponse;
          
        }

        else {
            const existEmailAdmin = await this.validateEmailExistsAdmin(newDataAdmin.correo);

            if(!existEmailAdmin){
              const adminToSave = await this.setDataAdmin(adminToUpdate, newDataAdmin);
              const adminUpdated = await adminToSave.save();
              httpResponse.update("Admin", adminUpdated);
              return httpResponse;
            }

            httpResponse.errorFieldDuplicated('Email', adminToUpdate.documento);
            return httpResponse;
            
        }
    
      }
      httpResponse.errorNotFoundID("Admin", idAdmin);
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
    const adminRepository = getRepository(Admin);
    const adminFinded = await adminRepository.find({
      where: { documento: documento },
    });
    console.log(documento);
    console.log(adminFinded);
    return !_.isEmpty(adminFinded);
  }

  async validateEmailExistsAdmin(adminEmail: string): Promise<boolean> {
    const adminRepository = getRepository(Admin);
    const adminFinded = await adminRepository.find({
      where: { correo: adminEmail },
    });
    return !_.isEmpty(adminFinded);
  }

  async validateModifyAdminDocument(newDocument: string, currentDocument: string ){

    const adminRepository = getRepository(Admin);
    const adminFinded = await adminRepository.findOne({
      where: { documento: newDocument },
    });

    if(adminFinded !== undefined){
         return adminFinded.documento !== currentDocument;
    }

    return true
  }

  async validateModifyAdminEmail(newEmail: string, currentEmail: string ){

    const adminRepository = getRepository(Admin);
    const adminFinded = await adminRepository.findOne({
      where: { correo: newEmail },
    });

    if(adminFinded !== undefined){
         return adminFinded.correo !== currentEmail;
    }

    return true
  }



  async validateEmailAdmin(adminEmail: string){

    const httpResponse = new HttpResponse();
    const adminRepository = getRepository(Admin);
    const adminFinded = await adminRepository.findOne({ where: { correo: adminEmail }});

    if(adminFinded !== undefined){
        httpResponse.findOne({ id: adminFinded.id });
        return httpResponse;
    }

    httpResponse.errorNotRecordFound('admin', 'Email', adminEmail);
    return httpResponse;
  
  }
}

const adminService = new AdminService();
export default adminService;
