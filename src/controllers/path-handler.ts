import { exceptionControllerHandler } from '@src/adapters';
import CustomerService from '@src/services/customer';
import PathHandlerService, { Coord } from '@src/services/path-handler';
import { Request, Response } from 'express';

const ORIGIN_COORD = [0, 0] as Coord;

class PathHandlerController {
  constructor(
    private pathHandlerService: PathHandlerService,
    private customerService: CustomerService,
  ) {}

  async getPath(_req: Request, res: Response) {
    try {
      const customers = await this.customerService.listCustomer();

      const customersPath = this.pathHandlerService
        .calculateBestPath(
          ORIGIN_COORD,
          customers.map((i) => ({ ...i, position: i.address })),
        )
        .map(({ position, ...data }) => ({ ...data }));

      res.status(200).send(customersPath);
    } catch (error) {
      exceptionControllerHandler(res, error, {
        status: 400,
        message: "Failed to calculate customer's path",
      });
    }
  }
}

export default PathHandlerController;
