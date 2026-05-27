import { AuthError } from "../auth/auth.errors";
import { prisma } from "../../config/database";
import { CreateMatriculaCompletaInput } from "./matriculasCompleta.schema";

const STATUS_PERMITIDOS = ["ativa", "pendente", "cancelada", "transferida", "concluida"];

function parseDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new AuthError("Dados inválidos", 400);
  }
  return parsed;
}

function validarStatus(status?: string): void {
  if (!status) return;
  if (!STATUS_PERMITIDOS.includes(status)) {
    throw new AuthError("Status da matrícula inválido", 400);
  }
}

export async function createMatriculaCompletaService(input: CreateMatriculaCompletaInput) {
  validarStatus(input.matricula.status);

  const existingAlunoCpf = input.aluno.cpf
    ? await prisma.aluno.findUnique({ where: { cpf: input.aluno.cpf } })
    : null;
  if (existingAlunoCpf) {
    throw new AuthError("CPF do aluno já está em uso", 409);
  }

  const existingResponsavelCpf = input.responsavel.cpf
    ? await prisma.responsavel.findUnique({ where: { cpf: input.responsavel.cpf } })
    : null;
  if (existingResponsavelCpf) {
    throw new AuthError("CPF do responsável já está em uso", 409);
  }

  const turma = await prisma.turma.findUnique({ where: { id: input.matricula.turma_id } });
  if (!turma || !turma.ativo) {
    throw new AuthError("Turma não encontrada", 404);
  }

  const result = await (prisma as any).$transaction(async (tx: any) => {
    const aluno = await tx.aluno.create({
      data: {
        nome: input.aluno.nome,
        data_nascimento: parseDate(input.aluno.data_nascimento),
        cpf: input.aluno.cpf,
        rg_certidao: input.aluno.rg_certidao,
        sexo: input.aluno.sexo,
        tipo: input.aluno.tipo,
        ativo: true,
      },
    });

    const existingMatricula = await tx.matricula.findFirst({
      where: { aluno_id: aluno.id, ano_letivo: input.matricula.ano_letivo },
    });
    if (existingMatricula && existingMatricula.ativo && existingMatricula.status === "ativa") {
      throw new AuthError("Aluno já possui matrícula ativa neste ano letivo", 409);
    }

    const responsavel = await tx.responsavel.create({
      data: {
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
      },
    });

    const relacao = await tx.alunoResponsavel.create({
      data: {
        aluno_id: aluno.id,
        responsavel_id: responsavel.id,
        tipo: input.relacao.tipo,
        parentesco: input.relacao.parentesco,
        responsavel_financeiro: input.relacao.responsavel_financeiro ?? false,
        autorizado_retirada: input.relacao.autorizado_retirada ?? false,
        ativo: true,
      },
    });

    const endereco = await tx.endereco.create({
      data: {
        aluno_id: aluno.id,
        cep: input.endereco.cep,
        logradouro: input.endereco.logradouro,
        numero: input.endereco.numero,
        complemento: input.endereco.complemento,
        bairro: input.endereco.bairro,
        cidade: input.endereco.cidade,
        estado: input.endereco.estado,
        ativo: true,
      },
    });

    const saude = await tx.saudeAluno.create({
      data: {
        aluno_id: aluno.id,
        alergias: input.saude.alergias,
        medicamentos: input.saude.medicamentos,
        necessidades_especiais: input.saude.necessidades_especiais,
        convenio_medico: input.saude.convenio_medico ?? false,
        nome_convenio: input.saude.nome_convenio,
        numero_carteirinha: input.saude.numero_carteirinha,
        observacoes: input.saude.observacoes,
        ativo: true,
      },
    });

    const emergencia = await tx.contatoEmergencia.create({
      data: {
        aluno_id: aluno.id,
        nome: input.emergencia.nome,
        parentesco: input.emergencia.parentesco,
        telefone: input.emergencia.telefone,
        observacao: input.emergencia.observacao,
        ativo: true,
      },
    });

    const matricula = await tx.matricula.create({
      data: {
        aluno_id: aluno.id,
        turma_id: input.matricula.turma_id,
        ano_letivo: input.matricula.ano_letivo,
        periodo: input.matricula.periodo,
        data_matricula: parseDate(input.matricula.data_matricula),
        status: input.matricula.status ?? "ativa",
        observacoes: input.matricula.observacoes,
        ativo: true,
      },
    });

    return { aluno, responsavel, relacao, endereco, saude, emergencia, matricula };
  });

  return result;
}
