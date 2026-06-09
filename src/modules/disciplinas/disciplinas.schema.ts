import { z } from "zod";

export const createDisciplinaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  codigo: z.string().optional(),
  carga_horaria: z.coerce.number().optional(),
});

export const updateDisciplinaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").optional(),
  codigo: z.string().optional(),
  carga_horaria: z.coerce.number().optional(),
});

export const disciplinaIdParamSchema = z.object({ id: z.string().min(1, "ID da disciplina inválido") });

export type CreateDisciplinaInput = { nome: string; codigo?: string; carga_horaria?: number };
export type UpdateDisciplinaInput = Partial<CreateDisciplinaInput>;
