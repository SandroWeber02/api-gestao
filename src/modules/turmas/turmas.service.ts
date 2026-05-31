import { AuthError } from "../auth/auth.errors";
import {
  createTurma,
  findMatriculasAtivasByTurmaWithAluno,
  findTurmaById,
  findTurmaResumoById,
  listTurmas,
  updateTurma,
} from "./turmas.repository";
import { CreateTurmaInput, UpdateTurmaInput } from "./turmas.schema";

export function createTurmaService(input: CreateTurmaInput) {
  return createTurma(input);
}

export function listTurmasService() {
  return listTurmas();
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

export async function listAlunosByTurmaService(id: string) {
  const turma = await findTurmaResumoById(id);

  if (!turma) {
    throw new AuthError("Turma não encontrada", 404);
  }

  const matriculas = await findMatriculasAtivasByTurmaWithAluno(id);
  const alunosMap = new Map<string, { id: string; nome: string; cpf: string | null; data_nascimento: Date | null; sexo: string | null; tipo: string | null }>();

  for (const matricula of matriculas) {
    if (matricula.aluno) {
      alunosMap.set(matricula.aluno.id, matricula.aluno);
    }
  }

  return {
    turma,
    alunos: Array.from(alunosMap.values()),
  };
}
