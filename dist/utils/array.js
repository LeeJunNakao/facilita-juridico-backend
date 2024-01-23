"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popFind = void 0;
const popFind = (data, cb) => {
    return data.reduce((result, curr) => {
        const [found, restArr] = result;
        if (found) {
            return [found, [...restArr, curr]];
        }
        const isTrue = cb(curr);
        if (isTrue) {
            return [curr, [...restArr]];
        }
        return [found, [...restArr, curr]];
    }, [undefined, []]);
};
exports.popFind = popFind;
