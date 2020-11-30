import { Request, Response, Router } from 'express';
import estudianteService from '../services/estudiante.service';
import materiaService from '../services/materia.service';
import { IEstudiante } from '../models/interfaces/IEstudiante';
import { IMateria } from '../models/interfaces/IMateria';

class MateriaController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async getAllMaterias(req: Request, res: Response){
        const { operation, message, data } =  await materiaService.getAllMaterias();
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message }); 
    }

    async getMateria(req: Request, res: Response){

        const { operation, message, data } =  await materiaService.getMateria(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message }); 

    }

    async getMateriaByDocente(req: Request, res: Response){

        const { operation, message, data } =  await materiaService.getMateriasByDocente(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async createMateria(req: Request, res: Response){

        const newMateria: IMateria = req.body;
        const { operation, message, data } =  await materiaService.createMateria(newMateria);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async updateMateria(req: Request, res: Response){

        const newMateria: IMateria = req.body;

        const { operation, message, data } =  await materiaService.updateMateria(newMateria.id, newMateria);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async desactivateMateria(req: Request, res: Response){

        const { operation, message, data } =  await estudianteService.disableEstudiante(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async getEstudiantesByMateria(req: Request, res: Response){

        const { operation, message, data } =  await materiaService.getEstudiantesMateria(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    routes() {
        this.router.get("/", this.getAllMaterias);
        this.router.get("/:id", this.getMateria);
        this.router.get("/estudiantes/:id", this.getEstudiantesByMateria);
        this.router.post("/:id", this.getMateriaByDocente);
        this.router.post("/", this.createMateria);
        this.router.put("/", this.updateMateria);
        this.router.delete("/:id", this.desactivateMateria);
    }
}

const estudianteController = new MateriaController();
export default estudianteController.router;