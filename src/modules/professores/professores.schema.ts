import { z } from "zod";

export const createProfessorSchema = z.object({
  usuario_id: z.string().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido").optional(),
  telefone: z.string().optional(),
  formacao: z.string().optional(),
});

export const updateProfessorSchema = z.object({
  usuario_id: z.string().optional(),
  nome: z.string().min(1, "Nome é obrigatório").optional(),
  email: z.string().email("E-mail inválido").optional(),
  telefone: z.string().optional(),
  formacao: z.string().optional(),
});

export const professorIdParamSchema = z.object({
  id: z.string().min(1, "ID do professor inválido"),
});

export type CreateProfessorInput = {
  usuario_id?: string;
  nome: string;
  email?: string;
  telefone?: string;
  formacao?: string;
};

export type UpdateProfessorInput = Partial<CreateProfessorInput>;
