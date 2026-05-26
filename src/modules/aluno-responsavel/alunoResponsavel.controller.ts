import { Request, Response } from "express";
import {
  alunoResponsavelIdParamSchema,
  createAlunoResponsavelSchema,
  CreateAlunoResponsavelInput,
  updateAlunoResponsavelSchema,
  UpdateAlunoResponsavelInput,
} from "./alunoResponsavel.schema";
import {
  createAlunoResponsavelService,
  deleteAlunoResponsavelService,
  getAlunoResponsavelByIdService,
  listAlunoResponsavelService,
  updateAlunoResponsavelService,
} from "./alunoResponsavel.service";

export async function createAlunoResponsavelController(req: Request, res: Response) {
  const data = createAlunoResponsavelSchema.parse(req.body) as CreateAlunoResponsavelInput;
  const vinculo = await createAlunoResponsavelService(data);

  return res.status(201).json({ success: true, data: vinculo });
}

export async function listAlunoResponsavelController(_req: Request, res: Response) {
  const vinculos = await listAlunoResponsavelService();
  return res.json({ success: true, data: vinculos });
}

export async function getAlunoResponsavelByIdController(req: Request, res: Response) {
  const { id } = alunoResponsavelIdParamSchema.parse(req.params);
  const vinculo = await getAlunoResponsavelByIdService(id);

  return res.json({ success: true, data: vinculo });
}

export async function updateAlunoResponsavelController(req: Request, res: Response) {
  const { id } = alunoResponsavelIdParamSchema.parse(req.params);
  const data = updateAlunoResponsavelSchema.parse(req.body) as UpdateAlunoResponsavelInput;
  const vinculo = await updateAlunoResponsavelService(id, data);

  return res.json({ success: true, data: vinculo });
}

export async function deleteAlunoResponsavelController(req: Request, res: Response) {
  const { id } = alunoResponsavelIdParamSchema.parse(req.params);
  const vinculo = await deleteAlunoResponsavelService(id);

  return res.json({ success: true, data: vinculo });
}
