import { Request, Response, Router } from 'express';

class ProgramController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    getAllPrograms(req: Request, res: Response){
        
    }

    getProgram(req: Request, res: Response){

    }

    createProgram(req: Request, res: Response){

    }

    updateProgram(req: Request, res: Response){

    }

    desactivateProgram(req: Request, res: Response){

    }

    routes() {
        this.router.get("/", this.getAllPrograms);
        this.router.get("/:id", this.getProgram);
        this.router.post("/", this.createProgram);
        this.router.put("/", this.updateProgram);
        this.router.delete("/:id", this.desactivateProgram);
    }
}

const programController = new ProgramController();
export default programController.router;