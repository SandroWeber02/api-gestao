import { z } from "zod";

export const createProfessorTurmaDisciplinaSchema = z.object({
  professor_id: z.string().min(1, "professor_id é obrigatório"),
  turma_id: z.string().min(1, "turma_id é obrigatório"),
  disciplina_id: z.string().min(1, "disciplina_id é obrigatório"),
});

export const professorTurmaDisciplinaIdParamSchema = z.object({ id: z.string().min(1, "ID do vínculo inválido") });
export const professorIdParamSchema = z.object({ id: z.string().min(1, "ID do professor inválido") });

export type CreateProfessorTurmaDisciplinaInput = {
  professor_id: string;
  turma_id: string;
  disciplina_id: string;
};
