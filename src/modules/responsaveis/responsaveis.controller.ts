import { Request, Response } from "express";
import {
  createResponsavelSchema,
  CreateResponsavelInput,
  responsavelIdParamSchema,
  updateResponsavelSchema,
  UpdateResponsavelInput,
} from "./responsaveis.schema";
import {
  createResponsavelService,
  deleteResponsavelService,
  getResponsavelByIdService,
  listResponsaveisService,
  updateResponsavelService,
} from "./responsaveis.service";

export async function createResponsavelController(req: Request, res: Response) {
  const data = createResponsavelSchema.parse(req.body) as CreateResponsavelInput;
  const responsavel = await createResponsavelService(data);

  return res.status(201).json({ success: true, data: responsavel });
}

export async function listResponsaveisController(_req: Request, res: Response) {
  const responsaveis = await listResponsaveisService();

  return res.json({ success: true, data: responsaveis });
}

export async function getResponsavelByIdController(req: Request, res: Response) {
  const { id } = responsavelIdParamSchema.parse(req.params);
  const responsavel = await getResponsavelByIdService(id);

  return res.json({ success: true, data: responsavel });
}

export async function updateResponsavelController(req: Request, res: Response) {
  const { id } = responsavelIdParamSchema.parse(req.params);
  const data = updateResponsavelSchema.parse(req.body) as UpdateResponsavelInput;
  const responsavel = await updateResponsavelService(id, data);

  return res.json({ success: true, data: responsavel });
}

export async function deleteResponsavelController(req: Request, res: Response) {
  const { id } = responsavelIdParamSchema.parse(req.params);
  const responsavel = await deleteResponsavelService(id);

  return res.json({ success: true, data: responsavel });
}
