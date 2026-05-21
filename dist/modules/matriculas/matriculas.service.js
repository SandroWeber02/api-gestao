"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatriculaService = createMatriculaService;
const supabase_1 = require("../../config/supabase");
async function createMatriculaService(payload) {
    const { aluno, responsaveis, endereco, matricula } = payload;
    // 1. criar aluno
    const { data: alunoCriado, error: alunoError } = await supabase_1.supabase
        .from("alunos")
        .insert([aluno])
        .select()
        .single();
    if (alunoError)
        throw alunoError;
    // 2. responsáveis
    for (const r of responsaveis || []) {
        const { data: resp, error } = await supabase_1.supabase
            .from("responsaveis")
            .insert([r])
            .select()
            .single();
        if (error)
            throw error;
        await supabase_1.supabase.from("aluno_responsavel").insert({
            aluno_id: alunoCriado.id,
            responsavel_id: resp.id,
            tipo: r.tipo
        });
    }
    // 3. endereço
    if (endereco) {
        await supabase_1.supabase.from("enderecos").insert({
            ...endereco,
            aluno_id: alunoCriado.id
        });
    }
    // 4. matrícula
    await supabase_1.supabase.from("matriculas").insert({
        ...matricula,
        aluno_id: alunoCriado.id
    });
    return { ok: true };
}
