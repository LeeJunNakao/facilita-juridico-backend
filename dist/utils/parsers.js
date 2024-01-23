"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyDefinedAttr = void 0;
const onlyDefinedAttr = (data) => {
    const entries = Object.entries(data).filter(([_key, value]) => value !== undefined);
    return Object.fromEntries(entries);
};
exports.onlyDefinedAttr = onlyDefinedAttr;
