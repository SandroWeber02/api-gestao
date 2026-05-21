"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlunoService = createAlunoService;
const supabase_1 = require("../../config/supabase");
async function createAlunoService(data) {
    const { data: aluno, error } = await supabase_1.supabase
        .from("alunos")
        .insert([data])
        .select()
        .single();
    if (error)
        throw error;
    return aluno;
}
