import { Request, Response, Router } from 'express';


class ConfigController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async getConfiguracion(req: Request, res: Response){

    }

    async createConfiguracion(req: Request, res: Response){

    }

    async getConfiguracionByID(req: Request, res: Response){

    }

    async createListado(req: Request, res: Response){

    }

    async getListado(req: Request, res: Response){

    }

    async getListadoByID(req: Request, res: Response){

    }

    async createAdmin(req: Request, res: Response){
        
    }

    async updateAdmin(req: Request, res: Response){

    }

 
    routes() {

        this.router.get("/listado", this.getListado);
        this.router.get("/configuracion", this.getConfiguracion);
        this.router.get("/configuracion/:id", this.getConfiguracionByID);
        this.router.post("/listado", this.createListado);
        this.router.post("/listado/:id", this.getListadoByID);
        this.router.post("/configuracion", this.createConfiguracion);
      
    }
}

const configController = new ConfigController();
export default configController.router;