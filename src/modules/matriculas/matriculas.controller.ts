import { Request, Response } from "express";
import {
  createMatriculaSchema,
  CreateMatriculaInput,
  matriculaIdParamSchema,
  updateMatriculaSchema,
  UpdateMatriculaInput,
} from "./matriculas.schema";
import {
  createMatriculaService,
  deleteMatriculaService,
  getMatriculaByIdService,
  listMatriculasService,
  updateMatriculaService,
} from "./matriculas.service";

export async function createMatriculaController(req: Request, res: Response) {
  const data = createMatriculaSchema.parse(req.body) as CreateMatriculaInput;
  const matricula = await createMatriculaService(data);
  return res.status(201).json({ success: true, data: matricula });
}

export async function listMatriculasController(_req: Request, res: Response) {
  const matriculas = await listMatriculasService();
  return res.json({ success: true, data: matriculas });
}

export async function getMatriculaByIdController(req: Request, res: Response) {
  const { id } = matriculaIdParamSchema.parse(req.params);
  const matricula = await getMatriculaByIdService(id);
  return res.json({ success: true, data: matricula });
}

export async function updateMatriculaController(req: Request, res: Response) {
  const { id } = matriculaIdParamSchema.parse(req.params);
  const data = updateMatriculaSchema.parse(req.body) as UpdateMatriculaInput;
  const matricula = await updateMatriculaService(id, data);
  return res.json({ success: true, data: matricula });
}

export async function deleteMatriculaController(req: Request, res: Response) {
  const { id } = matriculaIdParamSchema.parse(req.params);
  const matricula = await deleteMatriculaService(id);
  return res.json({ success: true, data: matricula });
}
