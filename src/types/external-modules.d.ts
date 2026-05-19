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
  export class PrismaClient {
    constructor(options?: { log?: Array<"query" | "info" | "warn" | "error"> });
  }
}

declare module "zod" {
  type SafeParseSuccess<T> = { success: true; data: T };
  type SafeParseFailure = { success: false; error: { flatten(): { fieldErrors: Record<string, string[]> } } };
  type SafeParseResult<T> = SafeParseSuccess<T> | SafeParseFailure;

  interface ZodType<T> {
    default(value: T): ZodType<T>;
    min(value: number, message?: string): ZodType<T>;
  }

  interface ZodObject<T> {
    safeParse(input: unknown): SafeParseResult<T>;
  }

  export const z: {
    object: <T extends Record<string, unknown>>(shape: T) => ZodObject<any>;
    enum: (values: readonly string[]) => ZodType<string>;
    coerce: { number: () => ZodType<number> };
    string: () => ZodType<string>;
  };
}
