import { z } from "zod";

export const createTurmaDisciplinaSchema = z.object({
  turma_id: z.string().min(1, "turma_id é obrigatório"),
  disciplina_id: z.string().min(1, "disciplina_id é obrigatório"),
});

export const turmaDisciplinaIdParamSchema = z.object({ id: z.string().min(1, "ID do vínculo inválido") });
export const turmaIdParamSchema = z.object({ id: z.string().min(1, "ID da turma inválido") });

export type CreateTurmaDisciplinaInput = { turma_id: string; disciplina_id: string };
