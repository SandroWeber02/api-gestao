import { prisma } from "../../config/database";

export function createResponsavel(data: {
  nome: string;
  cpf?: string;
  rg?: string;
  celular?: string;
  telefone_fixo?: string;
  email?: string;
  profissao?: string;
  local_trabalho?: string;
  telefone_comercial?: string;
  ativo?: boolean;
}) {
  return prisma.responsavel.create({ data });
}

export function listResponsaveis() {
  return prisma.responsavel.findMany({ orderBy: { created_at: "desc" } });
}

export function findResponsavelById(id: string) {
  return prisma.responsavel.findUnique({ where: { id } });
}

export function findResponsavelByCpf(cpf: string) {
  return prisma.responsavel.findUnique({ where: { cpf } });
}

export function updateResponsavel(
  id: string,
  data: {
    nome?: string;
    cpf?: string;
    rg?: string;
    celular?: string;
    telefone_fixo?: string;
    email?: string;
    profissao?: string;
    local_trabalho?: string;
    telefone_comercial?: string;
    ativo?: boolean;
  },
) {
  return prisma.responsavel.update({ where: { id }, data });
}
