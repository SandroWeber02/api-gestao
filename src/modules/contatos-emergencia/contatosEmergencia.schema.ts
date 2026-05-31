import { z } from "zod";

export const createContatoEmergenciaSchema = z.object({
  aluno_id: z.string().min(1, "aluno_id é obrigatório"),
  nome: z.string().min(1, "nome é obrigatório"),
  parentesco: z.string().optional(),
  telefone: z.string().min(1, "telefone é obrigatório"),
  observacao: z.string().optional(),
});

export const updateContatoEmergenciaSchema = z.object({
  aluno_id: z.string().optional(),
  nome: z.string().optional(),
  parentesco: z.string().optional(),
  telefone: z.string().optional(),
  observacao: z.string().optional(),
  ativo: z.boolean().optional(),
});

export const contatoEmergenciaIdParamSchema = z.object({
  id: z.string().min(1, "ID do contato de emergência inválido"),
});

export type CreateContatoEmergenciaInput = {
  aluno_id: string;
  nome: string;
  parentesco?: string;
  telefone: string;
  observacao?: string;
};

export type UpdateContatoEmergenciaInput = {
  aluno_id?: string;
  nome?: string;
  parentesco?: string;
  telefone?: string;
  observacao?: string;
  ativo?: boolean;
};
