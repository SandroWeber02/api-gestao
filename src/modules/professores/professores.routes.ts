import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createProfessorController,
  deleteProfessorController,
  getProfessorByIdController,
  listProfessoresController,
  updateProfessorController,
} from "./professores.controller";
import {
  listDisciplinasByProfessorController,
  listTurmasByProfessorController,
} from "../professor-turma-disciplinas/professorTurmaDisciplinas.controller";

const professoresRoutes = Router();

professoresRoutes.use(authMiddleware);
professoresRoutes.post("/", createProfessorController);
professoresRoutes.get("/", listProfessoresController);
professoresRoutes.get("/:id/turmas", listTurmasByProfessorController);
professoresRoutes.get("/:id/disciplinas", listDisciplinasByProfessorController);
professoresRoutes.get("/:id", getProfessorByIdController);
professoresRoutes.put("/:id", updateProfessorController);
professoresRoutes.delete("/:id", deleteProfessorController);

export default professoresRoutes;
