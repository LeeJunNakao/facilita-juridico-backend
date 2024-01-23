"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
    }
}
exports.HttpException = HttpException;
class ValidationException extends Error {
    constructor(errors) {
        super('Invalid fields');
        this.errors = errors;
        this.message = 'Invalid fields';
    }
}
exports.ValidationException = ValidationException;
