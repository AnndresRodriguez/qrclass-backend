import { Request, Response, Router } from 'express';
import docenteService from '../services/docente.service';

class DocenteController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async getAllDocentes(req: Request, res: Response){

        const { operation, message, data } =  await docenteService.getAllDocentes();
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    getDocente(req: Request, res: Response){

    }

    createDocente(req: Request, res: Response){

    }

    updateDocente(req: Request, res: Response){

    }

    desactivateDocente(req: Request, res: Response){

    }

    routes() {
        this.router.get("/", this.getAllDocentes);
        this.router.get("/:id", this.getDocente);
        this.router.post("/", this.createDocente);
        this.router.put("/", this.updateDocente);
        this.router.delete("/:id", this.desactivateDocente);
    }
}

const docenteController = new DocenteController();
export default docenteController.router;