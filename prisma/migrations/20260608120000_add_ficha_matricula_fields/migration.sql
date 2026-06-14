ALTER TABLE "alunos"
  ADD COLUMN "telefone" TEXT,
  ADD COLUMN "nacionalidade" TEXT,
  ADD COLUMN "naturalidade" TEXT,
  ADD COLUMN "identificacao_unica" TEXT,
  ADD COLUMN "certidao_nascimento" TEXT,
  ADD COLUMN "termo" TEXT,
  ADD COLUMN "folha" TEXT,
  ADD COLUMN "livro" TEXT,
  ADD COLUMN "data_emissao_certidao" TIMESTAMP(3),
  ADD COLUMN "uf_cartorio" TEXT,
  ADD COLUMN "nome_cartorio" TEXT,
  ADD COLUMN "estado_civil" TEXT,
  ADD COLUMN "certidao_casamento" TEXT,
  ADD COLUMN "documento_identidade" TEXT,
  ADD COLUMN "data_expedicao_identidade" TIMESTAMP(3),
  ADD COLUMN "uf_identidade" TEXT,
  ADD COLUMN "orgao_emissor_identidade" TEXT,
  ADD COLUMN "portaria_naturalizacao" TEXT,
  ADD COLUMN "condicao_aluno" TEXT,
  ADD COLUMN "cor_raca" TEXT,
  ADD COLUMN "mae_nome" TEXT,
  ADD COLUMN "mae_profissao" TEXT,
  ADD COLUMN "mae_local_trabalho" TEXT,
  ADD COLUMN "mae_telefone" TEXT,
  ADD COLUMN "pai_nome" TEXT,
  ADD COLUMN "pai_profissao" TEXT,
  ADD COLUMN "pai_local_trabalho" TEXT,
  ADD COLUMN "pai_telefone" TEXT,
  ADD COLUMN "aluno_mora_com_pais" BOOLEAN,
  ADD COLUMN "tipo_moradia" TEXT,
  ADD COLUMN "participa_bolsa_familia" BOOLEAN,
  ADD COLUMN "nis" TEXT;

ALTER TABLE "responsaveis"
  ADD COLUMN "endereco" TEXT,
  ADD COLUMN "bairro" TEXT,
  ADD COLUMN "cep" TEXT,
  ADD COLUMN "telefone" TEXT,
  ADD COLUMN "telefone_trabalho" TEXT;

ALTER TABLE "saude_aluno"
  ADD COLUMN "teve_doenca_grave" BOOLEAN,
  ADD COLUMN "doenca_grave_qual" TEXT,
  ADD COLUMN "alergia_alimento_medicamento" BOOLEAN,
  ADD COLUMN "alergia_qual" TEXT,
  ADD COLUMN "necessidades_educacionais_especiais" BOOLEAN,
  ADD COLUMN "necessidades_qual" TEXT;

ALTER TABLE "matriculas"
  ADD COLUMN "modalidade_ensino" TEXT,
  ADD COLUMN "serie_ingresso" TEXT,
  ADD COLUMN "estabelecimento" TEXT,
  ADD COLUMN "documentos_entregues" TEXT,
  ADD COLUMN "documentos_faltantes" TEXT;
