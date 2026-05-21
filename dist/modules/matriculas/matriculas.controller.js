"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatricula = createMatricula;
const matriculas_service_1 = require("./matriculas.service");
async function createMatricula(req, res) {
    const data = req.body;
    const result = await (0, matriculas_service_1.createMatriculaService)(data);
    return res.json({
        success: true,
        data: result,
    });
}
