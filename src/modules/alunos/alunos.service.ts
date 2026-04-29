import { supabase } from "../../config/supabase"

export async function createAlunoService(data: any) {
  const { data: aluno, error } = await supabase
    .from("alunos")
    .insert([data])
    .select()
    .single()

  if (error) throw error

  return aluno
}