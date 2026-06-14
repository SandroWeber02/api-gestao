import { Request, Response } from "express";
import {
  createProfessorTurmaDisciplinaSchema,
  CreateProfessorTurmaDisciplinaInput,
  professorIdParamSchema,
  professorTurmaDisciplinaIdParamSchema,
} from "./professorTurmaDisciplinas.schema";
import {
  createProfessorTurmaDisciplinaService,
  deleteProfessorTurmaDisciplinaService,
  getProfessorTurmaDisciplinaByIdService,
  listDisciplinasByProfessorService,
  listProfessorTurmaDisciplinasService,
  listTurmasByProfessorService,
} from "./professorTurmaDisciplinas.service";

export async function createProfessorTurmaDisciplinaController(req: Request, res: Response) {
  const data = createProfessorTurmaDisciplinaSchema.parse(req.body) as CreateProfessorTurmaDisciplinaInput;
  const vinculo = await createProfessorTurmaDisciplinaService(data);
  return res.status(201).json({ success: true, data: vinculo });
}

export async function listProfessorTurmaDisciplinasController(_req: Request, res: Response) {
  const vinculos = await listProfessorTurmaDisciplinasService();
  return res.json({ success: true, data: vinculos });
}

export async function getProfessorTurmaDisciplinaByIdController(req: Request, res: Response) {
  const { id } = professorTurmaDisciplinaIdParamSchema.parse(req.params);
  const vinculo = await getProfessorTurmaDisciplinaByIdService(id);
  return res.json({ success: true, data: vinculo });
}

export async function deleteProfessorTurmaDisciplinaController(req: Request, res: Response) {
  const { id } = professorTurmaDisciplinaIdParamSchema.parse(req.params);
  const vinculo = await deleteProfessorTurmaDisciplinaService(id);
  return res.json({ success: true, data: vinculo });
}

export async function listTurmasByProfessorController(req: Request, res: Response) {
  const { id } = professorIdParamSchema.parse(req.params);
  const data = await listTurmasByProfessorService(id);
  return res.json({ success: true, data });
}

export async function listDisciplinasByProfessorController(req: Request, res: Response) {
  const { id } = professorIdParamSchema.parse(req.params);
  const data = await listDisciplinasByProfessorService(id);
  return res.json({ success: true, data });
}
