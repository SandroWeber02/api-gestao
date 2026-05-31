import { prisma } from "../../config/database";

export function createDocumentoMatricula(data: {
  aluno_id: string;
  matricula_id?: string;
  tipo: string;
  nome_arquivo: string;
  arquivo_url: string;
  storage_path: string;
  status?: string;
  ativo?: boolean;
}) {
  return prisma.documentoMatricula.create({ data });
}

export function listDocumentosMatricula() {
  return prisma.documentoMatricula.findMany({ orderBy: { created_at: "desc" } });
}

export function findDocumentoMatriculaById(id: string) {
  return prisma.documentoMatricula.findUnique({ where: { id } });
}

export function updateDocumentoMatricula(id: string, data: { ativo?: boolean; status?: string }) {
  return prisma.documentoMatricula.update({ where: { id }, data });
}
