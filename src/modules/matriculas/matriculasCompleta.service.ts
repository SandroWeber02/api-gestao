import { AuthError } from "../auth/auth.errors";
import { prisma } from "../../config/database";
import { CreateMatriculaCompletaInput } from "./matriculasCompleta.schema";

const STATUS_PERMITIDOS = ["ativa", "pendente", "cancelada", "transferida", "concluida"];

type CreatedRecord = {
  id: string;
};

type MatriculaCompletaCriada = {
  aluno?: CreatedRecord;
  responsavel?: CreatedRecord;
  relacao?: CreatedRecord;
  endereco?: CreatedRecord;
  saude?: CreatedRecord;
  emergencia?: CreatedRecord;
  matricula?: CreatedRecord;
};

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

async function rollbackMatriculaCompleta(created: MatriculaCompletaCriada): Promise<void> {
  console.log("[matricula-completa] rollback iniciado");

  const rollbackSteps: Array<{ etapa: string; action: () => Promise<unknown> }> = [
    {
      etapa: "matricula",
      action: () =>
        created.matricula
          ? (prisma.matricula as any).delete({ where: { id: created.matricula.id } })
          : Promise.resolve(),
    },
    {
      etapa: "emergencia",
      action: () =>
        created.emergencia
          ? (prisma.contatoEmergencia as any).delete({ where: { id: created.emergencia.id } })
          : Promise.resolve(),
    },
    {
      etapa: "saude",
      action: () =>
        created.saude
          ? (prisma.saudeAluno as any).delete({ where: { id: created.saude.id } })
          : Promise.resolve(),
    },
    {
      etapa: "endereco",
      action: () =>
        created.endereco
          ? (prisma.endereco as any).delete({ where: { id: created.endereco.id } })
          : Promise.resolve(),
    },
    {
      etapa: "relacao",
      action: () =>
        created.relacao
          ? (prisma.alunoResponsavel as any).delete({ where: { id: created.relacao.id } })
          : Promise.resolve(),
    },
    {
      etapa: "responsavel",
      action: () =>
        created.responsavel
          ? (prisma.responsavel as any).delete({ where: { id: created.responsavel.id } })
          : Promise.resolve(),
    },
    {
      etapa: "aluno",
      action: () =>
        created.aluno ? (prisma.aluno as any).delete({ where: { id: created.aluno.id } }) : Promise.resolve(),
    },
  ];

  for (const step of rollbackSteps) {
    try {
      await step.action();
      console.log(`[matricula-completa] rollback executado: ${step.etapa}`);
    } catch (rollbackError) {
      console.error(`[matricula-completa] erro no rollback (${step.etapa})`, rollbackError);
    }
  }

  console.log("[matricula-completa] rollback finalizado");
}

export async function createMatriculaCompletaService(input: CreateMatriculaCompletaInput) {
  validarStatus(input.matricula.status);

  console.log("[matricula-completa] etapa: validar CPF do aluno");
  const existingAlunoCpf = input.aluno.cpf
    ? await prisma.aluno.findUnique({ where: { cpf: input.aluno.cpf } })
    : null;
  if (existingAlunoCpf) {
    throw new AuthError("CPF do aluno já está em uso", 409);
  }

  console.log("[matricula-completa] etapa: buscar responsável por CPF");
  const existingResponsavelCpf = input.responsavel.cpf
    ? await prisma.responsavel.findUnique({ where: { cpf: input.responsavel.cpf } })
    : null;
  if (existingResponsavelCpf && !existingResponsavelCpf.ativo) {
    throw new AuthError("Responsável encontrado está inativo", 409);
  }

  console.log("[matricula-completa] etapa: validar turma");
  const turma = await prisma.turma.findUnique({ where: { id: input.matricula.turma_id } });
  if (!turma || !turma.ativo) {
    throw new AuthError("Turma não encontrada", 404);
  }

  const created: MatriculaCompletaCriada = {};

  try {
    console.log("[matricula-completa] etapa: criar aluno");
    const aluno = await prisma.aluno.create({
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
    created.aluno = aluno;

    console.log("[matricula-completa] etapa: validar matrícula ativa duplicada");
    const existingMatricula = await prisma.matricula.findFirst({
      where: { aluno_id: aluno.id, ano_letivo: input.matricula.ano_letivo },
    });
    if (existingMatricula && existingMatricula.ativo && existingMatricula.status === "ativa") {
      throw new AuthError("Aluno já possui matrícula ativa neste ano letivo", 409);
    }

    const responsavel = existingResponsavelCpf ?? (await (async () => {
      console.log("[matricula-completa] etapa: criar responsável");
      const novoResponsavel = await prisma.responsavel.create({
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
      created.responsavel = novoResponsavel;
      return novoResponsavel;
    })());

    if (existingResponsavelCpf) {
      console.log("[matricula-completa] etapa: reutilizar responsável existente");
    }

    console.log("[matricula-completa] etapa: criar relação aluno-responsável");
    const relacao = await prisma.alunoResponsavel.create({
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
    created.relacao = relacao;

    console.log("[matricula-completa] etapa: criar endereço");
    const endereco = await prisma.endereco.create({
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
    created.endereco = endereco;

    console.log("[matricula-completa] etapa: criar saúde");
    const saude = await prisma.saudeAluno.create({
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
    created.saude = saude;

    console.log("[matricula-completa] etapa: criar contato de emergência");
    const emergencia = await prisma.contatoEmergencia.create({
      data: {
        aluno_id: aluno.id,
        nome: input.emergencia.nome,
        parentesco: input.emergencia.parentesco,
        telefone: input.emergencia.telefone,
        observacao: input.emergencia.observacao,
        ativo: true,
      },
    });
    created.emergencia = emergencia;

    console.log("[matricula-completa] etapa: criar matrícula");
    const matricula = await prisma.matricula.create({
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
    created.matricula = matricula;

    return { aluno, responsavel, relacao, endereco, saude, emergencia, matricula };
  } catch (error) {
    console.error("[matricula-completa] erro capturado", error);
    await rollbackMatriculaCompleta(created);
    throw error;
  }
}
