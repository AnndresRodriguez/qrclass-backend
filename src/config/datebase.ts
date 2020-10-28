import { createConnection } from "typeorm";
import env from "../config/environments";

class Database {
  constructor() {}

  async conectionMySql() {
    const connection = await createConnection()
      .then(() => {
        console.log("Connection to MySql create Sucessfully");
      })
      .catch((err) => {
        console.log(err);
        console.log({
          message:
            "Invalid credentials, check PORT, HOST, USERNAME, PASSWORD or DATABASE_NAME to access",
          error: err.errno,
          host: err.address,
          port: err.port,
        });
      });
  }
}

export default new Database();