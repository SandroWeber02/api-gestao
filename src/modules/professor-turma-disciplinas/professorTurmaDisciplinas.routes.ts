import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createProfessorTurmaDisciplinaController,
  deleteProfessorTurmaDisciplinaController,
  getProfessorTurmaDisciplinaByIdController,
  listProfessorTurmaDisciplinasController,
} from "./professorTurmaDisciplinas.controller";

const professorTurmaDisciplinasRoutes = Router();

professorTurmaDisciplinasRoutes.use(authMiddleware);
professorTurmaDisciplinasRoutes.post("/", createProfessorTurmaDisciplinaController);
professorTurmaDisciplinasRoutes.get("/", listProfessorTurmaDisciplinasController);
professorTurmaDisciplinasRoutes.get("/:id", getProfessorTurmaDisciplinaByIdController);
professorTurmaDisciplinasRoutes.delete("/:id", deleteProfessorTurmaDisciplinaController);

export default professorTurmaDisciplinasRoutes;
