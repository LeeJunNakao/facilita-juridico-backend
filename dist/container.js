"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountApp = void 0;
const customer_1 = require("./repos/customer");
const customer_2 = __importDefault(require("./services/customer"));
const customer_3 = __importDefault(require("./controllers/customer"));
const customer_4 = __importDefault(require("./routes/customer"));
const path_handler_1 = __importDefault(require("./routes/path-handler"));
const path_handler_2 = __importDefault(require("./controllers/path-handler"));
const path_handler_3 = __importDefault(require("./services/path-handler"));
const mountApp = (app, db) => {
    const customerRepo = new customer_1.CustomerRepo(db);
    const customerService = new customer_2.default(customerRepo);
    const pathService = new path_handler_3.default();
    const customerController = new customer_3.default(customerService);
    const pathController = new path_handler_2.default(pathService, customerService);
    (0, customer_4.default)(app, customerController);
    (0, path_handler_1.default)(app, pathController);
    return app;
};
exports.mountApp = mountApp;
