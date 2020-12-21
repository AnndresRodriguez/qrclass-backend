import { Request, Response, Router } from 'express';
import { IAsistencia } from '../models/interfaces/IAsistencia';
import asistenciaService from '../services/asistencia.service';


class AsistenciaController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async createAsistencia(req: Request, res: Response){

        const dataAsistencia: IAsistencia = req.body;

        const { operation, message, data } =  await asistenciaService.createAsistenciaEstudiante(dataAsistencia);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async updateAsistencia(req: Request, res: Response){

        const dataAsistencia: IAsistencia = req.body;

        const { operation, message, data } =  await asistenciaService.updateAsistenciaEstudiante(dataAsistencia);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    // async getDataScanQR(req: Request, res: Response){

    //     const { operation, message, data } =  await qrService.getScan();
    //     operation
    //      ? res.status(200).json({ operation, message, data })
    //      : res.status(202).json({ operation, message });

    // }


 
    routes() {
        // this.router.get("/", this.getDataScanQR);
        this.router.post("/", this.createAsistencia);   
        this.router.put("/", this.updateAsistencia);   
    }
}

const asistenciaController = new AsistenciaController();
export default asistenciaController.router;