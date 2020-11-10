import { Request, Response, Router } from "express";
import url from 'url';
import {
  login,
  setCredentials,
  removeCredentials,
  redirectUrl
} from "../services/auth.service";

class AuthController {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  getUrlLogin(req: Request, res: Response){
    res.json({ url: redirectUrl });

  }

  async login(req: Request, res: Response) {
    const code = req.query.code;
    const responseLogin = await setCredentials(code);
    const dataLogin = await login(responseLogin);   
    res.json({ dataLogin });
  }

  logout(req: Request, res: Response) {
    removeCredentials();
  }

  routes() {
    this.router.get("/", this.getUrlLogin);
    this.router.get("/google/callback", this.login);
    this.router.get("/logout", this.logout);
  }
}

const authController = new AuthController();
export default authController.router;
