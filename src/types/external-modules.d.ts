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
    telefone: string | null;
    nacionalidade: string | null;
    naturalidade: string | null;
    identificacao_unica: string | null;
    certidao_nascimento: string | null;
    termo: string | null;
    folha: string | null;
    livro: string | null;
    data_emissao_certidao: Date | null;
    uf_cartorio: string | null;
    nome_cartorio: string | null;
    estado_civil: string | null;
    certidao_casamento: string | null;
    documento_identidade: string | null;
    data_expedicao_identidade: Date | null;
    uf_identidade: string | null;
    orgao_emissor_identidade: string | null;
    portaria_naturalizacao: string | null;
    condicao_aluno: string | null;
    cor_raca: string | null;
    mae_nome: string | null;
    mae_profissao: string | null;
    mae_local_trabalho: string | null;
    mae_telefone: string | null;
    pai_nome: string | null;
    pai_profissao: string | null;
    pai_local_trabalho: string | null;
    pai_telefone: string | null;
    aluno_mora_com_pais: boolean | null;
    tipo_moradia: string | null;
    participa_bolsa_familia: boolean | null;
    nis: string | null;
    bolsa_familia_nome: string | null;
    bolsa_familia_nacionalidade: string | null;
    bolsa_familia_naturalidade: string | null;
    bolsa_familia_nome_mae: string | null;
    bolsa_familia_nis: string | null;
    bolsa_familia_identidade: string | null;
    bolsa_familia_orgao_emissor: string | null;
    bolsa_familia_data_expedicao: Date | null;
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
    endereco: string | null;
    bairro: string | null;
    cep: string | null;
    telefone: string | null;
    telefone_trabalho: string | null;
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
    teve_doenca_grave: boolean | null;
    doenca_grave_qual: string | null;
    alergia_alimento_medicamento: boolean | null;
    alergia_qual: string | null;
    necessidades_educacionais_especiais: boolean | null;
    necessidades_qual: string | null;
    ativo: boolean;
    created_at: Date;
    updated_at: Date;
  };



  export type ContatoEmergencia = {
    id: string;
    aluno_id: string;
    nome: string;
    parentesco: string | null;
    telefone: string;
    observacao: string | null;
    ativo: boolean;
    created_at: Date;
    updated_at: Date;
  };



  export type Matricula = {
    id: string;
    aluno_id: string;
    turma_id: string;
    ano_letivo: number;
    modalidade_ensino: string | null;
    serie_ingresso: string | null;
    tipo_matricula: string | null;
    estabelecimento: string | null;
    periodo: string | null;
    data_matricula: Date;
    status: string;
    observacoes: string | null;
    documentos_entregues: string | null;
    documentos_faltantes: string | null;
    ativo: boolean;
    created_at: Date;
    updated_at: Date;
  };



  export type DocumentoMatricula = {
    id: string;
    aluno_id: string;
    matricula_id: string | null;
    tipo: string;
    nome_arquivo: string;
    arquivo_url: string;
    storage_path: string;
    status: string;
    ativo: boolean;
    uploaded_at: Date;
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
      create(args: { data: any }): Promise<Aluno>;
      findMany(args?: { where?: { ativo?: boolean }; orderBy?: { created_at?: "asc" | "desc" } }): Promise<Aluno[]>;
      findUnique(args: { where: { id?: string; cpf?: string } }): Promise<Aluno | null>;
      update(args: { where: { id: string }; data: any }): Promise<Aluno>;
    };
    responsavel: {
      create(args: { data: any }): Promise<Responsavel>;
      findMany(args?: { orderBy?: { created_at?: "asc" | "desc" } }): Promise<Responsavel[]>;
      findUnique(args: { where: { id?: string; cpf?: string } }): Promise<Responsavel | null>;
      update(args: { where: { id: string }; data: any }): Promise<Responsavel>;
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
      create(args: { data: any }): Promise<SaudeAluno>;
      findMany(args?: { orderBy?: { created_at?: "asc" | "desc" } }): Promise<SaudeAluno[]>;
      findUnique(args: { where: { id?: string; aluno_id?: string } }): Promise<SaudeAluno | null>;
      update(args: { where: { id: string }; data: any }): Promise<SaudeAluno>;
    };
    contatoEmergencia: {
      create(args: { data: { aluno_id: string; nome: string; parentesco?: string; telefone: string; observacao?: string; ativo?: boolean } }): Promise<ContatoEmergencia>;
      findMany(args?: { orderBy?: { created_at?: "asc" | "desc" } }): Promise<ContatoEmergencia[]>;
      findUnique(args: { where: { id?: string; aluno_id?: string } }): Promise<ContatoEmergencia | null>;
      update(args: { where: { id: string }; data: { aluno_id?: string; nome?: string; parentesco?: string; telefone?: string; observacao?: string; ativo?: boolean } }): Promise<ContatoEmergencia>;
    };
    matricula: {
      create(args: { data: any }): Promise<Matricula>;
      findMany(args?: { orderBy?: { created_at?: "asc" | "desc" } }): Promise<Matricula[]>;
      findUnique(args: { where: { id: string } }): Promise<Matricula | null>;
      findFirst(args: { where: { aluno_id: string; ano_letivo: number } }): Promise<Matricula | null>;
      update(args: { where: { id: string }; data: any }): Promise<Matricula>;
    };
    documentoMatricula: {
      create(args: { data: { aluno_id: string; matricula_id?: string; tipo: string; nome_arquivo: string; arquivo_url: string; storage_path: string; status?: string; ativo?: boolean } }): Promise<DocumentoMatricula>;
      findMany(args?: { orderBy?: { created_at?: "asc" | "desc" } }): Promise<DocumentoMatricula[]>;
      findUnique(args: { where: { id: string } }): Promise<DocumentoMatricula | null>;
      update(args: { where: { id: string }; data: { ativo?: boolean; status?: string } }): Promise<DocumentoMatricula>;
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


declare namespace Express {
  namespace Multer {
    type File = {
      originalname: string;
      mimetype: string;
      buffer: Buffer;
      size: number;
    };
  }
}

declare module "multer" {
  import { RequestHandler } from "express";

  type FileFilterCallback = (error: Error | null, acceptFile?: boolean) => void;

  type Options = {
    storage?: unknown;
    limits?: { fileSize?: number };
    fileFilter?: (req: unknown, file: Express.Multer.File, callback: FileFilterCallback) => void;
  };

  type MulterInstance = {
    single(fieldName: string): RequestHandler;
  };

  type MulterFactory = {
    (options?: Options): MulterInstance;
    memoryStorage(): unknown;
  };

  const multer: MulterFactory;
  export default multer;
}
