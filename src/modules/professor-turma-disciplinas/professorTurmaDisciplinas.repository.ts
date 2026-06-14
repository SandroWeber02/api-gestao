import { prisma } from "../../config/database";
import { CreateProfessorTurmaDisciplinaInput } from "./professorTurmaDisciplinas.schema";

const includeRelations = { professor: true, turma: true, disciplina: true };

export function createProfessorTurmaDisciplina(data: CreateProfessorTurmaDisciplinaInput) {
  return (prisma as any).professorTurmaDisciplina.create({
    data: { ...data, ativo: true },
    include: includeRelations,
  });
}

export function listProfessorTurmaDisciplinas() {
  return (prisma as any).professorTurmaDisciplina.findMany({
    where: { ativo: true },
    include: includeRelations,
    orderBy: { created_at: "desc" },
  });
}

export function findProfessorTurmaDisciplinaById(id: string) {
  return (prisma as any).professorTurmaDisciplina.findUnique({ where: { id }, include: includeRelations });
}

export function findProfessorTurmaDisciplinaAtiva(professor_id: string, turma_id: string, disciplina_id: string) {
  return (prisma as any).professorTurmaDisciplina.findFirst({
    where: { professor_id, turma_id, disciplina_id, ativo: true },
  });
}

export function listVinculosByProfessor(professor_id: string) {
  return (prisma as any).professorTurmaDisciplina.findMany({
    where: { professor_id, ativo: true, turma: { ativo: true }, disciplina: { ativo: true } },
    include: { turma: true, disciplina: true },
    orderBy: { created_at: "desc" },
  });
}

export function updateProfessorTurmaDisciplina(id: string, data: { ativo?: boolean }) {
  return (prisma as any).professorTurmaDisciplina.update({ where: { id }, data });
}
