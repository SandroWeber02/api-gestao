import { prisma } from "../../config/database";
import { AuthError } from "../auth/auth.errors";
import { createProfessor, findProfessorById, listProfessores, updateProfessor } from "./professores.repository";
import { CreateProfessorInput, UpdateProfessorInput } from "./professores.schema";

async function validateUsuario(usuario_id?: string) {
  if (!usuario_id) return;
  const usuario = await prisma.usuario.findUnique({ where: { id: usuario_id } });
  if (!usuario || !usuario.ativo) {
    throw new AuthError("Usuário não encontrado", 404);
  }
}

export async function createProfessorService(input: CreateProfessorInput) {
  await validateUsuario(input.usuario_id);
  return createProfessor(input);
}

export function listProfessoresService() {
  return listProfessores();
}

export async function getProfessorByIdService(id: string) {
  const professor = await findProfessorById(id);
  if (!professor || !professor.ativo) {
    throw new AuthError("Professor não encontrado", 404);
  }
  return professor;
}

export async function updateProfessorService(id: string, input: UpdateProfessorInput) {
  await getProfessorByIdService(id);
  await validateUsuario(input.usuario_id);
  return updateProfessor(id, input);
}

export async function deleteProfessorService(id: string) {
  await getProfessorByIdService(id);
  return updateProfessor(id, { ativo: false });
}
