import { Router } from "express"
import { createMatricula } from "./matriculas.controller"

const router = Router()

router.post("/", createMatricula)

export default router