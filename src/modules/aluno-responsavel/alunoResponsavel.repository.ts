import { prisma } from "../../config/database";

export function createAlunoResponsavel(data: {
  aluno_id: string;
  responsavel_id: string;
  tipo: string;
  parentesco?: string;
  responsavel_financeiro?: boolean;
  autorizado_retirada?: boolean;
  ativo?: boolean;
}) {
  return prisma.alunoResponsavel.create({ data });
}

export function listAlunoResponsavel() {
  return prisma.alunoResponsavel.findMany({ orderBy: { created_at: "desc" } });
}

export function findAlunoResponsavelById(id: string) {
  return prisma.alunoResponsavel.findUnique({ where: { id } });
}

export function findByAlunoAndResponsavel(aluno_id: string, responsavel_id: string) {
  return prisma.alunoResponsavel.findFirst({ where: { aluno_id, responsavel_id } });
}

export function updateAlunoResponsavel(
  id: string,
  data: {
    aluno_id?: string;
    responsavel_id?: string;
    tipo?: string;
    parentesco?: string;
    responsavel_financeiro?: boolean;
    autorizado_retirada?: boolean;
    ativo?: boolean;
  },
) {
  return prisma.alunoResponsavel.update({ where: { id }, data });
}
