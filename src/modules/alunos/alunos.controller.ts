import { Request, Response } from "express";
import { createAlunoService } from "./alunos.service";

export async function createAluno(req: Request, res: Response) {
  const data = req.body;

  const aluno = await createAlunoService(data);

  return res.json({
    success: true,
    data: aluno,
  });
}
