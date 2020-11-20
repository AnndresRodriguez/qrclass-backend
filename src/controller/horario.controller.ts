import { Request, Response, Router } from 'express';
import adminService from '../services/admin.service';
import { IAdmin } from '../models/interfaces/IAdmin';

class HorarioController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async assignSchedule(req: Request, res: Response){

    }

    routes() {
        this.router.post("/", this.assignSchedule); 
    }
}

const horarioController = new HorarioController();
export default horarioController.router;