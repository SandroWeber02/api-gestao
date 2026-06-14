import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createTurmaDisciplinaController,
  deleteTurmaDisciplinaController,
  getTurmaDisciplinaByIdController,
  listTurmaDisciplinasController,
} from "./turmaDisciplinas.controller";

const turmaDisciplinasRoutes = Router();

turmaDisciplinasRoutes.use(authMiddleware);
turmaDisciplinasRoutes.post("/", createTurmaDisciplinaController);
turmaDisciplinasRoutes.get("/", listTurmaDisciplinasController);
turmaDisciplinasRoutes.get("/:id", getTurmaDisciplinaByIdController);
turmaDisciplinasRoutes.delete("/:id", deleteTurmaDisciplinaController);

export default turmaDisciplinasRoutes;
