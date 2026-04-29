import { Request, Response } from "express"
import { createMatriculaService } from "./matriculas.service"

export async function createMatricula(req: Request, res: Response) {
  const data = req.body

  const result = await createMatriculaService(data)

  return res.json(result)
}