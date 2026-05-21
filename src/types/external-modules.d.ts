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
