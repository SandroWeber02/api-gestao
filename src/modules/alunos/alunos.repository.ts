import { prisma } from "../../config/database";

export function createAluno(data: {
  nome: string;
  data_nascimento?: Date;
  cpf?: string;
  rg_certidao?: string;
  sexo?: string;
  tipo?: string;
  ativo?: boolean;
}) {
  return prisma.aluno.create({ data });
}

export function listAlunos() {
  return prisma.aluno.findMany({
    where: { ativo: true },
    orderBy: { created_at: "desc" },
  });
}

export function findAlunoById(id: string) {
  return prisma.aluno.findUnique({ where: { id } });
}

export function findAlunoByCpf(cpf: string) {
  return prisma.aluno.findUnique({ where: { cpf } });
}

export function updateAluno(
  id: string,
  data: {
    nome?: string;
    data_nascimento?: Date;
    cpf?: string;
    rg_certidao?: string;
    sexo?: string;
    tipo?: string;
    ativo?: boolean;
  },
) {
  return prisma.aluno.update({ where: { id }, data });
}
