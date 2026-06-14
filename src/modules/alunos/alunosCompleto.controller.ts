import { Request, Response } from "express";
import { alunoIdParamSchema } from "./alunos.schema";
import { alunoCompletoSchema, AlunoCompletoInput } from "./alunosCompleto.schema";
import { getAlunoCompletoService, updateAlunoCompletoService } from "./alunosCompleto.service";

export async function getAlunoCompletoController(req: Request, res: Response) {
  const { id } = alunoIdParamSchema.parse(req.params);
  const alunoCompleto = await getAlunoCompletoService(id);
  return res.json({ success: true, data: alunoCompleto });
}

export async function updateAlunoCompletoController(req: Request, res: Response) {
  const { id } = alunoIdParamSchema.parse(req.params);
  const data = alunoCompletoSchema.parse(req.body) as AlunoCompletoInput;
  const alunoCompleto = await updateAlunoCompletoService(id, data);
  return res.json({ success: true, data: alunoCompleto });
}
