import { z } from "zod";

export const createEnderecoSchema = z.object({
  aluno_id: z.string().min(1, "aluno_id é obrigatório"),
  cep: z.string().optional(),
  logradouro: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
});

export const updateEnderecoSchema = z.object({
  aluno_id: z.string().optional(),
  cep: z.string().optional(),
  logradouro: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  ativo: z.boolean().optional(),
});

export const enderecoIdParamSchema = z.object({
  id: z.string().min(1, "ID do endereço inválido"),
});

export type CreateEnderecoInput = {
  aluno_id: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
};

export type UpdateEnderecoInput = {
  aluno_id?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  ativo?: boolean;
};
