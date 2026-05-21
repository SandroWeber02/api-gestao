"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAluno = createAluno;
const alunos_service_1 = require("./alunos.service");
async function createAluno(req, res) {
    const data = req.body;
    const aluno = await (0, alunos_service_1.createAlunoService)(data);
    return res.json({
        success: true,
        data: aluno,
    });
}
