import { z } from "zod";

export const alunoCompletoSchema = z.object({
  aluno: z.object({
    nome: z.string().min(1, "Nome é obrigatório").optional(),
    data_nascimento: z.string().optional(),
    cpf: z.string().optional(),
    rg_certidao: z.string().optional(),
    sexo: z.string().optional(),
    tipo: z.string().optional(),
    telefone: z.string().optional(),
    nacionalidade: z.string().optional(),
    naturalidade: z.string().optional(),
    identificacao_unica: z.string().optional(),
    certidao_nascimento: z.string().optional(),
    termo: z.string().optional(),
    folha: z.string().optional(),
    livro: z.string().optional(),
    data_emissao_certidao: z.string().optional(),
    uf_cartorio: z.string().optional(),
    nome_cartorio: z.string().optional(),
    estado_civil: z.string().optional(),
    certidao_casamento: z.string().optional(),
    documento_identidade: z.string().optional(),
    data_expedicao_identidade: z.string().optional(),
    uf_identidade: z.string().optional(),
    orgao_emissor_identidade: z.string().optional(),
    portaria_naturalizacao: z.string().optional(),
    condicao_aluno: z.string().optional(),
    cor_raca: z.string().optional(),
    mae_nome: z.string().optional(),
    mae_profissao: z.string().optional(),
    mae_local_trabalho: z.string().optional(),
    mae_telefone: z.string().optional(),
    pai_nome: z.string().optional(),
    pai_profissao: z.string().optional(),
    pai_local_trabalho: z.string().optional(),
    pai_telefone: z.string().optional(),
    aluno_mora_com_pais: z.boolean().optional(),
    tipo_moradia: z.string().optional(),
    participa_bolsa_familia: z.boolean().optional(),
    nis: z.string().optional(),
  }).optional(),
  responsavel: z.object({
    nome: z.string().min(1, "Nome do responsável é obrigatório").optional(),
    cpf: z.string().optional(),
    rg: z.string().optional(),
    celular: z.string().optional(),
    telefone_fixo: z.string().optional(),
    email: z.string().optional(),
    profissao: z.string().optional(),
    local_trabalho: z.string().optional(),
    telefone_comercial: z.string().optional(),
    endereco: z.string().optional(),
    bairro: z.string().optional(),
    cep: z.string().optional(),
    telefone: z.string().optional(),
    telefone_trabalho: z.string().optional(),
  }).optional(),
  relacao: z.object({
    tipo: z.string().min(1, "Tipo de responsável é obrigatório").optional(),
    parentesco: z.string().optional(),
    responsavel_financeiro: z.boolean().optional(),
    autorizado_retirada: z.boolean().optional(),
  }).optional(),
  endereco: z.object({
    endereco: z.string().optional(),
    cep: z.string().optional(),
    logradouro: z.string().optional(),
    numero: z.string().optional(),
    complemento: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
  }).optional(),
  saude: z.object({
    alergias: z.string().optional(),
    medicamentos: z.string().optional(),
    necessidades_especiais: z.string().optional(),
    convenio_medico: z.boolean().optional(),
    nome_convenio: z.string().optional(),
    numero_carteirinha: z.string().optional(),
    observacoes: z.string().optional(),
    teve_doenca_grave: z.boolean().optional(),
    doenca_grave_qual: z.string().optional(),
    alergia_alimento_medicamento: z.boolean().optional(),
    alergia_qual: z.string().optional(),
    necessidades_educacionais_especiais: z.boolean().optional(),
    necessidades_qual: z.string().optional(),
  }).optional(),
  emergencia: z.object({
    nome: z.string().min(1, "Nome do contato de emergência é obrigatório").optional(),
    parentesco: z.string().optional(),
    telefone: z.string().min(1, "Telefone do contato de emergência é obrigatório").optional(),
    observacao: z.string().optional(),
  }).optional(),
  matricula: z.object({
    turma_id: z.string().optional(),
    ano_letivo: z.coerce.number().optional(),
    modalidade_ensino: z.string().optional(),
    serie_ingresso: z.string().optional(),
    estabelecimento: z.string().optional(),
    periodo: z.string().optional(),
    data_matricula: z.string().optional(),
    status: z.string().optional(),
    observacoes: z.string().optional(),
    documentos_entregues: z.string().optional(),
    documentos_faltantes: z.string().optional(),
  }).optional(),
});

export type AlunoCompletoInput = {
  aluno?: {
    nome?: string;
    data_nascimento?: string;
    cpf?: string;
    rg_certidao?: string;
    sexo?: string;
    tipo?: string;
    telefone?: string;
    nacionalidade?: string;
    naturalidade?: string;
    identificacao_unica?: string;
    certidao_nascimento?: string;
    termo?: string;
    folha?: string;
    livro?: string;
    data_emissao_certidao?: string;
    uf_cartorio?: string;
    nome_cartorio?: string;
    estado_civil?: string;
    certidao_casamento?: string;
    documento_identidade?: string;
    data_expedicao_identidade?: string;
    uf_identidade?: string;
    orgao_emissor_identidade?: string;
    portaria_naturalizacao?: string;
    condicao_aluno?: string;
    cor_raca?: string;
    mae_nome?: string;
    mae_profissao?: string;
    mae_local_trabalho?: string;
    mae_telefone?: string;
    pai_nome?: string;
    pai_profissao?: string;
    pai_local_trabalho?: string;
    pai_telefone?: string;
    aluno_mora_com_pais?: boolean;
    tipo_moradia?: string;
    participa_bolsa_familia?: boolean;
    nis?: string;
  };
  responsavel?: {
    nome?: string;
    cpf?: string;
    rg?: string;
    celular?: string;
    telefone_fixo?: string;
    email?: string;
    profissao?: string;
    local_trabalho?: string;
    telefone_comercial?: string;
    endereco?: string;
    bairro?: string;
    cep?: string;
    telefone?: string;
    telefone_trabalho?: string;
  };
  relacao?: {
    tipo?: string;
    parentesco?: string;
    responsavel_financeiro?: boolean;
    autorizado_retirada?: boolean;
  };
  endereco?: {
    endereco?: string;
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
  };
  saude?: {
    alergias?: string;
    medicamentos?: string;
    necessidades_especiais?: string;
    convenio_medico?: boolean;
    nome_convenio?: string;
    numero_carteirinha?: string;
    observacoes?: string;
    teve_doenca_grave?: boolean;
    doenca_grave_qual?: string;
    alergia_alimento_medicamento?: boolean;
    alergia_qual?: string;
    necessidades_educacionais_especiais?: boolean;
    necessidades_qual?: string;
  };
  emergencia?: {
    nome?: string;
    parentesco?: string;
    telefone?: string;
    observacao?: string;
  };
  matricula?: {
    turma_id?: string;
    ano_letivo?: number;
    modalidade_ensino?: string;
    serie_ingresso?: string;
    estabelecimento?: string;
    periodo?: string;
    data_matricula?: string;
    status?: string;
    observacoes?: string;
    documentos_entregues?: string;
    documentos_faltantes?: string;
  };
};
