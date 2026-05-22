import { Request, Response } from "express";
import {
  alunoIdParamSchema,
  createAlunoSchema,
  updateAlunoSchema,
  CreateAlunoInput,
  UpdateAlunoInput,
} from "./alunos.schema";
import {
  createAlunoService,
  deleteAlunoService,
  getAlunoByIdService,
  listAlunosService,
  updateAlunoService,
} from "./alunos.service";

export async function createAlunoController(req: Request, res: Response) {
  const data = createAlunoSchema.parse(req.body) as CreateAlunoInput;
  const aluno = await createAlunoService(data);
  return res.status(201).json({ success: true, data: aluno });
}

export async function listAlunosController(_req: Request, res: Response) {
  const alunos = await listAlunosService();
  return res.json({ success: true, data: alunos });
}

export async function getAlunoByIdController(req: Request, res: Response) {
  const { id } = alunoIdParamSchema.parse(req.params);
  const aluno = await getAlunoByIdService(id);
  return res.json({ success: true, data: aluno });
}

export async function updateAlunoController(req: Request, res: Response) {
  const { id } = alunoIdParamSchema.parse(req.params);
  const data = updateAlunoSchema.parse(req.body) as UpdateAlunoInput;
  const aluno = await updateAlunoService(id, data);
  return res.json({ success: true, data: aluno });
}

export async function deleteAlunoController(req: Request, res: Response) {
  const { id } = alunoIdParamSchema.parse(req.params);
  const aluno = await deleteAlunoService(id);
  return res.json({ success: true, data: aluno });
}
