"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "Token não informado" });
    }
    const [, token] = authHeader.split(" ");
    if (!token) {
        return res.status(401).json({ success: false, message: "Token inválido" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            perfil: decoded.perfil,
        };
        next();
    }
    catch {
        return res.status(401).json({ success: false, message: "Token inválido ou expirado" });
    }
}
