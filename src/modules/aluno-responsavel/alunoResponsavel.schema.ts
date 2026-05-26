import { z } from "zod";

export const createAlunoResponsavelSchema = z.object({
  aluno_id: z.string().min(1, "aluno_id é obrigatório"),
  responsavel_id: z.string().min(1, "responsavel_id é obrigatório"),
  tipo: z.string().min(1, "tipo é obrigatório"),
  parentesco: z.string().optional(),
  responsavel_financeiro: z.boolean().optional(),
  autorizado_retirada: z.boolean().optional(),
});

export const updateAlunoResponsavelSchema = z.object({
  aluno_id: z.string().optional(),
  responsavel_id: z.string().optional(),
  tipo: z.string().optional(),
  parentesco: z.string().optional(),
  responsavel_financeiro: z.boolean().optional(),
  autorizado_retirada: z.boolean().optional(),
  ativo: z.boolean().optional(),
});

export const alunoResponsavelIdParamSchema = z.object({
  id: z.string().min(1, "ID do vínculo inválido"),
});

export type CreateAlunoResponsavelInput = {
  aluno_id: string;
  responsavel_id: string;
  tipo: string;
  parentesco?: string;
  responsavel_financeiro?: boolean;
  autorizado_retirada?: boolean;
};

export type UpdateAlunoResponsavelInput = {
  aluno_id?: string;
  responsavel_id?: string;
  tipo?: string;
  parentesco?: string;
  responsavel_financeiro?: boolean;
  autorizado_retirada?: boolean;
  ativo?: boolean;
};
