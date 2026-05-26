declare module "cors" {
  import { RequestHandler } from "express";
  interface CorsOptions {
    origin?: boolean | string | RegExp | (string | RegExp)[];
    credentials?: boolean;
  }
  function cors(options?: CorsOptions): RequestHandler;
  export default cors;
}

declare module "@prisma/client" {
  export type Perfil = "admin" | "professor";
  export type Usuario = {
    id: string;
    nome: string;
    email: string;
    senha: string;
    perfil: Perfil;
    ativo: boolean;
    created_at: Date;
    updated_at: Date;
  };


  export type Aluno = {
    id: string;
    nome: string;
    data_nascimento: Date | null;
    cpf: string | null;
    rg_certidao: string | null;
    sexo: string | null;
    tipo: string | null;
    ativo: boolean;
    created_at: Date;
    updated_at: Date;
  };



  export type Responsavel = {
    id: string;
    nome: string;
    cpf: string | null;
    rg: string | null;
    celular: string | null;
    telefone_fixo: string | null;
    email: string | null;
    profissao: string | null;
    local_trabalho: string | null;
    telefone_comercial: string | null;
    ativo: boolean;
    created_at: Date;
    updated_at: Date;
  };



  export type AlunoResponsavel = {
    id: string;
    aluno_id: string;
    responsavel_id: string;
    tipo: string;
    parentesco: string | null;
    responsavel_financeiro: boolean;
    autorizado_retirada: boolean;
    ativo: boolean;
    created_at: Date;
    updated_at: Date;
  };



  export type Endereco = {
    id: string;
    aluno_id: string;
    cep: string | null;
    logradouro: string | null;
    numero: string | null;
    complemento: string | null;
    bairro: string | null;
    cidade: string | null;
    estado: string | null;
    ativo: boolean;
    created_at: Date;
    updated_at: Date;
  };



  export type SaudeAluno = {
    id: string;
    aluno_id: string;
    alergias: string | null;
    medicamentos: string | null;
    necessidades_especiais: string | null;
    convenio_medico: boolean;
    nome_convenio: string | null;
    numero_carteirinha: string | null;
    observacoes: string | null;
    ativo: boolean;
    created_at: Date;
    updated_at: Date;
  };

