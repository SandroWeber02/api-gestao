import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "../modules/auth/auth.routes";
import turmasRoutes from "../modules/turmas/turmas.routes";

const routes = Router();

routes.use(healthRoutes);
routes.use("/auth", authRoutes);
routes.use("/turmas", turmasRoutes);

export default routes;
