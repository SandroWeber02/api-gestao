import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createMatriculaController,
  deleteMatriculaController,
  getMatriculaByIdController,
  listMatriculasController,
  updateMatriculaController,
} from "./matriculas.controller";

const matriculasRoutes = Router();

matriculasRoutes.use(authMiddleware);
matriculasRoutes.post("/", createMatriculaController);
matriculasRoutes.get("/", listMatriculasController);
matriculasRoutes.get("/:id", getMatriculaByIdController);
matriculasRoutes.put("/:id", updateMatriculaController);
matriculasRoutes.delete("/:id", deleteMatriculaController);

export default matriculasRoutes;
