"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
class AuthError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.name = "AuthError";
        this.statusCode = statusCode;
    }
}
exports.AuthError = AuthError;
