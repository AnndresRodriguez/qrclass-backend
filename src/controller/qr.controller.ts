import { Request, Response, Router } from 'express';


class QRController {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async getDataScaQR(req: Request, res: Response){

    }

    async getDataScanQR(req: Request, res: Response){

    }

    async validateUserQR(req: Request, res: Response){

    }
 
    routes() {
        this.router.get("/", this.getDataScanQR);
        this.router.post("/", this.validateUserQR);   
    }
}

const qrController = new QRController();
export default qrController.router;