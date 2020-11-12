import { Request, Response, Router } from 'express';
import estudianteService from '../services/estudiante.service';

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

    getEstudiante(){

    }

    createEstudiante(req: Request, res: Response){

    }

    updateEstudiante(req: Request, res: Response){

    }

    desactivateEstudiante(req: Request, res: Response){

    }

    routes() {
        this.router.get("/", this.getAllEstudiantes);
        this.router.get("/:id", this.getEstudiante);
        this.router.post("/", this.createEstudiante);
        this.router.put("/", this.updateEstudiante);
        this.router.delete("/:id", this.desactivateEstudiante);
    }
}

const estudianteController = new EstudianteController();
export default estudianteController.router;