import { Request, Response } from "express";
import { loginService, meService, registerService } from "./auth.service";
import { LoginInput, loginSchema, RegisterInput, registerSchema } from "./auth.schema";

export type AuthenticatedRequest = Request & {
  user: {
    id: string;
    email: string;
    perfil: "admin" | "professor";
  };
};

export async function registerController(req: Request, res: Response): Promise<Response> {
  const data = registerSchema.parse(req.body) as RegisterInput;
  const usuario = await registerService(data);

  return res.status(201).json({
    success: true,
    data: usuario,
  });
}

export async function loginController(req: Request, res: Response): Promise<Response> {
  const data = loginSchema.parse(req.body) as LoginInput;
  const result = await loginService(data);

  return res.json({
    success: true,
    data: result,
  });
}

export async function meController(req: Request, res: Response): Promise<Response> {
  const authReq = req as AuthenticatedRequest;
  const usuario = await meService(authReq.user.id);

  return res.json({
    success: true,
    data: usuario,
  });
}
