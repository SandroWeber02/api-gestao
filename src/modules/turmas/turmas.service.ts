import { AuthError } from "../auth/auth.errors";
import { createTurma, findTurmaById, listTurmas, updateTurma } from "./turmas.repository";
import { CreateTurmaInput, UpdateTurmaInput } from "./turmas.schema";

export function createTurmaService(input: CreateTurmaInput) {
  return createTurma(input);
}

export async function listTurmasService() {
  const turmas = await listTurmas();

  return turmas.filter((turma) => turma.ativo === true);
}

export async function getTurmaByIdService(id: string) {
  const turma = await findTurmaById(id);

  if (!turma) {
    throw new AuthError("Turma não encontrada", 404);
  }

  return turma;
}

export async function updateTurmaService(id: string, input: UpdateTurmaInput) {
  await getTurmaByIdService(id);
  return updateTurma(id, input);
}

export async function deleteTurmaService(id: string) {
  await getTurmaByIdService(id);
  return updateTurma(id, { ativo: false });
}
