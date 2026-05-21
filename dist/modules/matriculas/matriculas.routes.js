"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matriculas_controller_1 = require("./matriculas.controller");
const router = (0, express_1.Router)();
router.post("/", matriculas_controller_1.createMatricula);
exports.default = router;
