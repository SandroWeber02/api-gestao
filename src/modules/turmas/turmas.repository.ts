import { prisma } from "../../config/database";

export function createTurma(data: { nome: string; ano_letivo: number; periodo: string; ativo?: boolean }) {
  return prisma.turma.create({ data });
}

export function listTurmas() {
  return prisma.turma.findMany({ orderBy: { created_at: "desc" } });
}

export function findTurmaById(id: string) {
  return prisma.turma.findUnique({ where: { id } });
}

export function findTurmaResumoById(id: string) {
  return (prisma.turma as any).findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      ano_letivo: true,
      periodo: true,
    },
  });
}

export function findMatriculasAtivasByTurmaWithAluno(turma_id: string) {
  return (prisma.matricula as any).findMany({
    where: {
      turma_id,
      ativo: true,
      aluno: { ativo: true },
    },
    select: {
      aluno: {
        select: {
          id: true,
          nome: true,
          cpf: true,
          data_nascimento: true,
          sexo: true,
          tipo: true,
        },
      },
    },
    orderBy: { created_at: "desc" },
  });
}

export function updateTurma(id: string, data: { nome?: string; ano_letivo?: number; periodo?: string; ativo?: boolean }) {
  return prisma.turma.update({ where: { id }, data });
}
