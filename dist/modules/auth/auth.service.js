"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = registerService;
exports.loginService = loginService;
exports.meService = meService;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const auth_repository_1 = require("./auth.repository");
const auth_errors_1 = require("./auth.errors");
function sanitizeUsuario(usuario) {
    const { senha: _senha, ...safeUsuario } = usuario;
    return safeUsuario;
}
async function registerService(input) {
    const existingUsuario = await (0, auth_repository_1.findUsuarioByEmail)(input.email);
    if (existingUsuario) {
        throw new auth_errors_1.AuthError("Email já está em uso", 409);
    }
    const senhaHash = await bcrypt_1.default.hash(input.senha, 10);
    const usuario = await (0, auth_repository_1.createUsuario)({
        nome: input.nome,
        email: input.email,
        senha: senhaHash,
        perfil: input.perfil,
    });
    return sanitizeUsuario(usuario);
}
async function loginService(input) {
    const usuario = await (0, auth_repository_1.findUsuarioByEmail)(input.email);
    if (!usuario) {
        throw new auth_errors_1.AuthError("Email ou senha inválidos", 401);
    }
    const senhaCorreta = await bcrypt_1.default.compare(input.senha, usuario.senha);
    if (!senhaCorreta) {
        throw new auth_errors_1.AuthError("Email ou senha inválidos", 401);
    }
    const payload = {
        id: usuario.id,
        email: usuario.email,
        perfil: usuario.perfil,
    };
    const token = jsonwebtoken_1.default.sign(payload, env_1.env.JWT_SECRET, { expiresIn: "7d" });
    return { token };
}
async function meService(userId) {
    const usuario = await (0, auth_repository_1.findUsuarioById)(userId);
    if (!usuario) {
        throw new auth_errors_1.AuthError("Usuário não encontrado", 404);
    }
    return sanitizeUsuario(usuario);
}
