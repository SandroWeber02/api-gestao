import { prisma } from "../../config/database";

export function createContatoEmergencia(data: {
  aluno_id: string;
  nome: string;
  parentesco?: string;
  telefone: string;
  observacao?: string;
  ativo?: boolean;
}) {
  return prisma.contatoEmergencia.create({ data });
}

export function listContatosEmergencia() {
  return prisma.contatoEmergencia.findMany({ orderBy: { created_at: "desc" } });
}

export function findContatoEmergenciaById(id: string) {
  return prisma.contatoEmergencia.findUnique({ where: { id } });
}

export function findContatoByAlunoId(aluno_id: string) {
  return prisma.contatoEmergencia.findUnique({ where: { aluno_id } });
}

export function updateContatoEmergencia(
  id: string,
  data: {
    aluno_id?: string;
    nome?: string;
    parentesco?: string;
    telefone?: string;
    observacao?: string;
    ativo?: boolean;
  },
) {
  return prisma.contatoEmergencia.update({ where: { id }, data });
}
