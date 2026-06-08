import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { getDashboardResumoController } from "./dashboard.controller";

const dashboardRoutes = Router();

dashboardRoutes.use(authMiddleware);
dashboardRoutes.get("/resumo", getDashboardResumoController);

export default dashboardRoutes;
