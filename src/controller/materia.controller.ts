import { Request, Response, Router } from 'express';
import estudianteService from '../services/estudiante.service';
import materiaService from '../services/materia.service';
import { IEstudiante } from '../models/interfaces/IEstudiante';
import { IMateria } from '../models/interfaces/IMateria';
import { v1 as uuidv1 } from "uuid";
import { createURLFile } from '../libs/tools';
import path from 'path';

class MateriaController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async getAllMaterias(req: Request, res: Response){
        const { operation, message, data } =  await materiaService.getAllMaterias();
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message }); 
    }

    async getMateria(req: Request, res: Response){

        const { operation, message, data } =  await materiaService.getMateria(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message }); 

    }

    async getMateriaByDocente(req: Request, res: Response){

        const { operation, message, data } =  await materiaService.getMateriasByDocente(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async createMateria(req: Request, res: Response){

        const newMateria: IMateria = req.body;
        const { operation, message, data } =  await materiaService.createMateria(newMateria);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async updateMateria(req: Request, res: Response){

        const newMateria: IMateria = req.body;

        const { operation, message, data } =  await materiaService.updateMateria(newMateria.id, newMateria);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async desactivateMateria(req: Request, res: Response){

        const { operation, message, data } =  await estudianteService.disableEstudiante(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async getEstudiantesByMateria(req: Request, res: Response){

        const { operation, message, data } =  await materiaService.getEstudiantesMateria(parseInt(req.params.id));
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async loadStudentsByMateria(req: Request, res: Response){
    
        if(req.files != undefined){

            const filesupload: any = req.files!.excel;

            const urlsFile:any = await new Promise((resolve, reject) =>{

                const idimage = uuidv1()
                console.log(filesupload.mv)

                const pathExcel = `${__dirname}${createURLFile(`${process.env.PATH_FILE}`, 
                idimage, 
                filesupload.name)}`

                filesupload.mv(
                    `${__dirname}${createURLFile(`${process.env.PATH_FILE}`, 
                    idimage, 
                    filesupload.name )}`,
                    (error:any) => {
                            if(error){
                              reject(error)
                            }else{
                              

                              resolve({ 
                                  urlHost: `${__dirname}${createURLFile(`${process.env.PATH_FILE}`, 
                              idimage, 
                              filesupload.name )}`,
                              urlPath: pathExcel
                            })

                            }
                    })
            });

            const { operation, message, data } = await materiaService.createDinamicStudents(urlsFile.urlPath, parseInt(req.body.idMateria))

            operation
             ? res.status(200).json({ operation, message, data })
             : res.status(202).json({ operation, message });



            // res.json({ dataUrls: urlsFile });

        }
        

    }

    routes() {
        this.router.get("/", this.getAllMaterias);
        this.router.get("/:id", this.getMateria);
        this.router.get("/estudiantes/:id", this.getEstudiantesByMateria);
        this.router.get("/docente/:id", this.getMateriaByDocente);
        this.router.post("/", this.createMateria);
        this.router.post("/files", this.loadStudentsByMateria);
        this.router.put("/", this.updateMateria);
        this.router.delete("/:id", this.desactivateMateria);
    }
}

const estudianteController = new MateriaController();
export default estudianteController.router;