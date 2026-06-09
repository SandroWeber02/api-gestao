import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "../modules/auth/auth.routes";
import turmasRoutes from "../modules/turmas/turmas.routes";
import alunosRoutes from "../modules/alunos/alunos.routes";
import responsaveisRoutes from "../modules/responsaveis/responsaveis.routes";
import alunoResponsavelRoutes from "../modules/aluno-responsavel/alunoResponsavel.routes";
import enderecosRoutes from "../modules/enderecos/enderecos.routes";
import dashboardRoutes from "../modules/dashboard/dashboard.routes";
import matriculasRoutes from "../modules/matriculas/matriculas.routes";
import saudeAlunoRoutes from "../modules/saude-aluno/saudeAluno.routes";
import contatosEmergenciaRoutes from "../modules/contatos-emergencia/contatosEmergencia.routes";
import documentosMatriculaRoutes from "../modules/documentos-matricula/documentosMatricula.routes";
import professoresRoutes from "../modules/professores/professores.routes";
import disciplinasRoutes from "../modules/disciplinas/disciplinas.routes";
import turmaDisciplinasRoutes from "../modules/turma-disciplinas/turmaDisciplinas.routes";
import professorTurmaDisciplinasRoutes from "../modules/professor-turma-disciplinas/professorTurmaDisciplinas.routes";

const routes = Router();

routes.use(healthRoutes);
routes.use("/auth", authRoutes);
routes.use("/turmas", turmasRoutes);
routes.use("/alunos", alunosRoutes);
routes.use("/responsaveis", responsaveisRoutes);
routes.use("/aluno-responsavel", alunoResponsavelRoutes);
routes.use("/enderecos", enderecosRoutes);
routes.use("/dashboard", dashboardRoutes);
routes.use("/matriculas", matriculasRoutes);
routes.use("/saude-aluno", saudeAlunoRoutes);
routes.use("/contatos-emergencia", contatosEmergenciaRoutes);
routes.use("/documentos-matricula", documentosMatriculaRoutes);
routes.use("/professores", professoresRoutes);
routes.use("/disciplinas", disciplinasRoutes);
routes.use("/turma-disciplinas", turmaDisciplinasRoutes);
routes.use("/professor-turma-disciplinas", professorTurmaDisciplinasRoutes);

export default routes;
