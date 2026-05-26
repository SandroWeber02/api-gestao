import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createContatoEmergenciaController,
  deleteContatoEmergenciaController,
  getContatoEmergenciaByIdController,
  listContatosEmergenciaController,
  updateContatoEmergenciaController,
} from "./contatosEmergencia.controller";

const contatosEmergenciaRoutes = Router();

contatosEmergenciaRoutes.use(authMiddleware);
contatosEmergenciaRoutes.post("/", createContatoEmergenciaController);
contatosEmergenciaRoutes.get("/", listContatosEmergenciaController);
contatosEmergenciaRoutes.get("/:id", getContatoEmergenciaByIdController);
contatosEmergenciaRoutes.put("/:id", updateContatoEmergenciaController);
contatosEmergenciaRoutes.delete("/:id", deleteContatoEmergenciaController);

export default contatosEmergenciaRoutes;
