import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createTurmaController,
  deleteTurmaController,
  getTurmaByIdController,
  listTurmasController,
  listAlunosByTurmaController,
  updateTurmaController,
} from "./turmas.controller";
import { listDisciplinasByTurmaController } from "../turma-disciplinas/turmaDisciplinas.controller";

const turmasRoutes = Router();

turmasRoutes.use(authMiddleware);
turmasRoutes.post("/", createTurmaController);
turmasRoutes.get("/", listTurmasController);
turmasRoutes.get("/:id/alunos", listAlunosByTurmaController);
turmasRoutes.get("/:id/disciplinas", listDisciplinasByTurmaController);
turmasRoutes.get("/:id", getTurmaByIdController);
turmasRoutes.put("/:id", updateTurmaController);
turmasRoutes.delete("/:id", deleteTurmaController);

export default turmasRoutes;
