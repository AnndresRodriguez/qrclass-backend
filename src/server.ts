import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import compression from "compression";
import passport from 'passport';
import { config } from 'dotenv';
config();

require('./config/passport')
const cookieSession = require('cookie-session')

export default class Server {
    public app: express.Application;
    public port: number;
  
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
        //   database.conectionMySql();
        } catch (error) {
          console.log(error)
      };
    //   this.app.use(useragent.express());
      this.app.set("port", process.env.PORT || this.port || 3000);
      this.app.use(morgan("dev"));
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: false }));
      this.app.use(cors());
      this.app.use(helmet());
      this.app.use(compression());
      this.app.use(cookieSession({ name: 'qr-session', keys: [`${process.env.COOKIE}`]}))
      this.app.use(passport.initialize());
      this.app.use(passport.session());
  
    }
  
    routes(): void {

       this.app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
       
       this.app.get('/auth-error', (req, res) => {
          res.json({ auth: false })
       });

       this.app.get('/auth/google/callback', 
       passport.authenticate('google', { failureRedirect: '/auth-error' }),
       function(req, res) {
         res.json({ auth: true });
       });

      
    //   this.app.use(routes.indexController);
      this.app.use(express.static("public"));
    }
  
    start(): void {
      this.app.listen(this.app.get("port"), () => {
        console.log("Server listening on port", this.app.get("port"));
      });
    }
  }