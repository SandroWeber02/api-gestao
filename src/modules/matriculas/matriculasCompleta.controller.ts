import { Request, Response } from "express";
import { createMatriculaCompletaSchema, CreateMatriculaCompletaInput } from "./matriculasCompleta.schema";
import { createMatriculaCompletaService } from "./matriculasCompleta.service";

export async function createMatriculaCompletaController(req: Request, res: Response) {
  const data = createMatriculaCompletaSchema.parse(req.body) as CreateMatriculaCompletaInput;
  const result = await createMatriculaCompletaService(data);

  return res.status(201).json({
    success: true,
    data: result,
  });
}
