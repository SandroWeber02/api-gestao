import { prisma } from "../../config/database";
import { AuthError } from "../auth/auth.errors";
import {
  createTurmaDisciplina,
  findTurmaDisciplinaAtiva,
  findTurmaDisciplinaById,
  listDisciplinasByTurma,
  listTurmaDisciplinas,
  updateTurmaDisciplina,
} from "./turmaDisciplinas.repository";
import { CreateTurmaDisciplinaInput } from "./turmaDisciplinas.schema";

async function validateTurma(turma_id: string) {
  const turma = await prisma.turma.findUnique({ where: { id: turma_id } });
  if (!turma || !turma.ativo) throw new AuthError("Turma não encontrada", 404);
  return turma;
}

async function validateDisciplina(disciplina_id: string) {
  const disciplina = await (prisma as any).disciplina.findUnique({ where: { id: disciplina_id } });
  if (!disciplina || !disciplina.ativo) throw new AuthError("Disciplina não encontrada", 404);
  return disciplina;
}

export async function createTurmaDisciplinaService(input: CreateTurmaDisciplinaInput) {
  await validateTurma(input.turma_id);
  await validateDisciplina(input.disciplina_id);
  const existente = await findTurmaDisciplinaAtiva(input.turma_id, input.disciplina_id);
  if (existente) throw new AuthError("Disciplina já vinculada à turma", 409);
  return createTurmaDisciplina(input);
}

export function listTurmaDisciplinasService() {
  return listTurmaDisciplinas();
}

export async function getTurmaDisciplinaByIdService(id: string) {
  const vinculo = await findTurmaDisciplinaById(id);
  if (!vinculo || !vinculo.ativo) throw new AuthError("Vínculo turma-disciplina não encontrado", 404);
  return vinculo;
}

export async function deleteTurmaDisciplinaService(id: string) {
  await getTurmaDisciplinaByIdService(id);
  return updateTurmaDisciplina(id, { ativo: false });
}

export async function listDisciplinasByTurmaService(turma_id: string) {
  const turma = await validateTurma(turma_id);
  const vinculos = await listDisciplinasByTurma(turma_id);
  return {
    turma,
    disciplinas: vinculos.map((vinculo: any) => vinculo.disciplina),
  };
}

export async function validateTurmaDisciplinaAtiva(turma_id: string, disciplina_id: string) {
  await validateTurma(turma_id);
  await validateDisciplina(disciplina_id);
  const vinculo = await findTurmaDisciplinaAtiva(turma_id, disciplina_id);
  if (!vinculo) throw new AuthError("Disciplina não vinculada à turma", 400);
  return vinculo;
}
