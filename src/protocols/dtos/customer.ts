import { Customer } from '../entities/customer';

export type CreateCustomerDto = {
  name: string;
  email: string;
  phone: string;
};

export type CustomerFilters = Partial<Omit<Customer, 'id' | 'address'>>;
