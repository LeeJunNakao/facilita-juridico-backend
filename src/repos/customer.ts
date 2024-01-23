import { IDatabase } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';
import { Customer } from '@src/protocols/entities/customer';
import { CreateCustomerDto, CustomerFilters } from '../protocols/dtos/customer';
import { onlyDefinedAttr } from '@src/utils/parsers';

export class CustomerRepo {
  constructor(protected db: IDatabase<{}, IClient>) {}

  async getCustomers(filters?: CustomerFilters): Promise<Customer[]> {
    if (filters) {
      const validFilters = onlyDefinedAttr(filters);

      const query = Object.keys(validFilters).reduce((query, key, index) => {
        return `${query} AND ${key} ILIKE $${index + 1}`;
      }, 'SELECT * FROM customer WHERE 1 = 1');

      const values = Object.values(validFilters).map((value) => `%${value}%`);

      const customers = await this.db.any(query, values);

      return customers;
    }

    const query = await this.db.manyOrNone('SELECT * FROM customer');

    return query;
  }

  async createCustomer(dto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.db.query(
      'INSERT INTO customer(${this:name}) VALUES(${this:csv}) RETURNING *',
      dto,
    );

    return customer;
  }
}
