import { z } from "zod";

export const createSaudeAlunoSchema = z.object({
  aluno_id: z.string().min(1, "aluno_id é obrigatório"),
  alergias: z.string().optional(),
  medicamentos: z.string().optional(),
  necessidades_especiais: z.string().optional(),
  convenio_medico: z.boolean().optional(),
  nome_convenio: z.string().optional(),
  numero_carteirinha: z.string().optional(),
  observacoes: z.string().optional(),
});

export const updateSaudeAlunoSchema = z.object({
  aluno_id: z.string().optional(),
  alergias: z.string().optional(),
  medicamentos: z.string().optional(),
  necessidades_especiais: z.string().optional(),
  convenio_medico: z.boolean().optional(),
  nome_convenio: z.string().optional(),
  numero_carteirinha: z.string().optional(),
  observacoes: z.string().optional(),
  ativo: z.boolean().optional(),
});

export const saudeAlunoIdParamSchema = z.object({
  id: z.string().min(1, "ID do cadastro de saúde inválido"),
});

export type CreateSaudeAlunoInput = {
  aluno_id: string;
  alergias?: string;
  medicamentos?: string;
  necessidades_especiais?: string;
  convenio_medico?: boolean;
  nome_convenio?: string;
  numero_carteirinha?: string;
  observacoes?: string;
};

export type UpdateSaudeAlunoInput = {
  aluno_id?: string;
  alergias?: string;
  medicamentos?: string;
  necessidades_especiais?: string;
  convenio_medico?: boolean;
  nome_convenio?: string;
  numero_carteirinha?: string;
  observacoes?: string;
  ativo?: boolean;
};
