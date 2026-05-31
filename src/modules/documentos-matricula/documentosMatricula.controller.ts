import { Request, Response } from "express";
import {
  documentoMatriculaIdParamSchema,
  uploadDocumentoMatriculaSchema,
  UploadDocumentoMatriculaInput,
} from "./documentosMatricula.schema";
import {
  deleteDocumentoMatriculaService,
  getDocumentoMatriculaByIdService,
  listDocumentosMatriculaService,
  uploadDocumentoMatriculaService,
} from "./documentosMatricula.service";

export async function uploadDocumentoMatriculaController(req: Request, res: Response) {
  const data = uploadDocumentoMatriculaSchema.parse(req.body) as UploadDocumentoMatriculaInput;
  const file = (req as Request & { file?: Express.Multer.File }).file;
  const documento = await uploadDocumentoMatriculaService(data, file);

  return res.status(201).json({ success: true, data: documento });
}

export async function listDocumentosMatriculaController(_req: Request, res: Response) {
  const documentos = await listDocumentosMatriculaService();
  return res.json({ success: true, data: documentos });
}

export async function getDocumentoMatriculaByIdController(req: Request, res: Response) {
  const { id } = documentoMatriculaIdParamSchema.parse(req.params);
  const documento = await getDocumentoMatriculaByIdService(id);
  return res.json({ success: true, data: documento });
}

export async function deleteDocumentoMatriculaController(req: Request, res: Response) {
  const { id } = documentoMatriculaIdParamSchema.parse(req.params);
  const documento = await deleteDocumentoMatriculaService(id);
  return res.json({ success: true, data: documento });
}
