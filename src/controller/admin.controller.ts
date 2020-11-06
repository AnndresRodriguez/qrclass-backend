import { Request, Response, Router } from 'express';

class AdminController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    getAllAdmins(req: Request, res: Response){

    }

    getAdmin(){

    }

    createAdmin(req: Request, res: Response){

    }

    updateAdmin(req: Request, res: Response){

    }

    desactivateAdmin(req: Request, res: Response){

    }

    routes() {
        this.router.get("/", this.getAllAdmins);
        this.router.get("/:id", this.getAdmin);
        this.router.post("/", this.createAdmin);
        this.router.put("/", this.updateAdmin);
        this.router.delete("/:id", this.desactivateAdmin);
    }
}

const adminController = new AdminController();
export default adminController.router;