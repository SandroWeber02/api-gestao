import { AuthError } from "../auth/auth.errors";
import { findAlunoById } from "../alunos/alunos.repository";
import { findTurmaById } from "../turmas/turmas.repository";
import {
  createMatricula,
  findMatriculaAtivaByAlunoEAno,
  findMatriculaById,
  listMatriculas,
  updateMatricula,
} from "./matriculas.repository";
import { CreateMatriculaInput, UpdateMatriculaInput } from "./matriculas.schema";

const STATUS_PERMITIDOS = ["ativa", "pendente", "cancelada", "transferida", "concluida"];

function parseDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new AuthError("data_matricula inválida", 400);
  }
  return parsed;
}

function validarStatus(status?: string): void {
  if (!status) return;
  if (!STATUS_PERMITIDOS.includes(status)) {
    throw new AuthError("Status da matrícula inválido", 400);
  }
}

async function ensureAlunoAtivo(aluno_id: string): Promise<void> {
  const aluno = await findAlunoById(aluno_id);
  if (!aluno || !aluno.ativo) {
    throw new AuthError("Aluno não encontrado", 404);
  }
}

async function ensureTurmaAtiva(turma_id: string): Promise<void> {
  const turma = await findTurmaById(turma_id);
  if (!turma || !turma.ativo) {
    throw new AuthError("Turma não encontrada", 404);
  }
}

export async function createMatriculaService(input: CreateMatriculaInput) {
  await ensureAlunoAtivo(input.aluno_id);
  await ensureTurmaAtiva(input.turma_id);
  validarStatus(input.status);

  const existingMatricula = await findMatriculaAtivaByAlunoEAno(input.aluno_id, input.ano_letivo);
  if (existingMatricula && existingMatricula.ativo && existingMatricula.status === "ativa") {
    throw new AuthError("Aluno já possui matrícula ativa neste ano letivo", 409);
  }

  return createMatricula({
    aluno_id: input.aluno_id,
    turma_id: input.turma_id,
    ano_letivo: input.ano_letivo,
    periodo: input.periodo,
    data_matricula: parseDate(input.data_matricula),
    status: input.status ?? "ativa",
    observacoes: input.observacoes,
    ativo: true,
  });
}

export async function listMatriculasService() {
  const matriculas = await listMatriculas();
  return matriculas.filter((m: { ativo: boolean }) => m.ativo);
}

export async function getMatriculaByIdService(id: string) {
  const matricula = await findMatriculaById(id);
  if (!matricula || !matricula.ativo) {
    throw new AuthError("Matrícula não encontrada", 404);
  }
  return matricula;
}

export async function updateMatriculaService(id: string, input: UpdateMatriculaInput) {
  const matricula = await getMatriculaByIdService(id);

  const aluno_id = input.aluno_id ?? matricula.aluno_id;
  const turma_id = input.turma_id ?? matricula.turma_id;
  const ano_letivo = input.ano_letivo ?? matricula.ano_letivo;

  await ensureAlunoAtivo(aluno_id);
  await ensureTurmaAtiva(turma_id);
  validarStatus(input.status);

  if (aluno_id !== matricula.aluno_id || ano_letivo !== matricula.ano_letivo) {
    const existingMatricula = await findMatriculaAtivaByAlunoEAno(aluno_id, ano_letivo);
    if (existingMatricula && existingMatricula.id !== id && existingMatricula.ativo && existingMatricula.status === "ativa") {
      throw new AuthError("Aluno já possui matrícula ativa neste ano letivo", 409);
    }
  }

  return updateMatricula(id, {
    aluno_id: input.aluno_id,
    turma_id: input.turma_id,
    ano_letivo: input.ano_letivo,
    periodo: input.periodo,
    data_matricula: parseDate(input.data_matricula),
    status: input.status,
    observacoes: input.observacoes,
    ativo: input.ativo,
  });
}

export async function deleteMatriculaService(id: string) {
  await getMatriculaByIdService(id);
  return updateMatricula(id, { ativo: false });
}
