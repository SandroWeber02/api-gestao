import { prisma } from "../../config/database";

export function createEndereco(data: {
  aluno_id: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  ativo?: boolean;
}) {
  return prisma.endereco.create({ data });
}

export function listEnderecos() {
  return prisma.endereco.findMany({ orderBy: { created_at: "desc" } });
}

export function findEnderecoById(id: string) {
  return prisma.endereco.findUnique({ where: { id } });
}

export function findEnderecoByAlunoId(aluno_id: string) {
  return prisma.endereco.findUnique({ where: { aluno_id } });
}

export function updateEndereco(
  id: string,
  data: {
    aluno_id?: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    ativo?: boolean;
  },
) {
  return prisma.endereco.update({ where: { id }, data });
}
