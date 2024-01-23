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
exports.CustomerRepo = void 0;
const parsers_1 = require("../utils/parsers");
class CustomerRepo {
    constructor(db) {
        this.db = db;
    }
    getCustomers(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            if (filters) {
                const validFilters = (0, parsers_1.onlyDefinedAttr)(filters);
                const query = Object.keys(validFilters).reduce((query, key, index) => {
                    return `${query} AND ${key} ILIKE $${index + 1}`;
                }, 'SELECT * FROM customer WHERE 1 = 1');
                const values = Object.values(validFilters).map((value) => `%${value}%`);
                const customers = yield this.db.any(query, values);
                return customers;
            }
            const query = yield this.db.manyOrNone('SELECT * FROM customer');
            return query;
        });
    }
    createCustomer(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.db.query('INSERT INTO customer(${this:name}) VALUES(${this:csv}) RETURNING *', dto);
            return customer;
        });
    }
}
exports.CustomerRepo = CustomerRepo;
