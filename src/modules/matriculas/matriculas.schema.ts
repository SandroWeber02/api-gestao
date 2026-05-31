import { z } from "zod";

export const createMatriculaSchema = z.object({
  aluno_id: z.string().min(1, "aluno_id é obrigatório"),
  turma_id: z.string().min(1, "turma_id é obrigatório"),
  ano_letivo: z.coerce.number().min(1, "ano_letivo é obrigatório"),
  periodo: z.string().optional(),
  data_matricula: z.string().optional(),
  status: z.string().optional(),
  observacoes: z.string().optional(),
});

export const updateMatriculaSchema = z.object({
  aluno_id: z.string().optional(),
  turma_id: z.string().optional(),
  ano_letivo: z.coerce.number().optional(),
  periodo: z.string().optional(),
  data_matricula: z.string().optional(),
  status: z.string().optional(),
  observacoes: z.string().optional(),
  ativo: z.boolean().optional(),
});

export const matriculaIdParamSchema = z.object({
  id: z.string().min(1, "ID da matrícula inválido"),
});

export type CreateMatriculaInput = {
  aluno_id: string;
  turma_id: string;
  ano_letivo: number;
  periodo?: string;
  data_matricula?: string;
  status?: string;
  observacoes?: string;
};

export type UpdateMatriculaInput = {
  aluno_id?: string;
  turma_id?: string;
  ano_letivo?: number;
  periodo?: string;
  data_matricula?: string;
  status?: string;
  observacoes?: string;
  ativo?: boolean;
};
