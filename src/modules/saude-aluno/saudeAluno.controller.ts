import { Request, Response } from "express";
import {
  createSaudeAlunoSchema,
  CreateSaudeAlunoInput,
  saudeAlunoIdParamSchema,
  updateSaudeAlunoSchema,
  UpdateSaudeAlunoInput,
} from "./saudeAluno.schema";
import {
  createSaudeAlunoService,
  deleteSaudeAlunoService,
  getSaudeAlunoByIdService,
  listSaudeAlunoService,
  updateSaudeAlunoService,
} from "./saudeAluno.service";

export async function createSaudeAlunoController(req: Request, res: Response) {
  const data = createSaudeAlunoSchema.parse(req.body) as CreateSaudeAlunoInput;
  const registro = await createSaudeAlunoService(data);

  return res.status(201).json({ success: true, data: registro });
}

export async function listSaudeAlunoController(_req: Request, res: Response) {
  const registros = await listSaudeAlunoService();
  return res.json({ success: true, data: registros });
}

export async function getSaudeAlunoByIdController(req: Request, res: Response) {
  const { id } = saudeAlunoIdParamSchema.parse(req.params);
  const registro = await getSaudeAlunoByIdService(id);

  return res.json({ success: true, data: registro });
}

export async function updateSaudeAlunoController(req: Request, res: Response) {
  const { id } = saudeAlunoIdParamSchema.parse(req.params);
  const data = updateSaudeAlunoSchema.parse(req.body) as UpdateSaudeAlunoInput;
  const registro = await updateSaudeAlunoService(id, data);

  return res.json({ success: true, data: registro });
}

export async function deleteSaudeAlunoController(req: Request, res: Response) {
  const { id } = saudeAlunoIdParamSchema.parse(req.params);
  const registro = await deleteSaudeAlunoService(id);

  return res.json({ success: true, data: registro });
}
