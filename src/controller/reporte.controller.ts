import { Request, Response, Router } from 'express';


class ReporteController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async getAllReportes(req: Request, res: Response){

    }

    async getReportePrograma(req: Request, res: Response){

    }

    async getReporteEstudiante(req: Request, res: Response){

    }

    async getReporteMateria(req: Request, res: Response){

    }


    routes() {
        this.router.post("/", this.getReporteEstudiante);
        this.router.post("/", this.getReporteMateria);   
    }
}

const reporteController = new ReporteController();
export default reporteController.router;