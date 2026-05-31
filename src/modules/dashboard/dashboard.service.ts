import { listAlunosAtivosDashboard, listTurmasAtivasDashboard } from "./dashboard.repository";

export async function getDashboardResumoService() {
  const alunos = await listAlunosAtivosDashboard();
  const turmas = await listTurmasAtivasDashboard();

  const now = new Date();
  const currentMonth = now.getMonth();

  const total_alunos = alunos.filter((aluno) => aluno.ativo).length;
  const total_alunos_integral = alunos.filter(
    (aluno) => aluno.ativo && (aluno.tipo ?? "").toLowerCase() === "integral",
  ).length;
  const total_alunos_convenio = alunos.filter(
    (aluno) => aluno.ativo && (aluno.tipo ?? "").toLowerCase() === "convenio",
  ).length;
  const total_turmas = turmas.filter((turma) => turma.ativo).length;

  const aniversariantes_mes = alunos
    .filter((aluno) => aluno.ativo && aluno.data_nascimento)
    .filter((aluno) => aluno.data_nascimento && aluno.data_nascimento.getMonth() === currentMonth)
    .map((aluno) => ({
      id: aluno.id,
      nome: aluno.nome,
      data_nascimento: aluno.data_nascimento as Date,
    }));

  return {
    total_alunos,
    total_alunos_integral,
    total_alunos_convenio,
    total_turmas,
    aniversariantes_mes,
  };
}
