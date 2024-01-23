import PathController from '@src/controllers/path-handler';
import { Express } from 'express';

const routes = (app: Express, controller: PathController) => {
  const rootPath = '/customer-route';

  app.get(rootPath, (req, res) => controller.getPath(req, res));

  return app;
};

export default routes;
