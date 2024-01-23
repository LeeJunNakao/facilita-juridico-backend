"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const exceptions_1 = require("../../exceptions");
const validateDto = (Dto, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const element = Object.assign(new Dto(), data);
        const parsedElement = (0, class_transformer_1.plainToInstance)(Dto, element, {
            excludeExtraneousValues: true,
        });
        yield (0, class_validator_1.validateOrReject)(parsedElement);
        if (Object.values(parsedElement).every((value) => value === undefined)) {
            return undefined;
        }
        return parsedElement;
    }
    catch (error) {
        const errors = error.map((e) => {
            return [e.property, Object.values(e.constraints || {})];
        });
        throw new exceptions_1.ValidationException(Object.fromEntries(errors));
    }
});
exports.validateDto = validateDto;
