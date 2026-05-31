import { Router } from "express";

const healthRoutes = Router();

healthRoutes.get("/health", (_req, res) => {
  res.json({
    success: true,
    data: {
      status: "ok",
    },
  });
});

export default healthRoutes;
