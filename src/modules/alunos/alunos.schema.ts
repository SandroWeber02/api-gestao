import { z } from "zod";

export const createAlunoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  data_nascimento: z.string().optional(),
  cpf: z.string().optional(),
  rg_certidao: z.string().optional(),
  sexo: z.string().optional(),
  tipo: z.string().optional(),
});

export const updateAlunoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").optional(),
  data_nascimento: z.string().optional(),
  cpf: z.string().optional(),
  rg_certidao: z.string().optional(),
  sexo: z.string().optional(),
  tipo: z.string().optional(),
  ativo: z.boolean().optional(),
});

export const alunoIdParamSchema = z.object({
  id: z.string().min(1, "ID do aluno inválido"),
});

export type CreateAlunoInput = {
  nome: string;
  data_nascimento?: string;
  cpf?: string;
  rg_certidao?: string;
  sexo?: string;
  tipo?: string;
};

export type UpdateAlunoInput = {
  nome?: string;
  data_nascimento?: string;
  cpf?: string;
  rg_certidao?: string;
  sexo?: string;
  tipo?: string;
  ativo?: boolean;
};
