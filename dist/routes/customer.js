"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = (app, controller) => {
    const rootPath = '/customer';
    app.get(rootPath, (req, res) => controller.listCustomers(req, res));
    app.post(rootPath, (req, res) => controller.createCustomer(req, res));
    return app;
};
exports.default = routes;
