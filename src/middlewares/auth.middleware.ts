import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AuthenticatedRequest } from "../modules/auth/auth.controller";

type JwtPayload = {
  id: string;
  email: string;
  perfil: "admin" | "professor";
};

export function authMiddleware(req: Request, res: Response, next: NextFunction): Response | void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "Token não informado" });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ success: false, message: "Token inválido" });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    (req as AuthenticatedRequest).user = {
      id: decoded.id,
      email: decoded.email,
      perfil: decoded.perfil,
    };

    next();
  } catch {
    return res.status(401).json({ success: false, message: "Token inválido ou expirado" });
  }
}
