"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
    captureStackTrace() {
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
