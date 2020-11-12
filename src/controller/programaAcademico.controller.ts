import { Request, Response, Router } from 'express';
import programaAcademicoService from '../services/programaAcademico.service';

class ProgramaAcademicoController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async getAllProgramaAcademicos(req: Request, res: Response){

        const { operation, message, data } =  await programaAcademicoService.getAllProgramaAcademicos();
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });
        
    }

    getProgramaAcademico(req: Request, res: Response){

    }

    createProgramaAcademico(req: Request, res: Response){

    }

    updateProgramaAcademico(req: Request, res: Response){

    }

    desactivateProgramaAcademico(req: Request, res: Response){

    }

    routes() {
        this.router.get("/", this.getAllProgramaAcademicos);
        this.router.get("/:id", this.getProgramaAcademico);
        this.router.post("/", this.createProgramaAcademico);
        this.router.put("/", this.updateProgramaAcademico);
        this.router.delete("/:id", this.desactivateProgramaAcademico);
    }
}

const programaAcademicoController = new ProgramaAcademicoController();
export default programaAcademicoController.router;