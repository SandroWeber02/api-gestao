import { Request, Response } from "express";
import {
  createDisciplinaSchema,
  CreateDisciplinaInput,
  disciplinaIdParamSchema,
  updateDisciplinaSchema,
  UpdateDisciplinaInput,
} from "./disciplinas.schema";
import {
  createDisciplinaService,
  deleteDisciplinaService,
  getDisciplinaByIdService,
  listDisciplinasService,
  updateDisciplinaService,
} from "./disciplinas.service";

export async function createDisciplinaController(req: Request, res: Response) {
  const data = createDisciplinaSchema.parse(req.body) as CreateDisciplinaInput;
  const disciplina = await createDisciplinaService(data);
  return res.status(201).json({ success: true, data: disciplina });
}

export async function listDisciplinasController(_req: Request, res: Response) {
  const disciplinas = await listDisciplinasService();
  return res.json({ success: true, data: disciplinas });
}

export async function getDisciplinaByIdController(req: Request, res: Response) {
  const { id } = disciplinaIdParamSchema.parse(req.params);
  const disciplina = await getDisciplinaByIdService(id);
  return res.json({ success: true, data: disciplina });
}

export async function updateDisciplinaController(req: Request, res: Response) {
  const { id } = disciplinaIdParamSchema.parse(req.params);
  const data = updateDisciplinaSchema.parse(req.body) as UpdateDisciplinaInput;
  const disciplina = await updateDisciplinaService(id, data);
  return res.json({ success: true, data: disciplina });
}

export async function deleteDisciplinaController(req: Request, res: Response) {
  const { id } = disciplinaIdParamSchema.parse(req.params);
  const disciplina = await deleteDisciplinaService(id);
  return res.json({ success: true, data: disciplina });
}
