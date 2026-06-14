import { prisma } from "../../config/database";
import { CreateDisciplinaInput, UpdateDisciplinaInput } from "./disciplinas.schema";

export function createDisciplina(data: CreateDisciplinaInput) {
  return (prisma as any).disciplina.create({ data: { ...data, ativo: true } });
}

export function listDisciplinas() {
  return (prisma as any).disciplina.findMany({ where: { ativo: true }, orderBy: { created_at: "desc" } });
}

export function findDisciplinaById(id: string) {
  return (prisma as any).disciplina.findUnique({ where: { id } });
}

export function updateDisciplina(id: string, data: UpdateDisciplinaInput & { ativo?: boolean }) {
  return (prisma as any).disciplina.update({ where: { id }, data });
}
