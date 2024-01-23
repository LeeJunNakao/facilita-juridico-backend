import { CustomerRepo } from '@src/repos/customer';
import {
  CreateCustomerDto,
  CustomerFilters,
} from '@src/protocols/dtos/customer';

class CustomerService {
  constructor(private repo: CustomerRepo) {}

  async listCustomer(filters?: CustomerFilters) {
    const customers = await this.repo.getCustomers(filters);

    return customers;
  }

  async createCustomer(dto: CreateCustomerDto) {
    const customer = await this.repo.createCustomer(dto);

    return customer;
  }
}

export default CustomerService;
