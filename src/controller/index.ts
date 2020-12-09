import authController from "./auth.controller";
import docenteController from './docente.controller';
import estudianteController from './estudiante.controller';
import programaAcademicoController from "./programaAcademico.controller";
import departamentoController from './departamento.controller';
import adminController from './admin.controller';
import directorController from './director.controller';
import materiasController from './materia.controller';
import claseController from './clase.controller';
import horaController from './hora.controller';
import qrController from './qr.controller';
import asistenciaController from './asistencia.controller';



const routes = {
  authController,
  docenteController,
  estudianteController,
  programaAcademicoController,
  departamentoController,
  adminController,
  directorController,
  materiasController,
  claseController,
  horaController,
  qrController,
  asistenciaController
};

export default routes;
