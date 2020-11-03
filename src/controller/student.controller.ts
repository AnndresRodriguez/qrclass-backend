import { Request, Response, Router } from 'express';

class StudentController {

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
        this.router.get("/", this.getAllStudents);
        this.router.get("/:id", this.getStudent);
        // this.router.post("/", this.createStudent);
        // this.router.put("/", this.updateStudent);
        // this.router.delete("/:id", this.desactivateStudent);
      }
}

const studentController = new StudentController();
export default studentController.router;