import { z } from "zod";

export const createTurmaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  ano_letivo: z.coerce.number().min(1, "Ano letivo é obrigatório"),
  periodo: z.string().min(1, "Período é obrigatório"),
});

export const updateTurmaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").optional(),
  ano_letivo: z.coerce.number().min(1, "Ano letivo inválido").optional(),
  periodo: z.string().min(1, "Período é obrigatório").optional(),
});

export const turmaIdParamSchema = z.object({
  id: z.string().min(1, "ID da turma inválido"),
});

export type CreateTurmaInput = { nome: string; ano_letivo: number; periodo: string; ativo?: boolean };
export type UpdateTurmaInput = { nome?: string; ano_letivo?: number; periodo?: string; ativo?: boolean };
