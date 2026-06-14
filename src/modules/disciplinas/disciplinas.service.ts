import { AuthError } from "../auth/auth.errors";
import { createDisciplina, findDisciplinaById, listDisciplinas, updateDisciplina } from "./disciplinas.repository";
import { CreateDisciplinaInput, UpdateDisciplinaInput } from "./disciplinas.schema";

export function createDisciplinaService(input: CreateDisciplinaInput) {
  return createDisciplina(input);
}

export function listDisciplinasService() {
  return listDisciplinas();
}

export async function getDisciplinaByIdService(id: string) {
  const disciplina = await findDisciplinaById(id);
  if (!disciplina || !disciplina.ativo) {
    throw new AuthError("Disciplina não encontrada", 404);
  }
  return disciplina;
}

export async function updateDisciplinaService(id: string, input: UpdateDisciplinaInput) {
  await getDisciplinaByIdService(id);
  return updateDisciplina(id, input);
}

export async function deleteDisciplinaService(id: string) {
  await getDisciplinaByIdService(id);
  return updateDisciplina(id, { ativo: false });
}
