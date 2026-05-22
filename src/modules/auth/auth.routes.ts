import { Router } from "express";
import { loginController, meController, registerController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.get("/me", authMiddleware, meController);

export default authRoutes;
