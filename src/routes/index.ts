import { Router } from "express"
import alunosRoutes from "../modules/alunos/alunos.routes"
import matriculasRoutes from "../modules/matriculas/matriculas.routes"

const routes = Router()

routes.use("/alunos", alunosRoutes)
routes.use("/matriculas", matriculasRoutes)

export default routes