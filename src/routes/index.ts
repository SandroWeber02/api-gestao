import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "../modules/auth/auth.routes";
import turmasRoutes from "../modules/turmas/turmas.routes";
import alunosRoutes from "../modules/alunos/alunos.routes";
import responsaveisRoutes from "../modules/responsaveis/responsaveis.routes";

const routes = Router();

routes.use(healthRoutes);
routes.use("/auth", authRoutes);
routes.use("/turmas", turmasRoutes);
routes.use("/alunos", alunosRoutes);
routes.use("/responsaveis", responsaveisRoutes);

export default routes;
