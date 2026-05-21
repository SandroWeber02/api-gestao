"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUsuarioByEmail = findUsuarioByEmail;
exports.findUsuarioById = findUsuarioById;
exports.createUsuario = createUsuario;
const database_1 = require("../../config/database");
async function findUsuarioByEmail(email) {
    return database_1.prisma.usuario.findUnique({ where: { email } });
}
async function findUsuarioById(id) {
    return database_1.prisma.usuario.findUnique({ where: { id } });
}
async function createUsuario(data) {
    return database_1.prisma.usuario.create({ data });
}
