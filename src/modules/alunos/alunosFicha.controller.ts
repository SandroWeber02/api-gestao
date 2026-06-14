import { Request, Response } from "express";
import { alunoIdParamSchema } from "./alunos.schema";
import { gerarFichaMatriculaPdfService } from "./alunosFicha.service";

export async function getFichaMatriculaController(req: Request, res: Response) {
  const { id } = alunoIdParamSchema.parse(req.params);
  const pdf = await gerarFichaMatriculaPdfService(id);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="ficha-matricula-${id}.pdf"`);
  return res.send(pdf);
}
