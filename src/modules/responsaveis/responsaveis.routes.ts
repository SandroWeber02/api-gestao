import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createResponsavelController,
  deleteResponsavelController,
  getResponsavelByIdController,
  listResponsaveisController,
  updateResponsavelController,
} from "./responsaveis.controller";

const responsaveisRoutes = Router();

responsaveisRoutes.use(authMiddleware);
responsaveisRoutes.post("/", createResponsavelController);
responsaveisRoutes.get("/", listResponsaveisController);
responsaveisRoutes.get("/:id", getResponsavelByIdController);
responsaveisRoutes.put("/:id", updateResponsavelController);
responsaveisRoutes.delete("/:id", deleteResponsavelController);

export default responsaveisRoutes;
