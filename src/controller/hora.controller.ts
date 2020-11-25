import { Request, Response, Router } from 'express';

import horaService from '../services/hora.service';

class HoraController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async assignHora(req: Request, res: Response){

    }

    async getAllHoras(req: Request, res: Response){

        const { operation, message, data } =  await horaService.getAllHours();
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });
    }

    async getHoraDocente(req: Request, res: Response){

    }

    async createHora(req: Request, res: Response){

    }

    routes() {
        this.router.get("/", this.getAllHoras); 
        this.router.get("/:id", this.getHoraDocente); 
        this.router.post("/", this.createHora); 
        this.router.post("/asignar", this.assignHora); 
    }
}

const horaController = new HoraController();
export default horaController.router;