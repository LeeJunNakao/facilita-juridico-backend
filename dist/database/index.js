"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const initDb = () => {
    const pgp = (0, pg_promise_1.default)();
    const { DB, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;
    const dbURI = `${DB}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
    const db = pgp(dbURI);
    return db;
};
exports.initDb = initDb;
