import { PoolType } from '../database/pool';
import CustomerRepository from '../../model/customers/CustomerRepository';
import {
  CustomerDetailResponse,
  CustomerNameResponse,
  CustomerRegisterPayload,
  CustomerRegisterResponse,
  CustomerUpdatePayload,
} from '../../model/customers/type/customerType';
import { prismaHandle } from '../../Commons/helperFunction/prismaErrorHandler';

class CustomerRepositoryPSQL extends CustomerRepository {
  private pool: PoolType;
  constructor(pool: PoolType) {
    super();
    this.pool = pool;
  }

  async addCustomer(CustomerRegister: CustomerRegisterPayload): Promise<CustomerRegisterResponse> {
    const customer_id = `cust-${Bun.randomUUIDv7()}`;
    const queryPayload = {
      customer_id,
      ...CustomerRegister,
    };

    try {
      const result = await this.pool.customer.create({
        data: queryPayload,
        select: {
          customer_id: true,
          customer_name: true,
          customer_contact: true,
          customer_address: true,
          customer_status: true,
        },
      });
      return result;
    } catch (error: unknown) {
      await prismaHandle(error);
      throw error;
    }
  }

  async updateCustomer(
    customer_id: string,
    CustomerUpdate: CustomerUpdatePayload
  ): Promise<CustomerRegisterResponse> {
    try {
      const result = await this.pool.customer.update({
        where: {
          customer_id,
        },
        data: CustomerUpdate,
        select: {
          customer_id: true,
          customer_name: true,
          customer_contact: true,
          customer_address: true,
          customer_status: true,
        },
      });
      return result;
    } catch (error: unknown) {
      await prismaHandle(error);
      throw error;
    }
  }

  async getAllCustomer(type: string): Promise<CustomerRegisterResponse[]> {
    const status = type === 'suspended' ? 'SUSPENDED' : 'ACTIVE';
    try {
      const result = await this.pool.customer.findMany({
        where: {
          customer_status: status,
        },
        select: {
          customer_id: true,
          customer_name: true,
          customer_contact: true,
          customer_address: true,
          customer_status: true,
        },
      });
      return result;
    } catch (error) {
      await prismaHandle(error);
      throw error;
    }
  }

  async getAllCustomerName(query: string): Promise<CustomerNameResponse[]> {
    return await this.pool.customer.findMany({
      where: {
        customer_status: 'ACTIVE',
        customer_name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        customer_name: true,
      },
      orderBy: {
        customer_name: 'asc',
      },
    });
  }
  async getDetailCustomerById(customer_id: string): Promise<CustomerDetailResponse> {
    try {
      const result = await this.pool.customer.findFirstOrThrow({
        where: {
          customer_id,
        },
        include: { transaction: true },
      });
      return result;
    } catch (error) {
      await prismaHandle(error);
      throw error;
    }
  }
}

export default CustomerRepositoryPSQL;
