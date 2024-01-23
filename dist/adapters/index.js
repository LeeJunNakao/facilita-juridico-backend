"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionControllerHandler = void 0;
const exceptions_1 = require("../exceptions");
const exceptionControllerHandler = (res, error, defaultError) => {
    if (error instanceof exceptions_1.ValidationException) {
        return res
            .status(400)
            .send({ message: error.message, errors: error.errors });
    }
    res.status(defaultError.status).send({ message: defaultError.message });
};
exports.exceptionControllerHandler = exceptionControllerHandler;
