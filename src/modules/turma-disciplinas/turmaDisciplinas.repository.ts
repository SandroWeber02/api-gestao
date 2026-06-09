import { prisma } from "../../config/database";
import { CreateTurmaDisciplinaInput } from "./turmaDisciplinas.schema";

export function createTurmaDisciplina(data: CreateTurmaDisciplinaInput) {
  return (prisma as any).turmaDisciplina.create({
    data: { ...data, ativo: true },
    include: { turma: true, disciplina: true },
  });
}

export function listTurmaDisciplinas() {
  return (prisma as any).turmaDisciplina.findMany({
    where: { ativo: true },
    include: { turma: true, disciplina: true },
    orderBy: { created_at: "desc" },
  });
}

export function findTurmaDisciplinaById(id: string) {
  return (prisma as any).turmaDisciplina.findUnique({
    where: { id },
    include: { turma: true, disciplina: true },
  });
}

export function findTurmaDisciplinaAtiva(turma_id: string, disciplina_id: string) {
  return (prisma as any).turmaDisciplina.findFirst({ where: { turma_id, disciplina_id, ativo: true } });
}

export function listDisciplinasByTurma(turma_id: string) {
  return (prisma as any).turmaDisciplina.findMany({
    where: { turma_id, ativo: true, disciplina: { ativo: true } },
    include: { disciplina: true },
    orderBy: { created_at: "desc" },
  });
}

export function updateTurmaDisciplina(id: string, data: { ativo?: boolean }) {
  return (prisma as any).turmaDisciplina.update({ where: { id }, data });
}
