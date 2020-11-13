import { Request, Response, Router } from 'express';
import departamentoService from '../services/departamento.service';

class DepartamentoController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async getAllDepartamentos(req: Request, res: Response){

        const { operation, message, data } =  await departamentoService.getAllDepartamentos();
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    getDepartamento(req: Request, res: Response){

    }

    createDepartamento(req: Request, res: Response){

    }

    updateDepartamento(req: Request, res: Response){

    }

    desactivateDepartamento(req: Request, res: Response){

    }

    routes() {
        this.router.get("/", this.getAllDepartamentos);
        this.router.get("/:id", this.getDepartamento);
        this.router.post("/", this.createDepartamento);
        this.router.put("/", this.updateDepartamento);
        this.router.delete("/:id", this.desactivateDepartamento);
    }
}

const departamentoController = new DepartamentoController();
export default departamentoController.router;