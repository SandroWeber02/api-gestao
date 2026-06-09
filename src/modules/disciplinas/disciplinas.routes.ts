import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createDisciplinaController,
  deleteDisciplinaController,
  getDisciplinaByIdController,
  listDisciplinasController,
  updateDisciplinaController,
} from "./disciplinas.controller";

const disciplinasRoutes = Router();

disciplinasRoutes.use(authMiddleware);
disciplinasRoutes.post("/", createDisciplinaController);
disciplinasRoutes.get("/", listDisciplinasController);
disciplinasRoutes.get("/:id", getDisciplinaByIdController);
disciplinasRoutes.put("/:id", updateDisciplinaController);
disciplinasRoutes.delete("/:id", deleteDisciplinaController);

export default disciplinasRoutes;
