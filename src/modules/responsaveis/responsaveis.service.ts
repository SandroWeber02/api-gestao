import { AuthError } from "../auth/auth.errors";
import {
  createResponsavel,
  findResponsavelByCpf,
  findResponsavelById,
  listResponsaveis,
  updateResponsavel,
} from "./responsaveis.repository";
import { CreateResponsavelInput, UpdateResponsavelInput } from "./responsaveis.schema";

export async function createResponsavelService(input: CreateResponsavelInput) {
  if (input.cpf) {
    const existingResponsavel = await findResponsavelByCpf(input.cpf);
    if (existingResponsavel) {
      throw new AuthError("CPF já está em uso", 409);
    }
  }

  return createResponsavel({
    nome: input.nome,
    cpf: input.cpf,
    rg: input.rg,
    celular: input.celular,
    telefone_fixo: input.telefone_fixo,
    email: input.email,
    profissao: input.profissao,
    local_trabalho: input.local_trabalho,
    telefone_comercial: input.telefone_comercial,
    ativo: true,
  });
}

export async function listResponsaveisService() {
  const responsaveis = await listResponsaveis();
  return responsaveis.filter((responsavel) => responsavel.ativo);
}

export async function getResponsavelByIdService(id: string) {
  const responsavel = await findResponsavelById(id);

  if (!responsavel || !responsavel.ativo) {
    throw new AuthError("Responsável não encontrado", 404);
  }

  return responsavel;
}

export async function updateResponsavelService(id: string, input: UpdateResponsavelInput) {
  const responsavel = await getResponsavelByIdService(id);

  if (input.cpf && input.cpf !== responsavel.cpf) {
    const existingResponsavel = await findResponsavelByCpf(input.cpf);
    if (existingResponsavel && existingResponsavel.id !== id) {
      throw new AuthError("CPF já está em uso", 409);
    }
  }

  return updateResponsavel(id, {
    nome: input.nome,
    cpf: input.cpf,
    rg: input.rg,
    celular: input.celular,
    telefone_fixo: input.telefone_fixo,
    email: input.email,
    profissao: input.profissao,
    local_trabalho: input.local_trabalho,
    telefone_comercial: input.telefone_comercial,
    ativo: input.ativo,
  });
}

export async function deleteResponsavelService(id: string) {
  await getResponsavelByIdService(id);
  return updateResponsavel(id, { ativo: false });
}
