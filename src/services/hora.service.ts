
import _ from "lodash";
import { HttpResponse } from "../util/HttpResponse";
import { Hora } from '../models/hora.entity';

class HoraService {
  async getAllHours() {
    const httpResponse = new HttpResponse();
    const allHours = await Hora.getAllHours();

    if (!_.isEmpty(allHours)) {
      httpResponse.findAll(allHours);
      return httpResponse;
    }

    httpResponse.emptyRecords();
    return httpResponse;
  }
}

const adminService = new HoraService();
export default adminService;
