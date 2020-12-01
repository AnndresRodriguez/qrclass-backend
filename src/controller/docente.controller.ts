import { Request, Response, Router } from 'express';
import docenteService from '../services/docente.service';
import { IDocente } from '../models/interfaces/IDocente';

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

    

    async getDocente(req: Request, res: Response){

        const { operation, message, data } =  await docenteService.getDocente(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async createDocente(req: Request, res: Response){

        const dataNewDocente: IDocente = req.body;
        const { operation, message, data } =  await docenteService.createDocente(dataNewDocente);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });
    }

    async updateDocente(req: Request, res: Response){

        const docenteToUpdate: IDocente = req.body

        console.log('docenteToUpdate.id', docenteToUpdate.id);

        const { operation, message, data } =  await docenteService.updateDocente(docenteToUpdate.id, docenteToUpdate);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });


    }

    async desactivateDocente(req: Request, res: Response){

        const { operation, message, data } =  await docenteService.changeStatusDocente(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async findDocenteByEmail(req: Request, res: Response){

        const { operation, message, data } =  await docenteService.validateEmailDocente(req.body.email)
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }



    routes() {
        this.router.get("/", this.getAllDocentes);
        this.router.get("/:id", this.getDocente);
        this.router.post("/", this.createDocente);
        this.router.post("/email", this.findDocenteByEmail);
        this.router.put("/", this.updateDocente);
        this.router.delete("/:id", this.desactivateDocente);
    }
}

const docenteController = new DocenteController();
export default docenteController.router;