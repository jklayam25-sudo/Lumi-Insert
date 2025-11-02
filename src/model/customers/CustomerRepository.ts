/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CustomerDetailResponse,
  CustomerNameResponse,
  CustomerRegisterPayload,
  CustomerRegisterResponse,
  CustomerUpdatePayload,
} from './type/customerType';

export default class CustomerRepository {
  async addCustomer(CustomerRegister: CustomerRegisterPayload): Promise<CustomerRegisterResponse> {
    throw new Error('CUST_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateCustomer(
    CustomerId: string,
    CustomerUpdate: CustomerUpdatePayload
  ): Promise<CustomerRegisterResponse> {
    throw new Error('CUST_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAllCustomer(customer_id: string | undefined, limit: number, type: string): Promise<CustomerRegisterResponse[]> {
    throw new Error('CUST_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAllCustomerName(query: string): Promise<CustomerNameResponse[]> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getDetailCustomerById(customer_id: string): Promise<CustomerDetailResponse> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async customerValidChecker(customer_id: string): Promise<void> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getCustomerRows( type: string): Promise<number> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}
