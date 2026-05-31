import { AuthError } from "../auth/auth.errors";
import { findAlunoById } from "../alunos/alunos.repository";
import { findResponsavelById } from "../responsaveis/responsaveis.repository";
import {
  createAlunoResponsavel,
  findAlunoResponsavelById,
  findByAlunoAndResponsavel,
  listAlunoResponsavel,
  updateAlunoResponsavel,
} from "./alunoResponsavel.repository";
import {
  CreateAlunoResponsavelInput,
  UpdateAlunoResponsavelInput,
} from "./alunoResponsavel.schema";

async function ensureAlunoExists(aluno_id: string): Promise<void> {
  const aluno = await findAlunoById(aluno_id);
  if (!aluno || !aluno.ativo) {
    throw new AuthError("Aluno não encontrado", 404);
  }
}

async function ensureResponsavelExists(responsavel_id: string): Promise<void> {
  const responsavel = await findResponsavelById(responsavel_id);
  if (!responsavel || !responsavel.ativo) {
    throw new AuthError("Responsável não encontrado", 404);
  }
}

export async function createAlunoResponsavelService(input: CreateAlunoResponsavelInput) {
  await ensureAlunoExists(input.aluno_id);
  await ensureResponsavelExists(input.responsavel_id);

  const existingVinculo = await findByAlunoAndResponsavel(input.aluno_id, input.responsavel_id);
  if (existingVinculo && existingVinculo.ativo) {
    throw new AuthError("Vínculo já cadastrado", 409);
  }

  return createAlunoResponsavel({
    aluno_id: input.aluno_id,
    responsavel_id: input.responsavel_id,
    tipo: input.tipo,
    parentesco: input.parentesco,
    responsavel_financeiro: input.responsavel_financeiro ?? false,
    autorizado_retirada: input.autorizado_retirada ?? false,
    ativo: true,
  });
}

export async function listAlunoResponsavelService() {
  const vinculos = await listAlunoResponsavel();
  return vinculos.filter((vinculo) => vinculo.ativo);
}

export async function getAlunoResponsavelByIdService(id: string) {
  const vinculo = await findAlunoResponsavelById(id);
  if (!vinculo || !vinculo.ativo) {
    throw new AuthError("Vínculo não encontrado", 404);
  }

  return vinculo;
}

export async function updateAlunoResponsavelService(id: string, input: UpdateAlunoResponsavelInput) {
  const vinculo = await getAlunoResponsavelByIdService(id);

  const aluno_id = input.aluno_id ?? vinculo.aluno_id;
  const responsavel_id = input.responsavel_id ?? vinculo.responsavel_id;

  await ensureAlunoExists(aluno_id);
  await ensureResponsavelExists(responsavel_id);

  if (aluno_id !== vinculo.aluno_id || responsavel_id !== vinculo.responsavel_id) {
    const existingVinculo = await findByAlunoAndResponsavel(aluno_id, responsavel_id);
    if (existingVinculo && existingVinculo.id !== id && existingVinculo.ativo) {
      throw new AuthError("Vínculo já cadastrado", 409);
    }
  }

  return updateAlunoResponsavel(id, {
    aluno_id: input.aluno_id,
    responsavel_id: input.responsavel_id,
    tipo: input.tipo,
    parentesco: input.parentesco,
    responsavel_financeiro: input.responsavel_financeiro,
    autorizado_retirada: input.autorizado_retirada,
    ativo: input.ativo,
  });
}

export async function deleteAlunoResponsavelService(id: string) {
  await getAlunoResponsavelByIdService(id);
  return updateAlunoResponsavel(id, { ativo: false });
}
