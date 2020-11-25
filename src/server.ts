import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import compression from "compression";
import passport from 'passport';
import { config } from 'dotenv';
import routes from './controller'
import database from './config/datebase';

config();
const cookieSession = require('cookie-session');



export default class Server {
    public app: express.Application;
    public port: number;
    public auth: boolean = false;
  
    constructor(portUser: number) {
      this.app = express();
      this.port = portUser;
      this.config();
      this.routes();
    }
  
    static init(port: number): Server {
      return new Server(port);
    }
  
    config(): void {
  
      dotenv.config();
      try {
          database.conectionMySql();
        } catch (error) {
          console.log(error)
      };
      this.app.set("port", process.env.PORT || this.port || 3000);
      this.app.use(morgan("dev"));
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: false }));
      this.app.use(cors());
      this.app.use(helmet());
      this.app.use(compression());
      this.app.use(cookieSession({ name: 'qr-session', keys: [`${process.env.COOKIE}`]}))
  
    }
  
    routes(): void {

      this.app.use('/auth', routes.authController);
      this.app.use('/admin', routes.adminController);
      this.app.use('/docentes', routes.docenteController);
      this.app.use('/estudiantes', routes.estudianteController);
      this.app.use('/directores', routes.directorController);
      this.app.use('/materias', routes.materiasController);
      this.app.use('/programa-academicos', routes.programaAcademicoController);
      this.app.use('/departamentos', routes.departamentoController);
      this.app.use('/clases', routes.claseController);
      this.app.use(express.static("public"));
    }
  
    start(): void {
      this.app.listen(this.app.get("port"), () => {
        console.log("Server listening on port", this.app.get("port"));
      });
    }
  }