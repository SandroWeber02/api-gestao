import { z } from "zod";

export const registerSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  perfil: z.enum(["admin", "professor"]),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(1, "Senha é obrigatória"),
});

export type RegisterInput = {
  nome: string;
  email: string;
  senha: string;
  perfil: "admin" | "professor";
};

export type LoginInput = {
  email: string;
  senha: string;
};
