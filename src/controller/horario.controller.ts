import { Request, Response, Router } from 'express';

class HorarioController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async assignHorario(req: Request, res: Response){

    }

    async getHorario(req: Request, res: Response){

    }

    async getHorarioDocente(req: Request, res: Response){

    }

    async createHorario(req: Request, res: Response){

    }



    routes() {
        this.router.get("/", this.getHorario); 
        this.router.get("/:id", this.getHorarioDocente); 
        this.router.post("/", this.createHorario); 
        this.router.post("/asignar", this.assignHorario); 
    }
}

const horarioController = new HorarioController();
export default horarioController.router;