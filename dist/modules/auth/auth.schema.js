"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, "Nome é obrigatório"),
    email: zod_1.z.string().email("Email inválido"),
    senha: zod_1.z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    perfil: zod_1.z.enum(["admin", "professor"]),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email inválido"),
    senha: zod_1.z.string().min(1, "Senha é obrigatória"),
});
