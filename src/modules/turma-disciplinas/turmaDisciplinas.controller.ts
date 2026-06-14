import { Request, Response } from "express";
import {
  createTurmaDisciplinaSchema,
  CreateTurmaDisciplinaInput,
  turmaDisciplinaIdParamSchema,
  turmaIdParamSchema,
} from "./turmaDisciplinas.schema";
import {
  createTurmaDisciplinaService,
  deleteTurmaDisciplinaService,
  getTurmaDisciplinaByIdService,
  listDisciplinasByTurmaService,
  listTurmaDisciplinasService,
} from "./turmaDisciplinas.service";

export async function createTurmaDisciplinaController(req: Request, res: Response) {
  const data = createTurmaDisciplinaSchema.parse(req.body) as CreateTurmaDisciplinaInput;
  const vinculo = await createTurmaDisciplinaService(data);
  return res.status(201).json({ success: true, data: vinculo });
}

export async function listTurmaDisciplinasController(_req: Request, res: Response) {
  const vinculos = await listTurmaDisciplinasService();
  return res.json({ success: true, data: vinculos });
}

export async function getTurmaDisciplinaByIdController(req: Request, res: Response) {
  const { id } = turmaDisciplinaIdParamSchema.parse(req.params);
  const vinculo = await getTurmaDisciplinaByIdService(id);
  return res.json({ success: true, data: vinculo });
}

export async function deleteTurmaDisciplinaController(req: Request, res: Response) {
  const { id } = turmaDisciplinaIdParamSchema.parse(req.params);
  const vinculo = await deleteTurmaDisciplinaService(id);
  return res.json({ success: true, data: vinculo });
}

export async function listDisciplinasByTurmaController(req: Request, res: Response) {
  const { id } = turmaIdParamSchema.parse(req.params);
  const data = await listDisciplinasByTurmaService(id);
  return res.json({ success: true, data });
}
