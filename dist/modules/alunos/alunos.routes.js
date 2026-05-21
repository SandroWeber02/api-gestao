"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alunos_controller_1 = require("./alunos.controller");
const router = (0, express_1.Router)();
router.post("/", alunos_controller_1.createAluno);
exports.default = router;
