import { z } from "zod";

export const createResponsavelSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().optional(),
  rg: z.string().optional(),
  celular: z.string().optional(),
  telefone_fixo: z.string().optional(),
  email: z.string().optional(),
  profissao: z.string().optional(),
  local_trabalho: z.string().optional(),
  telefone_comercial: z.string().optional(),
});

export const updateResponsavelSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").optional(),
  cpf: z.string().optional(),
  rg: z.string().optional(),
  celular: z.string().optional(),
  telefone_fixo: z.string().optional(),
  email: z.string().optional(),
  profissao: z.string().optional(),
  local_trabalho: z.string().optional(),
  telefone_comercial: z.string().optional(),
  ativo: z.boolean().optional(),
});

export const responsavelIdParamSchema = z.object({
  id: z.string().min(1, "ID do responsável inválido"),
});

export type CreateResponsavelInput = {
  nome: string;
  cpf?: string;
  rg?: string;
  celular?: string;
  telefone_fixo?: string;
  email?: string;
  profissao?: string;
  local_trabalho?: string;
  telefone_comercial?: string;
};

export type UpdateResponsavelInput = {
  nome?: string;
  cpf?: string;
  rg?: string;
  celular?: string;
  telefone_fixo?: string;
  email?: string;
  profissao?: string;
  local_trabalho?: string;
  telefone_comercial?: string;
  ativo?: boolean;
};
