"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const zod_1 = require("zod");
const auth_errors_1 = require("../modules/auth/auth.errors");
function errorMiddleware(error, _req, res, _next) {
    console.error(error);
    if (error instanceof zod_1.ZodError) {
        res.status(400).json({
            success: false,
            message: "Dados inválidos",
        });
        return;
    }
    if (error instanceof auth_errors_1.AuthError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
        return;
    }
    if (error instanceof Error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        return;
    }
    res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
    });
}
