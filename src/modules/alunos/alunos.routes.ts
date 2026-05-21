import { Router } from "express"
import { createAluno } from "./alunos.controller"

const router = Router();

router.post("/", createAluno);

export default router;
