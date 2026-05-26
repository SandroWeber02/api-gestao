import { AuthError } from "../auth/auth.errors";
import { findAlunoById } from "../alunos/alunos.repository";
import {
  createEndereco,
  findEnderecoByAlunoId,
  findEnderecoById,
  listEnderecos,
  updateEndereco,
} from "./enderecos.repository";
import { CreateEnderecoInput, UpdateEnderecoInput } from "./enderecos.schema";

async function ensureAlunoExists(aluno_id: string): Promise<void> {
  const aluno = await findAlunoById(aluno_id);
  if (!aluno || !aluno.ativo) {
    throw new AuthError("Aluno não encontrado", 404);
  }
}

export async function createEnderecoService(input: CreateEnderecoInput) {
  await ensureAlunoExists(input.aluno_id);

  const existingEndereco = await findEnderecoByAlunoId(input.aluno_id);
  if (existingEndereco && existingEndereco.ativo) {
    throw new AuthError("Aluno já possui endereço", 409);
  }

  return createEndereco({
    aluno_id: input.aluno_id,
    cep: input.cep,
    logradouro: input.logradouro,
    numero: input.numero,
    complemento: input.complemento,
    bairro: input.bairro,
    cidade: input.cidade,
    estado: input.estado,
    ativo: true,
  });
}

export async function listEnderecosService() {
  const enderecos = await listEnderecos();
  return enderecos.filter((endereco) => endereco.ativo);
}

export async function getEnderecoByIdService(id: string) {
  const endereco = await findEnderecoById(id);

  if (!endereco || !endereco.ativo) {
    throw new AuthError("Endereço não encontrado", 404);
  }

  return endereco;
}

export async function updateEnderecoService(id: string, input: UpdateEnderecoInput) {
  const endereco = await getEnderecoByIdService(id);

  const aluno_id = input.aluno_id ?? endereco.aluno_id;
  await ensureAlunoExists(aluno_id);

  if (input.aluno_id && input.aluno_id !== endereco.aluno_id) {
    const existingEndereco = await findEnderecoByAlunoId(input.aluno_id);
    if (existingEndereco && existingEndereco.id !== id && existingEndereco.ativo) {
      throw new AuthError("Aluno já possui endereço", 409);
    }
  }

  return updateEndereco(id, {
    aluno_id: input.aluno_id,
    cep: input.cep,
    logradouro: input.logradouro,
    numero: input.numero,
    complemento: input.complemento,
    bairro: input.bairro,
    cidade: input.cidade,
    estado: input.estado,
    ativo: input.ativo,
  });
}

export async function deleteEnderecoService(id: string) {
  await getEnderecoByIdService(id);
  return updateEndereco(id, { ativo: false });
}
