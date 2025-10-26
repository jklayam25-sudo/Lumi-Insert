import { CustomerDependencies } from '../../../Infrastructures/type/dependenciesType';
import CustomerRepository from '../../../model/customers/CustomerRepository';
import { CustomerRegisterResponse } from '../../../model/customers/type/customerType';

export default class GetCustomerUseCase {
  private _customerRepository: CustomerRepository;

  constructor({ customerRepository }: CustomerDependencies) {
    this._customerRepository = customerRepository;
  }
  // type came from params, params should be / or /suspended
  async execute(type: string): Promise<CustomerRegisterResponse[]> {
    return this._customerRepository.getAllCustomer(type);
  }
}
