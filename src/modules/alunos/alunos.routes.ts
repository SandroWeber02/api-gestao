import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createAlunoController,
  deleteAlunoController,
  getAlunoByIdController,
  listAlunosController,
  updateAlunoController,
} from "./alunos.controller";

const alunosRoutes = Router();

alunosRoutes.use(authMiddleware);
alunosRoutes.post("/", createAlunoController);
alunosRoutes.get("/", listAlunosController);
alunosRoutes.get("/:id", getAlunoByIdController);
alunosRoutes.put("/:id", updateAlunoController);
alunosRoutes.delete("/:id", deleteAlunoController);

export default alunosRoutes;
