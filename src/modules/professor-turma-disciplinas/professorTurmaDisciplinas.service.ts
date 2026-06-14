import { prisma } from "../../config/database";
import { AuthError } from "../auth/auth.errors";
import { validateTurmaDisciplinaAtiva } from "../turma-disciplinas/turmaDisciplinas.service";
import {
  createProfessorTurmaDisciplina,
  findProfessorTurmaDisciplinaAtiva,
  findProfessorTurmaDisciplinaById,
  listProfessorTurmaDisciplinas,
  listVinculosByProfessor,
  updateProfessorTurmaDisciplina,
} from "./professorTurmaDisciplinas.repository";
import { CreateProfessorTurmaDisciplinaInput } from "./professorTurmaDisciplinas.schema";

async function validateProfessor(professor_id: string) {
  const professor = await (prisma as any).professor.findUnique({ where: { id: professor_id } });
  if (!professor || !professor.ativo) throw new AuthError("Professor não encontrado", 404);
  return professor;
}

export async function createProfessorTurmaDisciplinaService(input: CreateProfessorTurmaDisciplinaInput) {
  await validateProfessor(input.professor_id);
  await validateTurmaDisciplinaAtiva(input.turma_id, input.disciplina_id);
  const existente = await findProfessorTurmaDisciplinaAtiva(input.professor_id, input.turma_id, input.disciplina_id);
  if (existente) throw new AuthError("Professor já vinculado à turma e disciplina", 409);
  return createProfessorTurmaDisciplina(input);
}

export function listProfessorTurmaDisciplinasService() {
  return listProfessorTurmaDisciplinas();
}

export async function getProfessorTurmaDisciplinaByIdService(id: string) {
  const vinculo = await findProfessorTurmaDisciplinaById(id);
  if (!vinculo || !vinculo.ativo) throw new AuthError("Vínculo professor-turma-disciplina não encontrado", 404);
  return vinculo;
}

export async function deleteProfessorTurmaDisciplinaService(id: string) {
  await getProfessorTurmaDisciplinaByIdService(id);
  return updateProfessorTurmaDisciplina(id, { ativo: false });
}

export async function listTurmasByProfessorService(professor_id: string) {
  const professor = await validateProfessor(professor_id);
  const vinculos = await listVinculosByProfessor(professor_id);
  const turmasMap = new Map<string, any>();

  for (const vinculo of vinculos) {
    if (vinculo.turma) turmasMap.set(vinculo.turma.id, vinculo.turma);
  }

  return { professor, turmas: Array.from(turmasMap.values()) };
}

export async function listDisciplinasByProfessorService(professor_id: string) {
  const professor = await validateProfessor(professor_id);
  const vinculos = await listVinculosByProfessor(professor_id);
  const disciplinasMap = new Map<string, any>();

  for (const vinculo of vinculos) {
    if (vinculo.disciplina) disciplinasMap.set(vinculo.disciplina.id, vinculo.disciplina);
  }

  return { professor, disciplinas: Array.from(disciplinasMap.values()) };
}
