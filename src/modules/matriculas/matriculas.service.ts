import { supabase } from "../../config/supabase"

export async function createMatriculaService(payload: any) {
  const { aluno, responsaveis, endereco, matricula } = payload

  // 1. criar aluno
  const { data: alunoCriado, error: alunoError } = await supabase
    .from("alunos")
    .insert([aluno])
    .select()
    .single()

  if (alunoError) throw alunoError

  // 2. responsáveis
  for (const r of responsaveis || []) {
    const { data: resp, error } = await supabase
      .from("responsaveis")
      .insert([r])
      .select()
      .single()

    if (error) throw error

    await supabase.from("aluno_responsavel").insert({
      aluno_id: alunoCriado.id,
      responsavel_id: resp.id,
      tipo: r.tipo
    })
  }

  // 3. endereço
  if (endereco) {
    await supabase.from("enderecos").insert({
      ...endereco,
      aluno_id: alunoCriado.id
    })
  }

  // 4. matrícula
  await supabase.from("matriculas").insert({
    ...matricula,
    aluno_id: alunoCriado.id
  })

  return { ok: true }
}