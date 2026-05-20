import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "../modules/auth/auth.routes";

const routes = Router();

routes.use(healthRoutes);
routes.use("/auth", authRoutes);

export default routes;
