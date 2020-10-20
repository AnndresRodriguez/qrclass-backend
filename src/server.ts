import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import compression from "compression";

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
  
    }
  
    routes(): void {
      
    //   this.app.use(routes.indexController);
      this.app.use(express.static("public"));
    }
  
    start(): void {
      this.app.listen(this.app.get("port"), () => {
        console.log("Server listening on port", this.app.get("port"));
      });
    }
  }