import { prisma } from "../../config/database";

export function listAlunosAtivosDashboard() {
  return prisma.aluno.findMany({
    where: { ativo: true },
    orderBy: { created_at: "desc" },
  });
}

export function listTurmasAtivasDashboard() {
  return prisma.turma.findMany({
    orderBy: { created_at: "desc" },
  });
}
