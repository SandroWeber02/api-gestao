import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createSaudeAlunoController,
  deleteSaudeAlunoController,
  getSaudeAlunoByIdController,
  listSaudeAlunoController,
  updateSaudeAlunoController,
} from "./saudeAluno.controller";

const saudeAlunoRoutes = Router();

saudeAlunoRoutes.use(authMiddleware);
saudeAlunoRoutes.post("/", createSaudeAlunoController);
saudeAlunoRoutes.get("/", listSaudeAlunoController);
saudeAlunoRoutes.get("/:id", getSaudeAlunoByIdController);
saudeAlunoRoutes.put("/:id", updateSaudeAlunoController);
saudeAlunoRoutes.delete("/:id", deleteSaudeAlunoController);

export default saudeAlunoRoutes;
