ALTER TABLE "alunos"
  ADD COLUMN "bolsa_familia_nome" TEXT,
  ADD COLUMN "bolsa_familia_nacionalidade" TEXT,
  ADD COLUMN "bolsa_familia_naturalidade" TEXT,
  ADD COLUMN "bolsa_familia_nome_mae" TEXT,
  ADD COLUMN "bolsa_familia_nis" TEXT,
  ADD COLUMN "bolsa_familia_identidade" TEXT,
  ADD COLUMN "bolsa_familia_orgao_emissor" TEXT,
  ADD COLUMN "bolsa_familia_data_expedicao" TIMESTAMP(3);

ALTER TABLE "matriculas"
  ADD COLUMN "tipo_matricula" TEXT;
