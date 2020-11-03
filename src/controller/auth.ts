import { Request, Response, Router } from 'express';

class AuthController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    getAllStudents(req: Request, res: Response){


    }

    getStudent(){

    }

    routes() {
        this.router.get("/google", this.getAllStudents);
        this.router.get("/google/callback", this.getAllStudents);

        // this.router.post("/", this.createStudent);
        // this.router.put("/", this.updateStudent);
        // this.router.delete("/:id", this.desactivateStudent);
      }
}

const studentController = new AuthController();
export default studentController.router;