import { prisma } from "../../config/database";
import { CreateProfessorInput, UpdateProfessorInput } from "./professores.schema";

export function createProfessor(data: CreateProfessorInput) {
  return (prisma as any).professor.create({ data: { ...data, ativo: true } });
}

export function listProfessores() {
  return (prisma as any).professor.findMany({ where: { ativo: true }, orderBy: { created_at: "desc" } });
}

export function findProfessorById(id: string) {
  return (prisma as any).professor.findUnique({ where: { id } });
}

export function updateProfessor(id: string, data: UpdateProfessorInput & { ativo?: boolean }) {
  return (prisma as any).professor.update({ where: { id }, data });
}
