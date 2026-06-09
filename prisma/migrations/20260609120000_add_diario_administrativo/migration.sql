CREATE TABLE "professores" (
  "id" TEXT NOT NULL,
  "usuario_id" TEXT,
  "nome" TEXT NOT NULL,
  "email" TEXT,
  "telefone" TEXT,
  "formacao" TEXT,
  "ativo" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "professores_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "disciplinas" (
  "id" TEXT NOT NULL,
  "nome" TEXT NOT NULL,
  "codigo" TEXT,
  "carga_horaria" INTEGER,
  "ativo" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "disciplinas_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "turma_disciplinas" (
  "id" TEXT NOT NULL,
  "turma_id" TEXT NOT NULL,
  "disciplina_id" TEXT NOT NULL,
  "ativo" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "turma_disciplinas_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "professor_turma_disciplinas" (
  "id" TEXT NOT NULL,
  "professor_id" TEXT NOT NULL,
  "turma_id" TEXT NOT NULL,
  "disciplina_id" TEXT NOT NULL,
  "ativo" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "professor_turma_disciplinas_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "professores"
  ADD CONSTRAINT "professores_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "turma_disciplinas"
  ADD CONSTRAINT "turma_disciplinas_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "turma_disciplinas_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "disciplinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "professor_turma_disciplinas"
  ADD CONSTRAINT "professor_turma_disciplinas_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "professor_turma_disciplinas_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT "professor_turma_disciplinas_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "disciplinas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE INDEX "professores_usuario_id_idx" ON "professores"("usuario_id");
CREATE INDEX "turma_disciplinas_turma_id_disciplina_id_idx" ON "turma_disciplinas"("turma_id", "disciplina_id");
CREATE INDEX "professor_turma_disciplina_idx" ON "professor_turma_disciplinas"("professor_id", "turma_id", "disciplina_id");
