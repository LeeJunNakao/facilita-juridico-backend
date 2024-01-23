import CustomerController from '@src/controllers/customer';
import { Express } from 'express';

const routes = (app: Express, controller: CustomerController) => {
  const rootPath = '/customer';

  app.get(rootPath, (req, res) => controller.listCustomers(req, res));
  app.post(rootPath, (req, res) => controller.createCustomer(req, res));

  return app;
};

export default routes;
