import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "../modules/auth/auth.routes";
import turmasRoutes from "../modules/turmas/turmas.routes";
import alunosRoutes from "../modules/alunos/alunos.routes";
import responsaveisRoutes from "../modules/responsaveis/responsaveis.routes";
import alunoResponsavelRoutes from "../modules/aluno-responsavel/alunoResponsavel.routes";
import enderecosRoutes from "../modules/enderecos/enderecos.routes";
import dashboardRoutes from "../modules/dashboard/dashboard.routes";
import saudeAlunoRoutes from "../modules/saude-aluno/saudeAluno.routes";
import contatosEmergenciaRoutes from "../modules/contatos-emergencia/contatosEmergencia.routes";

const routes = Router();

routes.use(healthRoutes);
routes.use("/auth", authRoutes);
routes.use("/turmas", turmasRoutes);
routes.use("/alunos", alunosRoutes);
routes.use("/responsaveis", responsaveisRoutes);
routes.use("/aluno-responsavel", alunoResponsavelRoutes);
routes.use("/enderecos", enderecosRoutes);
routes.use("/dashboard", dashboardRoutes);
routes.use("/saude-aluno", saudeAlunoRoutes);
routes.use("/contatos-emergencia", contatosEmergenciaRoutes);

export default routes;
