import { Request, Response, Router } from 'express';
import adminService from '../services/admin.service';
import { IAdmin } from '../models/interfaces/IAdmin';

class AdminController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async getAllAdmins(req: Request, res: Response){

        const { operation, message, data } =  await adminService.getAllAdmins();
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async getAdmin(req: Request, res: Response){

        const { operation, message, data } =  await adminService.getAdmin(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async createAdmin(req: Request, res: Response){

        const newAdmin: IAdmin = req.body;
        const { operation, message, data } =  await adminService.createAdmin(newAdmin);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(406).json({ operation, message });
    }

    async updateAdmin(req: Request, res: Response){

        const newAdmin: IAdmin = req.body;
        const { operation, message, data } =  await adminService.updateAdmin(newAdmin.id, newAdmin);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async desactivateAdmin(req: Request, res: Response){

        const { operation, message, data } =  await adminService.desactivateAdmin(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async findAdminByEmail(req: Request, res: Response){

        const { operation, message, data } =  await adminService.validateEmailAdmin(req.body.email)
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    routes() {
        this.router.get("/", this.getAllAdmins);
        this.router.get("/:id", this.getAdmin);
        this.router.post("/", this.createAdmin);
        this.router.post("/email", this.findAdminByEmail);
        this.router.put("/", this.updateAdmin);
        this.router.delete("/:id", this.desactivateAdmin);
    }
}

const adminController = new AdminController();
export default adminController.router;