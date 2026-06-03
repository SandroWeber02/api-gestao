import { z } from "zod";

export const alunoCompletoSchema = z.object({
  aluno: z.object({
    nome: z.string().min(1, "Nome é obrigatório").optional(),
    data_nascimento: z.string().optional(),
    cpf: z.string().optional(),
    rg_certidao: z.string().optional(),
    sexo: z.string().optional(),
    tipo: z.string().optional(),
  }).optional(),
  responsavel: z.object({
    nome: z.string().min(1, "Nome do responsável é obrigatório").optional(),
    cpf: z.string().optional(),
    rg: z.string().optional(),
    celular: z.string().optional(),
    telefone_fixo: z.string().optional(),
    email: z.string().optional(),
    profissao: z.string().optional(),
    local_trabalho: z.string().optional(),
    telefone_comercial: z.string().optional(),
  }).optional(),
  relacao: z.object({
    tipo: z.string().min(1, "Tipo de responsável é obrigatório").optional(),
    parentesco: z.string().optional(),
    responsavel_financeiro: z.boolean().optional(),
    autorizado_retirada: z.boolean().optional(),
  }).optional(),
  endereco: z.object({
    cep: z.string().optional(),
    logradouro: z.string().optional(),
    numero: z.string().optional(),
    complemento: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
  }).optional(),
  saude: z.object({
    alergias: z.string().optional(),
    medicamentos: z.string().optional(),
    necessidades_especiais: z.string().optional(),
    convenio_medico: z.boolean().optional(),
    nome_convenio: z.string().optional(),
    numero_carteirinha: z.string().optional(),
    observacoes: z.string().optional(),
  }).optional(),
  emergencia: z.object({
    nome: z.string().min(1, "Nome do contato de emergência é obrigatório").optional(),
    parentesco: z.string().optional(),
    telefone: z.string().min(1, "Telefone do contato de emergência é obrigatório").optional(),
    observacao: z.string().optional(),
  }).optional(),
  matricula: z.object({
    turma_id: z.string().optional(),
    ano_letivo: z.coerce.number().optional(),
    periodo: z.string().optional(),
    data_matricula: z.string().optional(),
    status: z.string().optional(),
    observacoes: z.string().optional(),
  }).optional(),
});

export type AlunoCompletoInput = {
  aluno?: {
    nome?: string;
    data_nascimento?: string;
    cpf?: string;
    rg_certidao?: string;
    sexo?: string;
    tipo?: string;
  };
  responsavel?: {
    nome?: string;
    cpf?: string;
    rg?: string;
    celular?: string;
    telefone_fixo?: string;
    email?: string;
    profissao?: string;
    local_trabalho?: string;
    telefone_comercial?: string;
  };
  relacao?: {
    tipo?: string;
    parentesco?: string;
    responsavel_financeiro?: boolean;
    autorizado_retirada?: boolean;
  };
  endereco?: {
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
  };
  saude?: {
    alergias?: string;
    medicamentos?: string;
    necessidades_especiais?: string;
    convenio_medico?: boolean;
    nome_convenio?: string;
    numero_carteirinha?: string;
    observacoes?: string;
  };
  emergencia?: {
    nome?: string;
    parentesco?: string;
    telefone?: string;
    observacao?: string;
  };
  matricula?: {
    turma_id?: string;
    ano_letivo?: number;
    periodo?: string;
    data_matricula?: string;
    status?: string;
    observacoes?: string;
  };
};
