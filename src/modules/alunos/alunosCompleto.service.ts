import { prisma } from "../../config/database";
import { AuthError } from "../auth/auth.errors";
import { AlunoCompletoInput } from "./alunosCompleto.schema";

const STATUS_MATRICULA_PERMITIDOS = ["ativa", "pendente", "cancelada", "transferida", "concluida"];

type AlunoBasico = {
  id: string;
  cpf: string | null;
  ativo: boolean;
};

type RelacaoAlunoResponsavel = {
  id: string;
  aluno_id: string;
  responsavel_id: string;
  tipo: string;
  parentesco: string | null;
  responsavel_financeiro: boolean;
  autorizado_retirada: boolean;
  ativo: boolean;
  responsavel?: ResponsavelBasico | null;
};

type ResponsavelBasico = {
  id: string;
  nome: string;
  cpf: string | null;
  ativo: boolean;
};

function parseDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new AuthError("Data inválida", 400);
  }
  return parsed;
}

function validateStatus(status?: string): void {
  if (!status) return;
  if (!STATUS_MATRICULA_PERMITIDOS.includes(status)) {
    throw new AuthError("Status da matrícula inválido", 400);
  }
}

function removeUndefined<T extends Record<string, unknown>>(data: T): Partial<T> {
  return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined)) as Partial<T>;
}

async function getAlunoAtivo(id: string): Promise<AlunoBasico> {
  const aluno = await prisma.aluno.findUnique({ where: { id } }) as AlunoBasico | null;
  if (!aluno || !aluno.ativo) {
    throw new AuthError("Aluno não encontrado", 404);
  }
  return aluno;
}

async function findRelacaoPrincipal(aluno_id: string): Promise<RelacaoAlunoResponsavel | null> {
  const relacoes = await (prisma.alunoResponsavel as any).findMany({
    where: { aluno_id, ativo: true },
    include: { responsavel: true },
    orderBy: { created_at: "desc" },
  }) as RelacaoAlunoResponsavel[];

  return relacoes.find((relacao) => relacao.responsavel_financeiro) ?? relacoes[0] ?? null;
}

async function findMatriculaAtivaByAluno(aluno_id: string) {
  return (prisma.matricula as any).findFirst({
    where: { aluno_id, ativo: true },
    orderBy: { created_at: "desc" },
  });
}

async function validateTurma(turma_id: string): Promise<void> {
  const turma = await prisma.turma.findUnique({ where: { id: turma_id } });
  if (!turma || !turma.ativo) {
    throw new AuthError("Turma não encontrada", 404);
  }
}

export async function getAlunoCompletoService(id: string) {
  const aluno = await getAlunoAtivo(id);
  const relacao = await findRelacaoPrincipal(id);
  const endereco = await (prisma.endereco as any).findUnique({ where: { aluno_id: id } });
  const saude = await (prisma.saudeAluno as any).findUnique({ where: { aluno_id: id } });
  const emergencia = await (prisma.contatoEmergencia as any).findUnique({ where: { aluno_id: id } });
  const matricula = await findMatriculaAtivaByAluno(id);
  const documentos = await (prisma.documentoMatricula as any).findMany({
    where: { aluno_id: id, ativo: true },
    orderBy: { created_at: "desc" },
  });

  return {
    aluno,
    responsavel: relacao?.responsavel ?? null,
    relacao: relacao ? { ...relacao, responsavel: undefined } : null,
    endereco: endereco?.ativo ? endereco : null,
    saude: saude?.ativo ? saude : null,
    emergencia: emergencia?.ativo ? emergencia : null,
    matricula,
    documentos,
  };
}

async function updateAlunoBloco(id: string, aluno: AlunoBasico, input?: AlunoCompletoInput["aluno"]) {
  if (!input) return;

  if (input.cpf && input.cpf !== aluno.cpf) {
    const existingAluno = await prisma.aluno.findUnique({ where: { cpf: input.cpf } });
    if (existingAluno && existingAluno.id !== id) {
      throw new AuthError("CPF do aluno já está em uso", 409);
    }
  }

  await prisma.aluno.update({
    where: { id },
    data: removeUndefined({
      nome: input.nome,
      data_nascimento: parseDate(input.data_nascimento),
      cpf: input.cpf,
      rg_certidao: input.rg_certidao,
      sexo: input.sexo,
      tipo: input.tipo,
    }),
  });
}

