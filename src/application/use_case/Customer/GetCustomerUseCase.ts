import { CustomerDependencies } from '../../../Infrastructures/type/dependenciesType';
import CustomerRepository from '../../../model/customers/CustomerRepository';
import { GetCustomerResponse } from '../../../model/customers/type/customerType';

export default class GetCustomerUseCase {
  private _customerRepository: CustomerRepository;

  constructor({ customerRepository }: CustomerDependencies) {
    this._customerRepository = customerRepository;
  }
  // type came from params, params should be / or /suspended
  async execute(id: string | undefined, limit: number, type: string): Promise<GetCustomerResponse> {
    const data = await this._customerRepository.getAllCustomer(id, limit, type);
    const rows = await this._customerRepository.getCustomerRows(type);
    const toResponse: GetCustomerResponse = { 
      customer_data: data,
      total_rows: rows
    };
    
    return toResponse;
  }
}
