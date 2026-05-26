import { Request, Response } from "express";
import {
  createEnderecoSchema,
  CreateEnderecoInput,
  enderecoIdParamSchema,
  updateEnderecoSchema,
  UpdateEnderecoInput,
} from "./enderecos.schema";
import {
  createEnderecoService,
  deleteEnderecoService,
  getEnderecoByIdService,
  listEnderecosService,
  updateEnderecoService,
} from "./enderecos.service";

export async function createEnderecoController(req: Request, res: Response) {
  const data = createEnderecoSchema.parse(req.body) as CreateEnderecoInput;
  const endereco = await createEnderecoService(data);

  return res.status(201).json({ success: true, data: endereco });
}

export async function listEnderecosController(_req: Request, res: Response) {
  const enderecos = await listEnderecosService();
  return res.json({ success: true, data: enderecos });
}

export async function getEnderecoByIdController(req: Request, res: Response) {
  const { id } = enderecoIdParamSchema.parse(req.params);
  const endereco = await getEnderecoByIdService(id);

  return res.json({ success: true, data: endereco });
}

export async function updateEnderecoController(req: Request, res: Response) {
  const { id } = enderecoIdParamSchema.parse(req.params);
  const data = updateEnderecoSchema.parse(req.body) as UpdateEnderecoInput;
  const endereco = await updateEnderecoService(id, data);

  return res.json({ success: true, data: endereco });
}

export async function deleteEnderecoController(req: Request, res: Response) {
  const { id } = enderecoIdParamSchema.parse(req.params);
  const endereco = await deleteEnderecoService(id);

  return res.json({ success: true, data: endereco });
}
