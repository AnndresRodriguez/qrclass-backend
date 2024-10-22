import { Request, Response, Router } from 'express';
import claseService from '../services/clase.service';
import { IClase } from '../models/interfaces/IClase';
import { IHorario } from 'models/interfaces/IHorario';

class ClaseController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    // async getAllClases(req: Request, res: Response){

    //     const { operation, message, data } =  await claseService.getAllClases();
    //     operation
    //      ? res.status(200).json({ operation, message, data })
    //      : res.status(202).json({ operation, message });

    // }

    async getClase(req: Request, res: Response){

        // const { operation, message, data } =  await ClaseService.getClase(parseInt(req.params.id));
        // operation
        //  ? res.status(200).json({ operation, message, data })
        //  : res.status(202).json({ operation, message });

    }

    async createClase(req: Request, res: Response){

        const dataHorario: Array<IHorario> = req.body.dataHorario;

        const { operation, message, data } = await claseService.createClase(parseInt(req.body.idMateria),
        parseInt(req.body.idDocente), dataHorario)
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });
    }

    async updateClase(req: Request, res: Response){

        // const newClase: IClase = req.body;
        // const { operation, message, data } =  await ClaseService.updateClase(newClase.id, newClase);
        // operation
        //  ? res.status(200).json({ operation, message, data })
        //  : res.status(202).json({ operation, message });

    }

    async desactivateClase(req: Request, res: Response){

        // const { operation, message, data } =  await ClaseService.desactivateClase(parseInt(req.params.id));
        // operation
        //  ? res.status(200).json({ operation, message, data })
        //  : res.status(202).json({ operation, message });

    }

    routes() {
        // this.router.get("/", this.getAllClases);
        this.router.get("/:id", this.getClase);
        this.router.post("/", this.createClase);
        this.router.put("/", this.updateClase);
        this.router.delete("/:id", this.desactivateClase);
    }
}

const claseController = new ClaseController();
export default claseController.router;