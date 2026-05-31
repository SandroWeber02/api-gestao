import { createClient } from "@supabase/supabase-js";
import { env } from "../../config/env";
import { AuthError } from "../auth/auth.errors";
import { findAlunoById } from "../alunos/alunos.repository";
import { findMatriculaById } from "../matriculas/matriculas.repository";
import {
  createDocumentoMatricula,
  findDocumentoMatriculaById,
  listDocumentosMatricula,
  updateDocumentoMatricula,
} from "./documentosMatricula.repository";
import { UploadDocumentoMatriculaInput } from "./documentosMatricula.schema";

const supabaseStorage = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

function sanitizeFileName(fileName: string): string {
  return fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "-");
}

export async function uploadDocumentoMatriculaService(input: UploadDocumentoMatriculaInput, file?: Express.Multer.File) {
  if (!file) {
    throw new AuthError("Arquivo PDF é obrigatório", 400);
  }

  const aluno = await findAlunoById(input.aluno_id);
  if (!aluno || !aluno.ativo) {
    throw new AuthError("Aluno não encontrado", 404);
  }

  if (input.matricula_id) {
    const matricula = await findMatriculaById(input.matricula_id);
    if (!matricula || !matricula.ativo) {
      throw new AuthError("Matrícula não encontrada", 404);
    }
  }

  const timestamp = Date.now();
  const nomeArquivo = file.originalname;
  const storagePath = `alunos/${input.aluno_id}/${timestamp}-${sanitizeFileName(nomeArquivo)}`;

  const { error: uploadError } = await supabaseStorage.storage
    .from(env.SUPABASE_STORAGE_BUCKET)
    .upload(storagePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (uploadError) {
    throw new AuthError(uploadError.message, 500);
  }

  const { data: publicUrlData } = supabaseStorage.storage.from(env.SUPABASE_STORAGE_BUCKET).getPublicUrl(storagePath);

  try {
    return await createDocumentoMatricula({
      aluno_id: input.aluno_id,
      matricula_id: input.matricula_id,
      tipo: input.tipo,
      nome_arquivo: nomeArquivo,
      arquivo_url: publicUrlData.publicUrl,
      storage_path: storagePath,
      status: "enviado",
      ativo: true,
    });
  } catch (error) {
    await supabaseStorage.storage.from(env.SUPABASE_STORAGE_BUCKET).remove([storagePath]);
    throw error;
  }
}

export async function listDocumentosMatriculaService() {
  const documentos = await listDocumentosMatricula();
  return documentos.filter((documento) => documento.ativo);
}

export async function getDocumentoMatriculaByIdService(id: string) {
  const documento = await findDocumentoMatriculaById(id);
  if (!documento || !documento.ativo) {
    throw new AuthError("Documento não encontrado", 404);
  }

  return documento;
}

export async function deleteDocumentoMatriculaService(id: string) {
  await getDocumentoMatriculaByIdService(id);
  return updateDocumentoMatricula(id, { ativo: false });
}
