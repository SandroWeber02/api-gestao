import { prisma } from "../../config/database";

export function createTurma(data: { nome: string; ano_letivo: number; periodo: string; ativo?: boolean }) {
  return prisma.turma.create({ data });
}

export function listTurmas() {
  return prisma.turma.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
}

export function findTurmaById(id: string) {
  return prisma.turma.findUnique({ where: { id } });
}

export function updateTurma(id: string, data: { nome?: string; ano_letivo?: number; periodo?: string; ativo?: boolean }) {
  return prisma.turma.update({ where: { id }, data });
}