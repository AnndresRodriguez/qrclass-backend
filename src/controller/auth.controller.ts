import { Request, Response, Router } from 'express';

class AuthController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    login(req: Request, res: Response){


    }

    failure(req: Request, res: Response){

    }

    routes() {
        this.router.get("/google", this.login);
        this.router.get("/google/callback", this.failure);
      }
}

const studentController = new AuthController();
export default studentController.router;