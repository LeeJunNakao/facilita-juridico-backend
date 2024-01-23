"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = (app, controller) => {
    const rootPath = '/customer-route';
    app.get(rootPath, (req, res) => controller.getPath(req, res));
    return app;
};
exports.default = routes;
