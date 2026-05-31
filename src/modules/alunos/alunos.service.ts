import { AuthError } from "../auth/auth.errors";
import {
  createAluno,
  findAlunoByCpf,
  findAlunoById,
  listAlunos,
  updateAluno,
} from "./alunos.repository";
import { CreateAlunoInput, UpdateAlunoInput } from "./alunos.schema";

function parseDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new AuthError("data_nascimento inválida", 400);
  }
  return parsed;
}

export async function createAlunoService(input: CreateAlunoInput) {
  if (input.cpf) {
    const existingAluno = await findAlunoByCpf(input.cpf);
    if (existingAluno) {
      throw new AuthError("CPF já está em uso", 409);
    }
  }

  return createAluno({
    nome: input.nome,
    data_nascimento: parseDate(input.data_nascimento),
    cpf: input.cpf,
    rg_certidao: input.rg_certidao,
    sexo: input.sexo,
    tipo: input.tipo,
    ativo: true,
  });
}

export function listAlunosService() {
  return listAlunos();
}

export async function getAlunoByIdService(id: string) {
  const aluno = await findAlunoById(id);
  if (!aluno || !aluno.ativo) {
    throw new AuthError("Aluno não encontrado", 404);
  }
  return aluno;
}

export async function updateAlunoService(id: string, input: UpdateAlunoInput) {
  const aluno = await getAlunoByIdService(id);

  if (input.cpf && input.cpf !== aluno.cpf) {
    const existingAluno = await findAlunoByCpf(input.cpf);
    if (existingAluno && existingAluno.id !== id) {
      throw new AuthError("CPF já está em uso", 409);
    }
  }

  return updateAluno(id, {
    nome: input.nome,
    data_nascimento: parseDate(input.data_nascimento),
    cpf: input.cpf,
    rg_certidao: input.rg_certidao,
    sexo: input.sexo,
    tipo: input.tipo,
    ativo: input.ativo,
  });
}

export async function deleteAlunoService(id: string) {
  await getAlunoByIdService(id);
  return updateAluno(id, { ativo: false });
}
