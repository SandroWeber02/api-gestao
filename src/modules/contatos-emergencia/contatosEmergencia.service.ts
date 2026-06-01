import { AuthError } from "../auth/auth.errors";
import { findAlunoById } from "../alunos/alunos.repository";
import {
  createContatoEmergencia,
  findContatoByAlunoId,
  findContatoEmergenciaById,
  listContatosEmergencia,
  updateContatoEmergencia,
} from "./contatosEmergencia.repository";
import {
  CreateContatoEmergenciaInput,
  UpdateContatoEmergenciaInput,
} from "./contatosEmergencia.schema";

async function ensureAlunoExists(aluno_id: string): Promise<void> {
  const aluno = await findAlunoById(aluno_id);
  if (!aluno || !aluno.ativo) {
    throw new AuthError("Aluno não encontrado", 404);
  }
}

export async function createContatoEmergenciaService(input: CreateContatoEmergenciaInput) {
  await ensureAlunoExists(input.aluno_id);

  const existingContato = await findContatoByAlunoId(input.aluno_id);
  if (existingContato && existingContato.ativo) {
    throw new AuthError("Aluno já possui contato de emergência", 409);
  }

  return createContatoEmergencia({
    aluno_id: input.aluno_id,
    nome: input.nome,
    parentesco: input.parentesco,
    telefone: input.telefone,
    observacao: input.observacao,
    ativo: true,
  });
}

export async function listContatosEmergenciaService() {
  const contatos = await listContatosEmergencia();
  return contatos.filter((contato) => contato.ativo);
}

export async function getContatoEmergenciaByIdService(id: string) {
  const contato = await findContatoEmergenciaById(id);
  if (!contato || !contato.ativo) {
    throw new AuthError("Contato de emergência não encontrado", 404);
  }

  return contato;
}

export async function updateContatoEmergenciaService(id: string, input: UpdateContatoEmergenciaInput) {
  const contato = await getContatoEmergenciaByIdService(id);

  const aluno_id = input.aluno_id ?? contato.aluno_id;
  await ensureAlunoExists(aluno_id);

  if (input.aluno_id && input.aluno_id !== contato.aluno_id) {
    const existingContato = await findContatoByAlunoId(input.aluno_id);
    if (existingContato && existingContato.id !== id && existingContato.ativo) {
      throw new AuthError("Aluno já possui contato de emergência", 409);
    }
  }

  return updateContatoEmergencia(id, {
    aluno_id: input.aluno_id,
    nome: input.nome,
    parentesco: input.parentesco,
    telefone: input.telefone,
    observacao: input.observacao,
    ativo: input.ativo,
  });
}

export async function deleteContatoEmergenciaService(id: string) {
  await getContatoEmergenciaByIdService(id);
  return updateContatoEmergencia(id, { ativo: false });
}
