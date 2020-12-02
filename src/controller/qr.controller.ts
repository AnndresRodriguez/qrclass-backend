import { Request, Response, Router } from 'express';
import qrService from '../services/qrscan.service';
import { IScan } from '../models/interfaces/IScan';


class QRController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async createDataQR(req: Request, res: Response){

        const dataScan: IScan = req.body;

        const { operation, message, data } =  await qrService.createDataQR(dataScan);
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }

    async getDataScanQR(req: Request, res: Response){

        const { operation, message, data } =  await qrService.getScan();
        operation
         ? res.status(200).json({ operation, message, data })
         : res.status(202).json({ operation, message });

    }


 
    routes() {
        this.router.get("/", this.getDataScanQR);
        this.router.post("/", this.createDataQR);   
    }
}

const qrController = new QRController();
export default qrController.router;