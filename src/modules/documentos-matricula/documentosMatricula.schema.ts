import { z } from "zod";

export const uploadDocumentoMatriculaSchema = z.object({
  aluno_id: z.string().min(1, "aluno_id é obrigatório"),
  matricula_id: z.string().optional(),
  tipo: z.enum([
    "certidao_nascimento",
    "cpf",
    "rg",
    "comprovante_residencia",
    "declaracao_escolar",
    "carteira_vacinacao",
    "contrato",
    "outro",
  ]),
});

export const documentoMatriculaIdParamSchema = z.object({
  id: z.string().min(1, "ID do documento inválido"),
});

export type UploadDocumentoMatriculaInput = {
  aluno_id: string;
  matricula_id?: string;
  tipo:
    | "certidao_nascimento"
    | "cpf"
    | "rg"
    | "comprovante_residencia"
    | "declaracao_escolar"
    | "carteira_vacinacao"
    | "contrato"
    | "outro";
};
