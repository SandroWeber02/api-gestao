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

export function updateTurma(id: string, data: { nome?: string; ano_letivo?: number; periodo?: string; ativo?: boolean }) {
  return prisma.turma.update({ where: { id }, data });
}


export function findTurmaWithAlunos(id: string) {
  return (prisma.turma as any).findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      ano_letivo: true,
      periodo: true,
      ativo: true,
      matriculas: {
        where: { ativo: true },
        select: {
          aluno: {
            select: {
              id: true,
              nome: true,
              cpf: true,
              data_nascimento: true,
              sexo: true,
              tipo: true,
              ativo: true,
            },
          },
        },
      },
    },
  });
}
