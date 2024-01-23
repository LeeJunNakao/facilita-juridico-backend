import { Express } from 'express';
import { IDatabase } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';
import { CustomerRepo } from '@src/repos/customer';
import CustomerService from '@src/services/customer';
import CustomerController from '@src/controllers/customer';
import customerRoutes from '@src/routes/customer';
import pathRoutes from '@src/routes/path-handler';
import PathHandlerController from './controllers/path-handler';
import PathHandlerService from './services/path-handler';

export const mountApp = (app: Express, db: IDatabase<{}, IClient>) => {
  const customerRepo = new CustomerRepo(db);

  const customerService = new CustomerService(customerRepo);
  const pathService = new PathHandlerService();

  const customerController = new CustomerController(customerService);
  const pathController = new PathHandlerController(
    pathService,
    customerService,
  );

  customerRoutes(app, customerController);
  pathRoutes(app, pathController);

  return app;
};