async function resolveResponsavel(input: AlunoCompletoInput, relacaoAtual: RelacaoAlunoResponsavel | null) {
  if (!input.responsavel) {
    return relacaoAtual?.responsavel ?? null;
  }

  const responsavelAtualId = relacaoAtual?.responsavel_id;
  const responsavelCpf = input.responsavel.cpf;
  const responsavelPorCpf = responsavelCpf
    ? await (prisma.responsavel as any).findUnique({ where: { cpf: responsavelCpf } }) as ResponsavelBasico | null
    : null;

  if (responsavelPorCpf && !responsavelPorCpf.ativo) {
    throw new AuthError("Responsável encontrado está inativo", 409);
  }

  if (responsavelPorCpf && responsavelPorCpf.id !== responsavelAtualId) {
    return responsavelPorCpf;
  }

  const data = removeUndefined({
    nome: input.responsavel.nome,
    cpf: input.responsavel.cpf,
    rg: input.responsavel.rg,
    celular: input.responsavel.celular,
    telefone_fixo: input.responsavel.telefone_fixo,
    email: input.responsavel.email,
    profissao: input.responsavel.profissao,
    local_trabalho: input.responsavel.local_trabalho,
    telefone_comercial: input.responsavel.telefone_comercial,
    ativo: true,
  });

  if (responsavelAtualId) {
    return (prisma.responsavel as any).update({ where: { id: responsavelAtualId }, data });
  }

  if (!input.responsavel.nome) {
    throw new AuthError("Nome do responsável é obrigatório", 400);
  }

  return (prisma.responsavel as any).create({ data });
}

async function upsertRelacao(aluno_id: string, input: AlunoCompletoInput, relacaoAtual: RelacaoAlunoResponsavel | null, responsavel: ResponsavelBasico | null) {
  if (!input.relacao && !input.responsavel) return;
  if (!responsavel) {
    throw new AuthError("Responsável não encontrado", 404);
  }

  const data = removeUndefined({
    aluno_id,
    responsavel_id: responsavel.id,
    tipo: input.relacao?.tipo,
    parentesco: input.relacao?.parentesco,
    responsavel_financeiro: input.relacao?.responsavel_financeiro,
    autorizado_retirada: input.relacao?.autorizado_retirada,
    ativo: true,
  });

  if (relacaoAtual) {
    return (prisma.alunoResponsavel as any).update({ where: { id: relacaoAtual.id }, data });
  }

  if (!input.relacao?.tipo) {
    throw new AuthError("Tipo de responsável é obrigatório", 400);
  }

  return (prisma.alunoResponsavel as any).create({ data });
}

async function upsertEndereco(aluno_id: string, input?: AlunoCompletoInput["endereco"]) {
  if (!input) return;
  const existing = await (prisma.endereco as any).findUnique({ where: { aluno_id } });
  const data = removeUndefined({ aluno_id, ...input, ativo: true });
  return existing
    ? (prisma.endereco as any).update({ where: { id: existing.id }, data })
    : (prisma.endereco as any).create({ data });
}

async function upsertSaude(aluno_id: string, input?: AlunoCompletoInput["saude"]) {
  if (!input) return;
  const existing = await (prisma.saudeAluno as any).findUnique({ where: { aluno_id } });
  const data = removeUndefined({ aluno_id, ...input, ativo: true });
  return existing
    ? (prisma.saudeAluno as any).update({ where: { id: existing.id }, data })
    : (prisma.saudeAluno as any).create({ data });
}

async function upsertEmergencia(aluno_id: string, input?: AlunoCompletoInput["emergencia"]) {
  if (!input) return;
  const existing = await (prisma.contatoEmergencia as any).findUnique({ where: { aluno_id } });

  if (!existing && (!input.nome || !input.telefone)) {
    throw new AuthError("Nome e telefone do contato de emergência são obrigatórios", 400);
  }

  const data = removeUndefined({ aluno_id, ...input, ativo: true });
  return existing
    ? (prisma.contatoEmergencia as any).update({ where: { id: existing.id }, data })
    : (prisma.contatoEmergencia as any).create({ data });
}

async function upsertMatricula(aluno_id: string, input?: AlunoCompletoInput["matricula"]) {
  if (!input) return;
  validateStatus(input.status);

  if (input.turma_id) {
    await validateTurma(input.turma_id);
  }

  const existing = await findMatriculaAtivaByAluno(aluno_id);

  if (!existing && (!input.turma_id || !input.ano_letivo)) {
    throw new AuthError("turma_id e ano_letivo são obrigatórios para criar matrícula", 400);
  }

  const data = removeUndefined({
    aluno_id,
    turma_id: input.turma_id,
    ano_letivo: input.ano_letivo,
    periodo: input.periodo,
    data_matricula: parseDate(input.data_matricula),
    status: input.status,
    observacoes: input.observacoes,
    ativo: true,
  });

  return existing
    ? (prisma.matricula as any).update({ where: { id: existing.id }, data })
    : (prisma.matricula as any).create({ data });
}

export async function updateAlunoCompletoService(id: string, input: AlunoCompletoInput) {
  const aluno = await getAlunoAtivo(id);
  const relacaoAtual = await findRelacaoPrincipal(id);

  await updateAlunoBloco(id, aluno, input.aluno);
  const responsavel = await resolveResponsavel(input, relacaoAtual);
  await upsertRelacao(id, input, relacaoAtual, responsavel);
  await upsertEndereco(id, input.endereco);
  await upsertSaude(id, input.saude);
  await upsertEmergencia(id, input.emergencia);
  await upsertMatricula(id, input.matricula);

  return getAlunoCompletoService(id);
}
