import { AuthError } from "../auth/auth.errors";
import { createTurma, findTurmaById, findTurmaWithAlunos, listTurmas, updateTurma } from "./turmas.repository";
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
  const turma = await findTurmaWithAlunos(id);

  if (!turma) {
    throw new AuthError("Turma não encontrada", 404);
  }

  return {
    turma: {
      id: turma.id,
      nome: turma.nome,
      ano_letivo: turma.ano_letivo,
      periodo: turma.periodo,
    },
    alunos: turma.matriculas
      .map((matricula: { aluno: { ativo: boolean } }) => matricula.aluno)
      .filter((aluno: { ativo: boolean }) => aluno.ativo)
      .map(({ ativo, ...aluno }: { ativo: boolean; id: string; nome: string; cpf: string | null; data_nascimento: Date | null; sexo: string | null; tipo: string | null }) => aluno),
  };
}
