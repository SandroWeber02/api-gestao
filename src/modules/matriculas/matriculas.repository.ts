import { prisma } from "../../config/database";

export function createMatricula(data: {
  aluno_id: string;
  turma_id: string;
  ano_letivo: number;
  periodo?: string;
  data_matricula?: Date;
  status?: string;
  observacoes?: string;
  ativo?: boolean;
}) {
  return prisma.matricula.create({ data });
}

export function listMatriculas() {
  return prisma.matricula.findMany({ orderBy: { created_at: "desc" } });
}

export function findMatriculaById(id: string) {
  return prisma.matricula.findUnique({ where: { id } });
}

export function findMatriculaAtivaByAlunoEAno(aluno_id: string, ano_letivo: number) {
  return prisma.matricula.findFirst({ where: { aluno_id, ano_letivo } });
}

export function updateMatricula(
  id: string,
  data: {
    aluno_id?: string;
    turma_id?: string;
    ano_letivo?: number;
    periodo?: string;
    data_matricula?: Date;
    status?: string;
    observacoes?: string;
    ativo?: boolean;
  },
) {
  return prisma.matricula.update({ where: { id }, data });
}
