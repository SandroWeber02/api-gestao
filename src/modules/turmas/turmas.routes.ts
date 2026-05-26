import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createTurmaController,
  deleteTurmaController,
  getTurmaByIdController,
  listTurmasController,
  updateTurmaController,
} from "./turmas.controller";

const turmasRoutes = Router();

turmasRoutes.use(authMiddleware);
turmasRoutes.post("/", createTurmaController);
turmasRoutes.get("/", listTurmasController);
turmasRoutes.get("/:id", getTurmaByIdController);
turmasRoutes.put("/:id", updateTurmaController);
turmasRoutes.delete("/:id", deleteTurmaController);

export default turmasRoutes;
