import authController from "./auth.controller";
import docenteController from './docente.controller';
import estudianteController from './estudiante.controller';
import programaAcademicoController from "./programaAcademico.controller";
import departamentoController from './departamento.controller';

const routes = {
  authController,
  docenteController,
  estudianteController,
  programaAcademicoController,
  departamentoController
};

export default routes;
