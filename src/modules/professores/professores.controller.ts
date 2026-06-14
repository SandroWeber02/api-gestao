import { Request, Response } from "express";
import {
  createProfessorSchema,
  CreateProfessorInput,
  professorIdParamSchema,
  updateProfessorSchema,
  UpdateProfessorInput,
} from "./professores.schema";
import {
  createProfessorService,
  deleteProfessorService,
  getProfessorByIdService,
  listProfessoresService,
  updateProfessorService,
} from "./professores.service";

export async function createProfessorController(req: Request, res: Response) {
  const data = createProfessorSchema.parse(req.body) as CreateProfessorInput;
  const professor = await createProfessorService(data);
  return res.status(201).json({ success: true, data: professor });
}

export async function listProfessoresController(_req: Request, res: Response) {
  const professores = await listProfessoresService();
  return res.json({ success: true, data: professores });
}

export async function getProfessorByIdController(req: Request, res: Response) {
  const { id } = professorIdParamSchema.parse(req.params);
  const professor = await getProfessorByIdService(id);
  return res.json({ success: true, data: professor });
}

export async function updateProfessorController(req: Request, res: Response) {
  const { id } = professorIdParamSchema.parse(req.params);
  const data = updateProfessorSchema.parse(req.body) as UpdateProfessorInput;
  const professor = await updateProfessorService(id, data);
  return res.json({ success: true, data: professor });
}

export async function deleteProfessorController(req: Request, res: Response) {
  const { id } = professorIdParamSchema.parse(req.params);
  const professor = await deleteProfessorService(id);
  return res.json({ success: true, data: professor });
}
