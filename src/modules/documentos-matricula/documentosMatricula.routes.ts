import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { AuthError } from "../auth/auth.errors";
import {
  deleteDocumentoMatriculaController,
  getDocumentoMatriculaByIdController,
  listDocumentosMatriculaController,
  uploadDocumentoMatriculaController,
} from "./documentosMatricula.controller";

const documentosMatriculaRoutes = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype !== "application/pdf") {
      callback(new AuthError("Apenas arquivos PDF são permitidos", 400));
      return;
    }

    callback(null, true);
  },
});

documentosMatriculaRoutes.use(authMiddleware);
documentosMatriculaRoutes.post("/upload", upload.single("arquivo"), uploadDocumentoMatriculaController);
documentosMatriculaRoutes.get("/", listDocumentosMatriculaController);
documentosMatriculaRoutes.get("/:id", getDocumentoMatriculaByIdController);
documentosMatriculaRoutes.delete("/:id", deleteDocumentoMatriculaController);

export default documentosMatriculaRoutes;
