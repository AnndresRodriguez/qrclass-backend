import { Request, Response, Router } from 'express';
import { IEstudiante } from 'models/interfaces/IEstudiante';
import directorService from '../services/director.service';
import { IDirector } from './../models/interfaces/IDirector';

class DirectorController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async getAllDirectors(req: Request, res: Response){

        const { operation, message, data } =  await directorService.getAllDirectors();
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async getDirector(req: Request, res: Response){

        const { operation, message, data } =  await directorService.getDirector(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async createDirector(req: Request, res: Response){

        const dataNewDirector: IDirector = req.body;
        const { operation, message, data } =  await directorService.createDirector(dataNewDirector);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });
    }

    async updateDirector(req: Request, res: Response){

        const directorToUpdate: IDirector = req.body

        const { operation, message, data } =  await directorService.updateDirector(directorToUpdate.id, directorToUpdate);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async desactivateDirector(req: Request, res: Response){

        // const { operation, message, data } =  await directorService.changeStatusDirector(parseInt(req.params.id));
        // operation
        //  ? res.status(200).json({ operation, message, data })
        //  : res.status(202).json({ operation, message });

    }

    async findDirectorByEmail(req: Request, res: Response){

        const { operation, message, data } =  await directorService.validateEmailDirector(req.body.email)
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async enrollStudents(req: Request, res: Response){

        const studentsToEnroll: Array<IEstudiante> = req.body.estudiantes;

        console.log('studentsToEntroll', studentsToEnroll)

        const { operation, message, data } =  await directorService.enrollStudents(studentsToEnroll)
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async finishSemester(req: Request, res: Response){

        const { operation, message, data } =  await directorService.finishSemester()
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    routes() {
        this.router.get("/", this.getAllDirectors);
        this.router.get("/:id", this.getDirector);
        this.router.post("/", this.createDirector);
        this.router.post("/email", this.findDirectorByEmail);
        this.router.post("/registrar-estudiantes", this.enrollStudents);
        this.router.post("/finalizar-semestre", this.finishSemester);
        this.router.put("/", this.updateDirector);
        this.router.delete("/:id", this.desactivateDirector);
    }
}

const directorController = new DirectorController();
export default directorController.router;