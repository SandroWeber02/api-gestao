import { Request, Response } from "express";
import { getDashboardResumoService } from "./dashboard.service";

export async function getDashboardResumoController(_req: Request, res: Response) {
  const resumo = await getDashboardResumoService();

  return res.json({
    success: true,
    data: resumo,
  });
}
