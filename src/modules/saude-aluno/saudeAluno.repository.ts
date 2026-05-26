import { prisma } from "../../config/database";

export function createSaudeAluno(data: {
  aluno_id: string;
  alergias?: string;
  medicamentos?: string;
  necessidades_especiais?: string;
  convenio_medico?: boolean;
  nome_convenio?: string;
  numero_carteirinha?: string;
  observacoes?: string;
  ativo?: boolean;
}) {
  return prisma.saudeAluno.create({ data });
}

export function listSaudeAluno() {
  return prisma.saudeAluno.findMany({ orderBy: { created_at: "desc" } });
}

export function findSaudeAlunoById(id: string) {
  return prisma.saudeAluno.findUnique({ where: { id } });
}

export function findSaudeByAlunoId(aluno_id: string) {
  return prisma.saudeAluno.findUnique({ where: { aluno_id } });
}

export function updateSaudeAluno(
  id: string,
  data: {
    aluno_id?: string;
    alergias?: string;
    medicamentos?: string;
    necessidades_especiais?: string;
    convenio_medico?: boolean;
    nome_convenio?: string;
    numero_carteirinha?: string;
    observacoes?: string;
    ativo?: boolean;
  },
) {
  return prisma.saudeAluno.update({ where: { id }, data });
}
