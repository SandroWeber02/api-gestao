import { AuthError } from "../auth/auth.errors";
import { findAlunoById } from "../alunos/alunos.repository";
import {
  createSaudeAluno,
  findSaudeAlunoById,
  findSaudeByAlunoId,
  listSaudeAluno,
  updateSaudeAluno,
} from "./saudeAluno.repository";
import { CreateSaudeAlunoInput, UpdateSaudeAlunoInput } from "./saudeAluno.schema";

async function ensureAlunoExists(aluno_id: string): Promise<void> {
  const aluno = await findAlunoById(aluno_id);

  if (!aluno || !aluno.ativo) {
    throw new AuthError("Aluno não encontrado", 404);
  }
}

export async function createSaudeAlunoService(input: CreateSaudeAlunoInput) {
  await ensureAlunoExists(input.aluno_id);

  const existingSaude = await findSaudeByAlunoId(input.aluno_id);
  if (existingSaude && existingSaude.ativo) {
    throw new AuthError("Aluno já possui informações de saúde", 409);
  }

  return createSaudeAluno({
    aluno_id: input.aluno_id,
    alergias: input.alergias,
    medicamentos: input.medicamentos,
    necessidades_especiais: input.necessidades_especiais,
    convenio_medico: input.convenio_medico ?? false,
    nome_convenio: input.nome_convenio,
    numero_carteirinha: input.numero_carteirinha,
    observacoes: input.observacoes,
    ativo: true,
  });
}

export async function listSaudeAlunoService() {
  const registros = await listSaudeAluno();
  return registros.filter((registro) => registro.ativo);
}

export async function getSaudeAlunoByIdService(id: string) {
  const registro = await findSaudeAlunoById(id);

  if (!registro || !registro.ativo) {
    throw new AuthError("Cadastro de saúde não encontrado", 404);
  }

  return registro;
}

export async function updateSaudeAlunoService(id: string, input: UpdateSaudeAlunoInput) {
  const registro = await getSaudeAlunoByIdService(id);

  const aluno_id = input.aluno_id ?? registro.aluno_id;
  await ensureAlunoExists(aluno_id);

  if (input.aluno_id && input.aluno_id !== registro.aluno_id) {
    const existingSaude = await findSaudeByAlunoId(input.aluno_id);
    if (existingSaude && existingSaude.id !== id && existingSaude.ativo) {
      throw new AuthError("Aluno já possui informações de saúde", 409);
    }
  }

  return updateSaudeAluno(id, {
    aluno_id: input.aluno_id,
    alergias: input.alergias,
    medicamentos: input.medicamentos,
    necessidades_especiais: input.necessidades_especiais,
    convenio_medico: input.convenio_medico,
    nome_convenio: input.nome_convenio,
    numero_carteirinha: input.numero_carteirinha,
    observacoes: input.observacoes,
    ativo: input.ativo,
  });
}

export async function deleteSaudeAlunoService(id: string) {
  await getSaudeAlunoByIdService(id);
  return updateSaudeAluno(id, { ativo: false });
}
