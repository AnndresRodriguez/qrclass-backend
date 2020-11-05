import { Request, Response, Router } from 'express';

class TeacherController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    getAllTeachers(req: Request, res: Response){

    }

    getTeacher(req: Request, res: Response){

    }

    createTeacher(req: Request, res: Response){

    }

    updateTeacher(req: Request, res: Response){

    }

    desactivateTeacher(req: Request, res: Response){

    }

    routes() {
        this.router.get("/", this.getAllTeachers);
        this.router.get("/:id", this.getTeacher);
        this.router.post("/", this.createTeacher);
        this.router.put("/", this.updateTeacher);
        this.router.delete("/:id", this.desactivateTeacher);
    }
}

const teacherController = new TeacherController();
export default teacherController.router;