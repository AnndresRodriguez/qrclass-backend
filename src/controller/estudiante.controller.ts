import { Request, Response, Router } from 'express';
import estudianteService from '../services/estudiante.service';
import { IEstudiante } from '../models/interfaces/IEstudiante';

class EstudianteController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async getAllEstudiantes(req: Request, res: Response){
        const { operation, message, data } =  await estudianteService.getAllEstudiantes();
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message }); 
    }

    async getEstudiante(req: Request, res: Response){

        const { operation, message, data } =  await estudianteService.getEstudiante(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async createEstudiante(req: Request, res: Response){

        const newAdmin: IEstudiante = req.body;
        const { operation, message, data } =  await estudianteService.createEstudiante(newAdmin);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async updateEstudiante(req: Request, res: Response){

        const newEstudiante: IEstudiante = req.body;
        const { operation, message, data } =  await estudianteService.updateEstudiante(parseInt(req.body.idEstudiante), newEstudiante);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async desactivateEstudiante(req: Request, res: Response){

        const { operation, message, data } =  await estudianteService.disableEstudiante(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async findEstudianteByEmail(req: Request, res: Response){

        const { operation, message, data } =  await estudianteService.validateEmailEstudiante(req.body.email)
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    routes() {
        this.router.get("/", this.getAllEstudiantes);
        this.router.get("/:id", this.getEstudiante);
        this.router.post("/", this.createEstudiante);
        this.router.post("/email", this.findEstudianteByEmail);
        this.router.put("/", this.updateEstudiante);
        this.router.delete("/:id", this.desactivateEstudiante);
    }
}

const estudianteController = new EstudianteController();
export default estudianteController.router;