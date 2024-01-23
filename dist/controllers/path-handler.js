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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const adapters_1 = require("../adapters");
const ORIGIN_COORD = [0, 0];
class PathHandlerController {
    constructor(pathHandlerService, customerService) {
        this.pathHandlerService = pathHandlerService;
        this.customerService = customerService;
    }
    getPath(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customers = yield this.customerService.listCustomer();
                const customersPath = this.pathHandlerService
                    .calculateBestPath(ORIGIN_COORD, customers.map((i) => (Object.assign(Object.assign({}, i), { position: i.address }))))
                    .map((_a) => {
                    var { position } = _a, data = __rest(_a, ["position"]);
                    return (Object.assign({}, data));
                });
                res.status(200).send(customersPath);
            }
            catch (error) {
                (0, adapters_1.exceptionControllerHandler)(res, error, {
                    status: 400,
                    message: "Failed to calculate customer's path",
                });
            }
        });
    }
}
exports.default = PathHandlerController;
