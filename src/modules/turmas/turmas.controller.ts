import { Request, Response } from "express";
import { AuthenticatedRequest } from "../auth/auth.controller";
import { turmaIdParamSchema, createTurmaSchema, updateTurmaSchema } from "./turmas.schema";
import {
  createTurmaService,
  deleteTurmaService,
  getTurmaByIdService,
  listTurmasService,
  listAlunosByTurmaService,
  updateTurmaService,
} from "./turmas.service";
import { AuthError } from "../auth/auth.errors";

function ensureAdmin(req: AuthenticatedRequest): void {
  if (req.user.perfil !== "admin") {
    throw new AuthError("Acesso negado", 403);
  }
}

export async function createTurmaController(req: Request, res: Response) {
  ensureAdmin(req as AuthenticatedRequest);
  const data = createTurmaSchema.parse(req.body) as { nome: string; ano_letivo: number; periodo: string; ativo?: number };
  const turma = await createTurmaService({ ...data, ativo: data.ativo === undefined ? true : Boolean(data.ativo) });

  return res.status(201).json({ success: true, data: turma });
}

export async function listTurmasController(req: Request, res: Response) {
  ensureAdmin(req as AuthenticatedRequest);
  const turmas = await listTurmasService();

  return res.json({ success: true, data: turmas });
}

export async function getTurmaByIdController(req: Request, res: Response) {
  ensureAdmin(req as AuthenticatedRequest);
  const { id } = turmaIdParamSchema.parse(req.params);
  const turma = await getTurmaByIdService(id);

  return res.json({ success: true, data: turma });
}

export async function updateTurmaController(req: Request, res: Response) {
  ensureAdmin(req as AuthenticatedRequest);
  const { id } = turmaIdParamSchema.parse(req.params);
  const data = updateTurmaSchema.parse(req.body);
  const turma = await updateTurmaService(id, data);

  return res.json({ success: true, data: turma });
}

export async function deleteTurmaController(req: Request, res: Response) {
  ensureAdmin(req as AuthenticatedRequest);
  const { id } = turmaIdParamSchema.parse(req.params);
  const turma = await deleteTurmaService(id);

  return res.json({ success: true, data: turma });
}


export async function listAlunosByTurmaController(req: Request, res: Response) {
  ensureAdmin(req as AuthenticatedRequest);
  const { id } = turmaIdParamSchema.parse(req.params);
  const data = await listAlunosByTurmaService(id);

  return res.json({ success: true, data });
}
