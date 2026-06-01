import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createEnderecoController,
  deleteEnderecoController,
  getEnderecoByIdController,
  listEnderecosController,
  updateEnderecoController,
} from "./enderecos.controller";

const enderecosRoutes = Router();

enderecosRoutes.use(authMiddleware);
enderecosRoutes.post("/", createEnderecoController);
enderecosRoutes.get("/", listEnderecosController);
enderecosRoutes.get("/:id", getEnderecoByIdController);
enderecosRoutes.put("/:id", updateEnderecoController);
enderecosRoutes.delete("/:id", deleteEnderecoController);

export default enderecosRoutes;
