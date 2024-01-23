import { exceptionControllerHandler } from '@src/adapters';
import { validateDto } from '@src/protocols/validators';
import {
  CreateCustomerValidator,
  FilterCustomerValidator,
} from '@src/protocols/validators/customer';
import CustomerService from '@src/services/customer';
import { Request, Response } from 'express';

class CustomerController {
  constructor(private customerService: CustomerService) {}

  async listCustomers(req: Request, res: Response) {
    try {
      const filters = req.query;

      const validatedFilters = await validateDto(
        FilterCustomerValidator,
        filters,
      );

      const customers =
        await this.customerService.listCustomer(validatedFilters);

      res.status(200).send(customers);
    } catch (error) {
      exceptionControllerHandler(res, error, {
        status: 400,
        message: 'Could not find customers ',
      });
    }
  }

  async createCustomer(req: Request, res: Response) {
    try {
      const dto = req.body;
      const validatedData = await validateDto(CreateCustomerValidator, dto);

      const customer = await this.customerService.createCustomer(
        validatedData!,
      );

      res.status(200).send(customer);
    } catch (error) {
      exceptionControllerHandler(res, error, {
        status: 400,
        message: 'Could not create ',
      });
    }
  }
}

export default CustomerController;
