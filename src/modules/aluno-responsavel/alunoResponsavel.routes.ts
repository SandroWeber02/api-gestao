import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createAlunoResponsavelController,
  deleteAlunoResponsavelController,
  getAlunoResponsavelByIdController,
  listAlunoResponsavelController,
  updateAlunoResponsavelController,
} from "./alunoResponsavel.controller";

const alunoResponsavelRoutes = Router();

alunoResponsavelRoutes.use(authMiddleware);
alunoResponsavelRoutes.post("/", createAlunoResponsavelController);
alunoResponsavelRoutes.get("/", listAlunoResponsavelController);
alunoResponsavelRoutes.get("/:id", getAlunoResponsavelByIdController);
alunoResponsavelRoutes.put("/:id", updateAlunoResponsavelController);
alunoResponsavelRoutes.delete("/:id", deleteAlunoResponsavelController);

export default alunoResponsavelRoutes;