  export class PrismaClient {
    usuario: {
      findUnique(args: { where: { email?: string; id?: string } }): Promise<Usuario | null>;
      create(args: { data: { nome: string; email: string; senha: string; perfil: Perfil } }): Promise<Usuario>;
    };
    turma: {
      create(args: { data: { nome: string; ano_letivo: number; periodo: string; ativo?: boolean } }): Promise<any>;
      findMany(args?: { orderBy?: { created_at?: "asc" | "desc" } }): Promise<any[]>;
      findUnique(args: { where: { id: string } }): Promise<any | null>;
      update(args: { where: { id: string }; data: { nome?: string; ano_letivo?: number; periodo?: string; ativo?: boolean } }): Promise<any>;
    };
    aluno: {
      create(args: { data: { nome: string; data_nascimento?: Date; cpf?: string; rg_certidao?: string; sexo?: string; tipo?: string; ativo?: boolean } }): Promise<Aluno>;
      findMany(args?: { where?: { ativo?: boolean }; orderBy?: { created_at?: "asc" | "desc" } }): Promise<Aluno[]>;
      findUnique(args: { where: { id?: string; cpf?: string } }): Promise<Aluno | null>;
      update(args: { where: { id: string }; data: { nome?: string; data_nascimento?: Date; cpf?: string; rg_certidao?: string; sexo?: string; tipo?: string; ativo?: boolean } }): Promise<Aluno>;
    };
    responsavel: {
      create(args: { data: { nome: string; cpf?: string; rg?: string; celular?: string; telefone_fixo?: string; email?: string; profissao?: string; local_trabalho?: string; telefone_comercial?: string; ativo?: boolean } }): Promise<Responsavel>;
      findMany(args?: { orderBy?: { created_at?: "asc" | "desc" } }): Promise<Responsavel[]>;
      findUnique(args: { where: { id?: string; cpf?: string } }): Promise<Responsavel | null>;
      update(args: { where: { id: string }; data: { nome?: string; cpf?: string; rg?: string; celular?: string; telefone_fixo?: string; email?: string; profissao?: string; local_trabalho?: string; telefone_comercial?: string; ativo?: boolean } }): Promise<Responsavel>;
    };
    alunoResponsavel: {
      create(args: { data: { aluno_id: string; responsavel_id: string; tipo: string; parentesco?: string; responsavel_financeiro?: boolean; autorizado_retirada?: boolean; ativo?: boolean } }): Promise<AlunoResponsavel>;
      findMany(args?: { orderBy?: { created_at?: "asc" | "desc" } }): Promise<AlunoResponsavel[]>;
      findUnique(args: { where: { id: string } }): Promise<AlunoResponsavel | null>;
      findFirst(args: { where: { aluno_id: string; responsavel_id: string } }): Promise<AlunoResponsavel | null>;
      update(args: { where: { id: string }; data: { aluno_id?: string; responsavel_id?: string; tipo?: string; parentesco?: string; responsavel_financeiro?: boolean; autorizado_retirada?: boolean; ativo?: boolean } }): Promise<AlunoResponsavel>;
    };
    endereco: {
      create(args: { data: { aluno_id: string; cep?: string; logradouro?: string; numero?: string; complemento?: string; bairro?: string; cidade?: string; estado?: string; ativo?: boolean } }): Promise<Endereco>;
      findMany(args?: { orderBy?: { created_at?: "asc" | "desc" } }): Promise<Endereco[]>;
      findUnique(args: { where: { id?: string; aluno_id?: string } }): Promise<Endereco | null>;
      update(args: { where: { id: string }; data: { aluno_id?: string; cep?: string; logradouro?: string; numero?: string; complemento?: string; bairro?: string; cidade?: string; estado?: string; ativo?: boolean } }): Promise<Endereco>;
    };
    saudeAluno: {
      create(args: { data: { aluno_id: string; alergias?: string; medicamentos?: string; necessidades_especiais?: string; convenio_medico?: boolean; nome_convenio?: string; numero_carteirinha?: string; observacoes?: string; ativo?: boolean } }): Promise<SaudeAluno>;
      findMany(args?: { orderBy?: { created_at?: "asc" | "desc" } }): Promise<SaudeAluno[]>;
      findUnique(args: { where: { id?: string; aluno_id?: string } }): Promise<SaudeAluno | null>;
      update(args: { where: { id: string }; data: { aluno_id?: string; alergias?: string; medicamentos?: string; necessidades_especiais?: string; convenio_medico?: boolean; nome_convenio?: string; numero_carteirinha?: string; observacoes?: string; ativo?: boolean } }): Promise<SaudeAluno>;
    };
    constructor(options?: { log?: Array<"query" | "info" | "warn" | "error"> });
  }
}

declare module "bcrypt" {
  export function hash(data: string, saltOrRounds: number): Promise<string>;
  export function compare(data: string, encrypted: string): Promise<boolean>;
}

declare module "jsonwebtoken" {
  export function sign(payload: object, secret: string, options?: { expiresIn?: string }): string;
  export function verify(token: string, secret: string): string | object;
}

declare module "zod" {
  export class ZodError extends Error {}
  export type SafeParseSuccess<T> = { success: true; data: T };
  export type SafeParseFailure = { success: false; error: { flatten(): { fieldErrors: Record<string, string[]> } } };
  export type SafeParseResult<T> = SafeParseSuccess<T> | SafeParseFailure;

  export interface ZodType<T> {
    default(value: T): ZodType<T>;
    min(value: number, message?: string): ZodType<T>;
    email(message?: string): ZodType<T>;
    parse(input: unknown): T;
    optional(): ZodType<T | undefined>;
  }

  export interface ZodObject<T> {
    safeParse(input: unknown): SafeParseResult<T>;
    parse(input: unknown): T;
    optional(): ZodType<T | undefined>;
  }

  export const z: {
    object: <T extends Record<string, unknown>>(shape: T) => ZodObject<{ [K in keyof T]: T[K] extends ZodType<infer U> ? U : unknown }>;
    enum: <T extends readonly [string, ...string[]]>(values: T) => ZodType<T[number]>;
    coerce: { number: () => ZodType<number> };
    string: () => ZodType<string>;
    boolean: () => ZodType<boolean>;
  };
}
