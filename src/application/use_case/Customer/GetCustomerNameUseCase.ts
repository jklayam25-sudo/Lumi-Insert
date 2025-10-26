import { CustomerDependencies } from '../../../Infrastructures/type/dependenciesType';
import CustomerRepository from '../../../model/customers/CustomerRepository';
import { CustomerNameResponse } from '../../../model/customers/type/customerType';

export default class GetCustomerNameUseCase {
  private _customerRepository: CustomerRepository;

  constructor({ customerRepository }: CustomerDependencies) {
    this._customerRepository = customerRepository;
  }

  async execute(useCaseParams: string): Promise<CustomerNameResponse[]> {
    return this._customerRepository.getAllCustomerName(useCaseParams);
  }
}
