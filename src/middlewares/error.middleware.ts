import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AuthError } from "../modules/auth/auth.errors";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error(error);

  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Dados inválidos",
    });
    return;
  }

  if (error instanceof AuthError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof Error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
  });
}
