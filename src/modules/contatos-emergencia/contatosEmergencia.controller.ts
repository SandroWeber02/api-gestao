import { Request, Response } from "express";
import {
  contatoEmergenciaIdParamSchema,
  createContatoEmergenciaSchema,
  CreateContatoEmergenciaInput,
  updateContatoEmergenciaSchema,
  UpdateContatoEmergenciaInput,
} from "./contatosEmergencia.schema";
import {
  createContatoEmergenciaService,
  deleteContatoEmergenciaService,
  getContatoEmergenciaByIdService,
  listContatosEmergenciaService,
  updateContatoEmergenciaService,
} from "./contatosEmergencia.service";

export async function createContatoEmergenciaController(req: Request, res: Response) {
  const data = createContatoEmergenciaSchema.parse(req.body) as CreateContatoEmergenciaInput;
  const contato = await createContatoEmergenciaService(data);

  return res.status(201).json({ success: true, data: contato });
}

export async function listContatosEmergenciaController(_req: Request, res: Response) {
  const contatos = await listContatosEmergenciaService();
  return res.json({ success: true, data: contatos });
}

export async function getContatoEmergenciaByIdController(req: Request, res: Response) {
  const { id } = contatoEmergenciaIdParamSchema.parse(req.params);
  const contato = await getContatoEmergenciaByIdService(id);

  return res.json({ success: true, data: contato });
}

export async function updateContatoEmergenciaController(req: Request, res: Response) {
  const { id } = contatoEmergenciaIdParamSchema.parse(req.params);
  const data = updateContatoEmergenciaSchema.parse(req.body) as UpdateContatoEmergenciaInput;
  const contato = await updateContatoEmergenciaService(id, data);

  return res.json({ success: true, data: contato });
}

export async function deleteContatoEmergenciaController(req: Request, res: Response) {
  const { id } = contatoEmergenciaIdParamSchema.parse(req.params);
  const contato = await deleteContatoEmergenciaService(id);

  return res.json({ success: true, data: contato });
}
