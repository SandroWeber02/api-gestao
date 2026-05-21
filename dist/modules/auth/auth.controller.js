"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = registerController;
exports.loginController = loginController;
exports.meController = meController;
const auth_service_1 = require("./auth.service");
const auth_schema_1 = require("./auth.schema");
async function registerController(req, res) {
    const data = auth_schema_1.registerSchema.parse(req.body);
    const usuario = await (0, auth_service_1.registerService)(data);
    return res.status(201).json({
        success: true,
        data: usuario,
    });
}
async function loginController(req, res) {
    const data = auth_schema_1.loginSchema.parse(req.body);
    const result = await (0, auth_service_1.loginService)(data);
    return res.json({
        success: true,
        data: result,
    });
}
async function meController(req, res) {
    const authReq = req;
    const usuario = await (0, auth_service_1.meService)(authReq.user.id);
    return res.json({
        success: true,
        data: usuario,
    });
}
